import React, {useState} from 'react';
import ButtonBar from "../components/ButtonBar";
import {Button, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";
import FormGroup from "../components/FormGroup";
import {connect, useDispatch, useSelector} from "react-redux";
import {SIGNUP_REQUEST_BINDING_SUBMIT} from "../../state/actions";
import CONFIG from "../../config";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const RequestRoleBinding = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    reason: '',
    requestedRole: 'commercial_operator'
  });

  const {idir} = props;
  const auth = useSelector(state => state.Auth);

  if (CONFIG.DEVELOPMENT_MODE) {
    return (<p>This page does not function in developer mode</p>);
  }

  const bceIdRoles = [
    {
      value: 'commercial_operator',
      name: 'CR Operator',
      help: (
        <p><strong>CR Operator</strong>: Commercial Recreation operator with a Tenure agreement and/or Park Permit with
          the BC Government</p>)
    }
  ];

  const idirRoles = [
    {
      name: 'Area Administrator',
      value: 'area_admin',
      help: 'Administer an area'
    },
    {
      name: 'System Administrator',
      value: 'admin',
      help: 'Administer the system'
    },
    {
      name: 'Conservation Officer',
      value: 'conservation_officer',
      help: 'Submit reports'
    },
  ];

  const [roles, setRoles] = useState(idir ? idirRoles : bceIdRoles);

  const sendRequest = () => {
    dispatch({
      type: SIGNUP_REQUEST_BINDING_SUBMIT, payload: {
        request: {
          reason: formState.reason,
          requestedRole: formState.requestedRole,
        }
      }
    });
  }

  const handleChange = (event) => {
    const updatedState = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    setFormState(updatedState)
  }


  const bceidMessage = () => (
    <p>Your Business BCeID is not yet associated with a Commercial Recreation Operator profile. To
      use <strong>TRACKS</strong>, your
      BCeID account must be linked with an existing Commercial Operator. Please use this form to submit your
      request for access. It will be reviewed by the appropriate authority.
    </p>
  );
  const idirMessage = () => (
    <p>Your IDIR is not yet associated with a role.</p>
  )

  const roleHelp = () => {
    if (formState.requestedRole == null) {
      return null;
    }
    const foundRole = roles.find(r => r.value == formState.requestedRole);
    if (foundRole) {
      return (foundRole.help);
    }
    return null;

  }

  return (
    <div className={'container'} id={"mainColumnLayout"}>
      <div className={'containerInner'}>

        <div>
          <Typography variant={'h5'}>New User</Typography>

          <div>
            {idir && idirMessage()}
            {!idir && bceidMessage()}
          </div>

          <FormGroup>

            <Typography variant={'h5'}>Access Request</Typography>

            <FormControl className={classes.formControl}>
              <InputLabel id="label-role-select">Requested Access</InputLabel>

              <Select
                labelId="label-role-select"
                name="requestedRole"
                onChange={handleChange}
                value={formState.requestedRole}
              >
                {roles.map(r => (
                    <MenuItem value={r.value}>{r.name}</MenuItem>
                  )
                )}

              </Select>
            </FormControl>

              <p>
                {roleHelp()}
              </p>

            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="label-activity-select">Reason</InputLabel>
              <Input name='reason' onChange={handleChange} type={'text'}
                     placeholder={"Your reason for requesting access"} value={formState.reason}></Input>
            </FormControl>
            <br />

            <div>
              <ButtonBar>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendRequest}
                >Submit Request</Button>
              </ButtonBar>

            </div>
          </FormGroup>


        </div>
      </div>
    </div>
  )

};

RequestRoleBinding.defaultProps = {
};

const mapStateToProps = (state) => {
  const mappedProps = {
    currentUserRoles: state.Auth.roles,
    bestName: state.Auth.bestName,
    idir: state.Auth.idir
  };

  return mappedProps;
}


export default connect(mapStateToProps, null)(RequestRoleBinding);
