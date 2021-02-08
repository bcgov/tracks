import React, {useCallback, useState} from "react";
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
import FileSubmissionDrop from "./FileSubmissionDrop";
import {useDispatch} from "react-redux";
import {TRAVEL_PATH_UPLOAD_REQUEST} from "../../state/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateActivityDialog = (props) => {
  const {modes, tenures, permits, open, handleClose} = props;

  const classes = useStyles();

  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);

  const [formState, setFormState] = useState({
    modeOfTransport: "",
    parksPermit: "",
    tenure: "",
  });

  const handleUpdate = (event) => {
    const currentState = formState;
    let matches = null;

    switch (event.target.name) {
      case 'tenureOrPermit':
        matches = event.target.value.match(/p-(\d+)/);
        if (matches !== null) {
          currentState['parksPermit'] = matches[1];
          currentState['tenure'] = '';
        }
        matches = event.target.value.match(/t-(\d+)/);
        if (matches !== null) {
          currentState['tenure'] = matches[1];
          currentState['parksPermit'] = '';
        }
        break;
      default:
        currentState[event.target.name] = event.target.value;
    }

    setFormState(currentState);
  }


  const setUploadFiles = useCallback((files) => {
    setFiles(files);
  }, []);


  const doUpload = () => {
    const torpMetadata = {};

    if (formState.parksPermit !== null && formState.parksPermit !== '') {
      torpMetadata['permit'] = formState.parksPermit;
    } else if (formState.tenure !== null && formState.tenure !== '') {
      torpMetadata['tenure'] = formState.tenure;
    }


    dispatch({
      type: TRAVEL_PATH_UPLOAD_REQUEST, payload: {
        files,
        metadata: {
          modeOfTransport: formState.modeOfTransport,
          ...torpMetadata
        }
      }
    })
    handleClose();
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
              {modes.map((m, i) => (
                <MenuItem key={i} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl className={classes.formControl}>
            <InputLabel id="label-related-select">Tenure or BC Parks Permit</InputLabel>

            <Select
              defaultValue={``}
              name="tenureOrPermit"
              labelId="label-related-select"
              id="related-select"
              onChange={handleUpdate}
            >
              <MenuItem disabled={true} value={""}>Tenures</MenuItem>

              {tenures.map((m, i) => (
                <MenuItem key={`t-${m.id}`} value={`t-${m.id}`}>{m.reference}</MenuItem>
              ))}

              <MenuItem disabled={true} value={""}>Park Permits</MenuItem>

              {permits.map((m, i) => (
                <MenuItem key={`p-${m.id}`} value={`p-${m.id}`}>{m.reference}</MenuItem>
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

export default CreateActivityDialog;
