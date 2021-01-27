import React, {useEffect} from 'react';
import ListComponent from "../../../common/components/ListComponent";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {OperatorActions} from "../../../state/actions";
import Loading from "../../../common/components/Loading";

const OperatorList = () => {
  const detailRoute = `/admin/organizations/view/:id`;

  const items = useSelector(state => state.Operators.items);
  const loading = useSelector(state => state.Operators.loading);
  const dispatch = useDispatch();
  const load = () => dispatch({type: OperatorActions.LIST_REQUEST, payload: {api: 'admin'}})

  const renderer = (it) => (
    [
      <td key='name'>{it.name}</td>,
      <td key='region'>{it.region}</td>,
      <td key='type'>{it.type}</td>,
      <td key='activity'><em>Placeholder</em></td>,
      <td key='active'>{it.active ? 'Active' : 'Inactive'}</td>
    ]
  )


  useEffect(() => {
    load();
  }, []);

  if (loading || items === undefined) {
    return (<Loading />);
  }

  return (
    <>
      <h2>Organizations</h2>
      <ListComponent items={items}
                     detailRoute={detailRoute}
                     headers={['Name', 'Region', 'Type', 'Last Activity Date', 'Status']}
                     rowRenderer={renderer} />

      <Link to={'/admin/organizations/add'}>Create New Commercial Operator</Link>
    </>
  );
};

export default OperatorList;
