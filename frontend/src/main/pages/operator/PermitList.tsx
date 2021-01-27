import React, {useEffect} from 'react';
import ListComponent from "../../../common/components/ListComponent";
import {useDispatch, useSelector} from "react-redux";
import {PermitActions} from "../../../state/actions";
import Loading from "../../../common/components/Loading";

const PermitList = () => {

  const items = useSelector(state => state.Permits.items);
  const loading = useSelector(state => state.Permits.loading);
  const dispatch = useDispatch();
  const load = () => dispatch({type: PermitActions.LIST_REQUEST, payload: {api: 'operator'}})

  useEffect(() => {
    load();
  }, []);

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key='ref'>{it.reference}</td>,
      <td key='sd'>{it.startdate}</td>,
      <td key='ed'>{it.enddate}</td>
    ]
  )

  return (
    <>
      <h2>My Park Permits</h2>
      <ListComponent items={items} headers={['Reference', 'Start Date', 'End Date']} rowRenderer={renderer} />
    </>
  );
};

export default PermitList;
