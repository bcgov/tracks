import React, {useEffect} from 'react';
import ListComponent from "../../components/ListComponent";
import {useDispatch, useSelector} from "react-redux";
import {PermitActions, ReportActions} from "../../../state/actions";
import Loading from "../../components/Loading";
import ButtonBar from "../../components/ButtonBar";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import moment from "moment";
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/FriendlyTime";

const PermitList = () => {

  const items = useSelector(state => state.Permits.items);
  const loading = useSelector(state => state.Permits.loading);

  useList(PermitActions, 'area_admin');

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key='org'>{it.organizationname}</td>,
      <td key='ref'>{it.reference}</td>,
      <td key='sd'><FriendlyTime value={it.startdate}/></td>,
      <td key='ed'><FriendlyTime value={it.enddate}/></td>
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
