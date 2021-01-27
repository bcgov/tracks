import React, {useCallback, useContext, useState} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";

import axios from "axios";
import CONFIG from "../../config";
import {AuthenticationContext} from "./AuthRequired";
import {KeycloakInstance} from "keycloak-js";
import FileSubmissionDrop from "./FileSubmissionDrop";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateTravelPathDialog = (props) => {
  const {referenceData, open, handleClose} = props;

  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [fileUploadReferences, setFileUploadReferences] = useState([])
  const [uploadInProgress, setUploadInProgress] = useState(false);

  const authContext = useContext(AuthenticationContext);
  const keycloakInstance: KeycloakInstance = authContext.keycloakInstance;

  const [formState, setFormState] = useState({
    modeOfTransport: "",
    parksPermit: "",
    tenure: "",
  });

  const handleUpdate = (event) => {
    const currentState = formState;
    currentState[event.target.name] = event.target.value;
    setFormState(formState);
  }


  const setUploadFiles = useCallback((files) => {
    setFiles(files);
  }, []);


  const doUpload = () => {
    // clear
    setFileUploadReferences([]);

    const uploadPromises = files.map((f, i) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {

              const blob = reader.result;

              keycloakInstance.updateToken(30).then(() => {
                axios.get(`${CONFIG.API_BASE}/api/v1/operator/travel_paths/upload_request`, {
                  headers: authContext.requestHeaders(),
                }).then((response) => {
                  const uploadMetadata = response.data;
                  const currentUploadReferences = fileUploadReferences;
                  currentUploadReferences[i] = {id: uploadMetadata.id};
                  setFileUploadReferences(currentUploadReferences);
                  axios.put(uploadMetadata.url, blob, {
                    onUploadProgress: (event) => {
                      // upload progess report. we could do something useful with this.
                    }
                  }).then(() => {
                    resolve();
                  }).catch((err) => reject(err));
                });
              });
            }
            reader.readAsArrayBuffer(f);
          }
        );
      }
    );

    Promise.all(uploadPromises).then(() => {
        // happy path
        const payload = {
          modeOfTransport: formState.modeOfTransport,
          files: fileUploadReferences
        };

        keycloakInstance.updateToken(30).then(() => {
          axios.post(`${CONFIG.API_BASE}/api/v1/operator/travel_paths`, payload, {
            headers: authContext.requestHeaders(),
          }).then(() => {
            handleClose();
          });
        }).catch((err) => {
          // @todo creation failed even though upload worked
          // set error state and give friendly messages
          handleClose();
        });


      }
    ).catch((err) => {
        // @todo
        // set error state and give friendly messages
        handleClose();
      }
    );
  };

  const filesControl = () => {
    if (files.length > 0) {
      return (
        <div>
          <p>File attached:</p>
          <ul>
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (<FileSubmissionDrop setFiles={setUploadFiles} />);
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
      <DialogTitle id="form-dialog-title">Add A Travel Path</DialogTitle>
      <DialogContent>

        <Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>
          <DialogContentText>
            Enter travel path details and associated gpx coordinates.
          </DialogContentText>

          <Typography variant={'h5'}>Details</Typography>

          <FormControl className={classes.formControl}>
            <InputLabel id="label-activity-select">Select Activity</InputLabel>
            <Select
              labelId="label-activity-select"
              id="acivity-select"
              defaultValue={formState.modeOfTransport}
              name="modeOfTransport"
              onChange={handleUpdate}>
              <MenuItem disabled={true} value={""}>Select</MenuItem>
              {referenceData.modes.map((m, i) => (
                <MenuItem key={i} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl className={classes.formControl}>
            <InputLabel id="label-related-select">Tenure or BC Parks Permit</InputLabel>
            <Select
              labelId="label-related-select"
              id="related-select"
            >
              <MenuItem disabled={true} value={""}>Tenures</MenuItem>

              {referenceData.tenures.map((m, i) => (
                <MenuItem key={`t-${i}`} value={m.id}>{m.reference}</MenuItem>
              ))}

              <MenuItem disabled={true} value={""}>Park Permits</MenuItem>

              {referenceData.permits.map((m, i) => (
                <MenuItem key={`p-${i}`} value={m.id}>{m.reference}</MenuItem>
              ))}

            </Select>
          </FormControl>

          <Typography variant={'h5'}>Attach GPX File</Typography>

          <FormControl className={classes.formControl}>
            {filesControl()}
          </FormControl>
        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={doUpload} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTravelPathDialog;
