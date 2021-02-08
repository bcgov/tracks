import React, {useEffect} from 'react';
import ListComponent from "../../components/ListComponent";
import {useDispatch, useSelector} from "react-redux";
import {OperatorActions} from "../../../state/actions";
import Loading from "../../components/Loading";
import ButtonBar from "../../components/ButtonBar";
import {Button} from "@material-ui/core";

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
      <h2>Commercial Operators</h2>
      <ButtonBar>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/admin/organizations/add')}
        >Create New</Button>
      </ButtonBar>
      <ListComponent items={items}
                     detailRoute={detailRoute}
                     headers={['Name', 'Region', 'Type', 'Last Activity Date', 'Status']}
                     rowRenderer={renderer} />
    </>
  );
};

export default OperatorList;
