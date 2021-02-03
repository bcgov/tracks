import React, {useEffect} from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {ReportActions} from "../../../state/actions";
import moment from "moment";

const ReportList = () => {
  const detailRoute = `/operator/reports/view/:id`;

  const items = useSelector(state => state.Reports.items);
  const loading = useSelector(state => state.Reports.loading);
  const dispatch = useDispatch();
  const load = () => dispatch({type: ReportActions.LIST_REQUEST, payload: {api: 'officer'}})

  useEffect(() => {
    load();
  }, []);

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key={'st'}>{it.state}</td>,
      <td key={'sd'}>{moment(it.period_start_date).format('ll')}</td>,
      <td key={'ed'}>{moment(it.period_end_date).format('ll')}</td>,
      <td key={'pp'}>{moment(it.updated_at).fromNow()}</td>
    ]
  )

  return (
    <>
      <h2>My Track Observation Reports</h2>

      <ListComponent items={items} detailRoute={detailRoute}
                     headers={['State', 'Period Start', 'Period End', 'Last Updated']}
                     rowRenderer={renderer} />

    </>
  );
};


export default ReportList;
