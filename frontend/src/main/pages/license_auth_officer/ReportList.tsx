import React, {useEffect} from 'react';
import ListComponent from "../../../common/components/ListComponent";
import Loading from "../../../common/components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {ReportActions} from "../../../state/actions";
import moment from "moment";

const ReportList = () => {
  const detailRoute = `/operator/reports/view/:id`;

  const items = useSelector(state => state.Reports.items);
  const loading = useSelector(state => state.Reports.loading);
  const dispatch = useDispatch();
  const load = () => dispatch({type: ReportActions.LIST_REQUEST, payload: {api: 'license_auth_officer'}})

  useEffect(() => {
    load();
  }, []);

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key={'o'}>{it.organizationname}</td>,
      <td key={'t'}>{it.tenure}</td>,
      <td key={'st'}>{it.state}</td>,
      <td key={'sd'}>{moment(it.period_start_date).format('ll')}</td>,
      <td key={'ed'}>{moment(it.period_end_date).format('ll')}</td>,
      <td key={'pp'}>{moment(it.updated_at).fromNow()}</td>
    ]
  )

  return (
    <>
      <h2>Travel Path Reports</h2>

      <ListComponent items={items}
                     //detailRoute={detailRoute}
                     headers={['Organization', 'Tenure', 'State', 'Period Start', 'Period End', 'Updated']}
                     rowRenderer={renderer} />

    </>
  );
}


export default ReportList;
