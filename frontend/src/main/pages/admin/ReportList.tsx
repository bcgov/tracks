import React from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/Loading";
import {useSelector} from "react-redux";
import {ReportActions} from "../../../state/actions";
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/FriendlyTime";

const ReportList = () => {
  const detailRoute = `/operator/reports/view/:id`;

  const items = useSelector(state => state.Reports.items);
  const loading = useSelector(state => state.Reports.loading);

  useList(ReportActions, 'admin');

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key={'u'}>{it.user}</td>,
      <td key={'st'}>{it.state}</td>,
      <td key={'sd'}><FriendlyTime value={it.period_start_date} /></td>,
      <td key={'ed'}><FriendlyTime value={it.period_end_date} /></td>,
      <td key={'pp'}><FriendlyTime value={it.updated_at} from /></td>
    ]
  )

  return (
    <>
      <h2>Track Observation Reports</h2>

      <ListComponent items={items}
                     headers={['Conservation Officer', 'State', 'Period Start', 'Period End', 'Last Updated']}
                     rowRenderer={renderer} />

    </>
  );
};


export default ReportList;
