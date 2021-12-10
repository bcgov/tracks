import React from 'react';
import ListComponent from "../../components/ListComponent";
import {TenureActions} from "../../../state/actions";
import Loading from "../../components/util/Loading";
import ButtonBar from "../../components/util/ButtonBar";
import {Button} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {useList} from "../../../state/utilities/use_list";
import FriendlyTime from "../../components/util/FriendlyTime";
import {useSelector} from "../../../state/utilities/use_selector";

const TenureList: React.FC = () => {

  const items = useSelector(state => state.Tenures.items);
  const loading = useSelector(state => state.Tenures.loading);
  const navigate = useNavigate();

  useList(TenureActions, 'license_auth_officer');

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key='n'>{it.organizationname}</td>,
      <td key='ref'>{it.reference}</td>,
      <td key='st'>{it.subtenures}</td>,
      <td key='sd'><FriendlyTime value={it.startdate} /></td>,
      <td key='ed'><FriendlyTime value={it.enddate} /></td>
    ]
  )

  return (
    <>
      <h2>Tenure Assignments</h2>
      <ButtonBar>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/license_auth_officer/tenures/add')}
        >Create New Assignment</Button>
      </ButtonBar>

      <ListComponent items={items} headers={['Operator', 'Reference', 'Subtenures', 'Start Date', 'End Date']}
                     rowRenderer={renderer} />
    </>
  );
};

export default TenureList;
