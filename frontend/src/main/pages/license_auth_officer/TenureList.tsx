import React, {useEffect} from 'react';
import ListComponent from "../../components/ListComponent";
import {useDispatch, useSelector} from "react-redux";
import {TenureActions} from "../../../state/actions";
import Loading from "../../components/Loading";

const TenureList = () => {

  const items = useSelector(state => state.Tenures.items);
  const loading = useSelector(state => state.Tenures.loading);
  const dispatch = useDispatch();
  const load = () => dispatch({type: TenureActions.LIST_REQUEST, payload: {api: 'license_auth_officer'}})

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
      <ListComponent items={items} headers={['Operator', 'Reference', 'Subtenures', 'Start Date', 'End Date']}
                     rowRenderer={renderer} />
    </>
  );
};

export default TenureList;
