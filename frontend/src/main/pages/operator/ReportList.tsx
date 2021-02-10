import React, {useEffect} from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {ReportActions} from "../../../state/actions";
import moment from "moment";
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/FriendlyTime";

const ReportList = () => {
  // const detailRoute = `/operator/reports/view/:id`;

  const items = useSelector(state => state.Reports.items);
  const loading = useSelector(state => state.Reports.loading);

  useList(ReportActions, 'operator');

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key={'st'}>{it.state}</td>,
      <td key={'torp'}>{it.tenure} {it.parkpermit}</td>,
      <td key={'sd'}><FriendlyTime value={it.period_start_date}/></td>,
      <td key={'ed'}><FriendlyTime value={it.period_end_date}/></td>,
      <td key={'pp'}><FriendlyTime value={it.updated_at} from/></td>
    ]
  )
  return (
    <>
      <h2>Travel Path Reports</h2>

      <ListComponent items={items}
                     headers={['State', 'Tenure or Park Permit', 'Period Start', 'Period End', 'Last Updated']}
                     rowRenderer={renderer} />

    </>
  );
};


export default ReportList;
