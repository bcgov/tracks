import React from 'react';
import ListComponent from "../../components/ListComponent";
import Loading from "../../components/util/Loading";
import {ReportActions} from "../../../state/actions";
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/util/FriendlyTime";
import {useSelector} from "../../../state/utilities/use_selector";

const ReportList : React.FC= () => {
  const items = useSelector(state => state.Reports.items);
  const loading = useSelector(state => state.Reports.loading);

  useList(ReportActions, 'license_auth_officer');

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key={'o'}>{it.organizationname}</td>,
      <td key={'t'}>{it.tenure}</td>,
      <td key={'st'}>{it.state}</td>,
      <td key={'sd'}><FriendlyTime value={it.period_start_date} /></td>,
      <td key={'ed'}><FriendlyTime value={it.period_end_date} /></td>,
      <td key={'pp'}><FriendlyTime value={it.updated_at} from /></td>
    ]
  )

  return (
    <>
      <h2>Travel Path Reports</h2>

      <ListComponent items={items}
                     headers={['Organization', 'Tenure', 'State', 'Period Start', 'Period End', 'Updated']}
                     rowRenderer={renderer} />

    </>
  );
}


export default ReportList;
