import React, {useEffect} from 'react';
import ListComponent from "../../components/ListComponent";
import {useDispatch, useSelector} from "react-redux";
import {PermitActions} from "../../../state/actions";
import Loading from "../../components/Loading";
import ButtonBar from "../../components/ButtonBar";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const PermitList = () => {

  const items = useSelector(state => state.Permits.items);
  const loading = useSelector(state => state.Permits.loading);
  const dispatch = useDispatch();
  const load = () => dispatch({type: PermitActions.LIST_REQUEST, payload: {api: 'area_admin'}})
  const history = useHistory();

  useEffect(() => {
    load();
  }, []);

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key='org'>{it.organizationname}</td>,
      <td key='ref'>{it.reference}</td>,
      <td key='sd'>{it.startdate}</td>,
      <td key='ed'>{it.enddate}</td>
    ]
  )
  return (
    <>
      <h2>Park Permit Assignments</h2>

      <ButtonBar>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/area_admin/permits/add')}
        >Create New Assignment</Button>
      </ButtonBar>

      <ListComponent items={items} headers={['Organization', 'Reference', 'Start Date', 'End Date']}
                     rowRenderer={renderer} />


    </>
  );
}

export default PermitList;
