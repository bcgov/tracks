import React, {useEffect} from 'react';
import ListComponent from "../../components/ListComponent";
import {useDispatch, useSelector} from "react-redux";
import {TenureActions} from "../../../state/actions";
import Loading from "../../components/Loading";
import ButtonBar from "../../components/ButtonBar";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const TenureList = () => {

  const items = useSelector(state => state.Tenures.items);
  const loading = useSelector(state => state.Tenures.loading);
  const dispatch = useDispatch();
  const load = () => dispatch({type: TenureActions.LIST_REQUEST, payload: {api: 'license_auth_officer'}})
  const history = useHistory();

  useEffect(() => {
    load();
  }, []);

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key='n'>{it.organizationname}</td>,
      <td key='ref'>{it.reference}</td>,
      <td key='st'>{it.subtenures}</td>,
      <td key='sd'>{it.startdate}</td>,
      <td key='ed'>{it.enddate}</td>
    ]
  )

  return (
    <>
      <h2>My Tenures</h2>
      <ButtonBar>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/license_auth_officer/tenures/add')}
        >Create New Assignment</Button>
      </ButtonBar>

      <ListComponent items={items} headers={['Operator', 'Reference', 'Subtenures', 'Start Date', 'End Date']}
                     rowRenderer={renderer} />
    </>
  );
};

export default TenureList;
