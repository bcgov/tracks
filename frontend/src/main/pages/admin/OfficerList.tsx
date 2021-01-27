import React from 'react';
import ListComponent from "../../../common/components/ListComponent";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {OfficerActions} from "../../../state/actions";
import Loading from "../../../common/components/Loading";

const OfficerList = () => {

  const items = useSelector(state => state.Officers.items);
  const loading = useSelector(state => state.Officers.loading);
  const dispatch = useDispatch();
  const load = () => dispatch({type: OfficerActions.LIST_REQUEST, payload: {api: 'admin'}})

  const detailRoute = `/admin/officers/view/:id`;

  const renderer = (it) => (
    [
      <td key='name'>{it.name}</td>,
      <td key='region'>{it.region}</td>
    ]
  )

  if (loading || items === undefined) {
    return (<Loading />);
  }

  return (
    <>
      <h2>Conservation Officers</h2>
      <ListComponent items={items} detailRoute={detailRoute} headers={['Name', 'Region']} rowRenderer={renderer} />
      {/*<Link to={'/admin/officers/add'}>Create New</Link>*/}

    </>
  );
};

export default OfficerList;
