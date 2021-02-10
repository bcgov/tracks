import React, {useEffect} from 'react';
import ListComponent from "../../../components/ListComponent";
import {useDispatch, useSelector} from "react-redux";
import {PermitActions, TenureActions} from "../../../../state/actions";
import Loading from "../../../components/Loading";
import moment from "moment";
import {useList} from "../../../../state/utilities/use_list";

const TenureList = () => {

  const items = useSelector(state => state.Tenures.items);
  const loading = useSelector(state => state.Tenures.loading);

  useList(TenureActions, 'operator');

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key='ref'>{it.reference}</td>,
      <td key='st'>{it.subtenures}</td>,
      <td key='sd'>{moment(it.startdate).format('ll')}</td>,
      <td key='ed'>{it.enddate !== null ? moment(it.enddate).format('ll') : ''}</td>
    ]
  )

  return (
    <>
      <h2>Tenures</h2>
      <ListComponent items={items}
                     headers={['Reference', 'Subtenures', 'Start Date', 'End Date']}
                     rowRenderer={renderer} />
    </>
  );
};

export default TenureList;
