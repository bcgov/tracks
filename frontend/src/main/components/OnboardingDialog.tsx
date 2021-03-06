import React, {useState} from "react";
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
  Select
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import FriendlyTime from "./FriendlyTime";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const OnboardingDialog = (props) => {
  const {open, handleClose, organizations, request} = props;

  const classes = useStyles();

  const dispatch = useDispatch();
  const authHeaders = useSelector(state => state.Auth.headers);

  const [formState, setFormState] = useState({
    organization: request.requested_organization_id,
  });

  const [acceptDisabled, setAcceptDisabled] = useState(request.requested_organization_id == null);

  const handleUpdate = (event) => {
    const currentState = formState;
    currentState[event.target.name] = event.target.value;
    setFormState(currentState);
    setAcceptDisabled(formState.organization == null);
  }

  const doIt = (action) => {
    const payload = {
      id: request.id,
      action: action,
      organization: formState.organization
    };

    //@todo move to saga
    axios.post(`${window.CONFIG.API_BASE}/api/v1/admin/onboarding`,
      payload,
      {
        headers: authHeaders,
      }).then(() => {
      handleClose();
    });

  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
      <DialogTitle id="form-dialog-title">Actioning Onboarding Request</DialogTitle>
      <DialogContent>

        <Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>
          <DialogContentText>
            Review Onboarding Request
          </DialogContentText>

          <dt>User</dt>
          <dd>{request.full_name}</dd>

          <dt>OIDC Username</dt>
          <dd>{request.username}</dd>

          <dt>Email</dt>
          <dd>{request.email}</dd>

          <dt>Requesting Role</dt>
          <dd>{request.requested_role}</dd>

          <dt>Reason</dt>
          <dd>{request.reason}</dd>


          <dt>Requested Organization</dt>
          <dd>
            <FormControl className={classes.formControl}>
              <InputLabel id="label-org-select">Select Organization</InputLabel>
              <Select
                labelId="label-org-select"
                id="org-select"
                defaultValue={formState.organization}
                name="organization"
                onChange={handleUpdate}>
                <MenuItem disabled={true} value={""}>Select</MenuItem>
                {organizations.map((m, i) => (
                  <MenuItem key={i} value={m.id}>{m.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </dd>

          <dt>Request Status</dt>
          <dd>{request.status}</dd>

          <dt>Request Time</dt>
          <dd><FriendlyTime time from value={request.created} /></dd>


        </Box>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            doIt('REJECT')
          }}
          color="secondary" variant="contained">
          Reject
        </Button>
        <Button
          onClick={() => {
            doIt('ACCEPT')
          }}
          disabled={acceptDisabled} color="primary" variant="contained">
          Accept
        </Button>

      </DialogActions>
    </Dialog>
  )
}

export default OnboardingDialog;
