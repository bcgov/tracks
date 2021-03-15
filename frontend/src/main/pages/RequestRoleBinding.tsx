import React from 'react';
import ButtonBar from "../components/ButtonBar";
import {Button, FormControl, Input, InputLabel, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";
import FormGroup from "../components/FormGroup";
import {connect} from "react-redux";

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
  const {actingAs, currentUserRoles, bestName} = props;
  const classes = useStyles();

  return (
    <div className={'container'} id={"mainColumnLayout"}>
      <div className={'containerInner'}>

        <div>
          <h1>Welcome to TRACKS, {actingAs.name}</h1>

          <Typography variant={'h5'}>New User</Typography>

          <div>
            <p>Your Business BCeID is not yet associated with a Commercial Recreation Operator profile. To
              use <strong>TRACKS</strong>, your
              BCeID account must be linked with an existing Commercial Operator. Please use this form to submit your
              request for access. It will be reviewed by the appropriate authority.
            </p>
          </div>

          <FormGroup>

            <Typography variant={'h5'}>Access Request</Typography>

            <FormControl className={classes.formControl}>
              <InputLabel id="label-role-select">Requested Access</InputLabel>

              <Select
                labelId="label-role-select"
                name="role"

              >
                <MenuItem value={"cr"}>CR Operator</MenuItem>
              </Select>
            </FormControl>
            <p><strong>CR Operator</strong>: Commercial Recreation operator with a Tenure agreement and/or Park Permit with the BC Government</p>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="label-activity-select">Reason</InputLabel>
              <Input type={'text'} placeholder={"Your reason for requesting access"}></Input>
            </FormControl>
            <br />

            <FormControl className={classes.formControl}>
              <InputLabel id="label-activity-select">Email Address</InputLabel>
              <Input type={'email'} placeholder={"Your contact email"}></Input>
            </FormControl>

            <div>
              <ButtonBar>
                <Button
                  variant="contained"
                  color="primary"
                >Submit Request</Button>
              </ButtonBar>

            </div>
          </FormGroup>


        </div>
      </div>
    </div>
  )

};

const mapStateToProps = (state) => {
  const mappedProps = {
    currentUserRoles: state.Auth.roles,
    bestName: state.Auth.bestName,
    actingAs: state.Auth.developmentTools.actingAs
  };

  return mappedProps;
}


export default connect(mapStateToProps, null)(RequestRoleBinding);
