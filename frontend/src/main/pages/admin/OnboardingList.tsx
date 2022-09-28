import React, {useState} from 'react';
import Loading from "../../components/util/Loading";
import {OnboardingRequestActions} from "../../../state/actions";
import {useList} from "../../../state/utilities/use_list";
import OnboardingDialog from "../../components/auth/OnboardingDialog";
import ListComponent from "../../components/ListComponent";
import FriendlyTime from "../../components/util/FriendlyTime";
import {Button} from "@material-ui/core";
import {useSelector} from "../../../state/utilities/use_selector";

const OnboardingList: React.FC = () => {
  const organizations = [
    {id: 1, name: 'Government of British Columbia'},
    {id: 2, name: 'Commercial Operator 1'},
    {id: 3, name: 'Commercial Operator 2'},
  ];
  
  const items = useSelector(state => state.OnboardingRequests.items);
  const loading = useSelector(state => state.OnboardingRequests.loading);

  const [actionState, setActionState] = useState({
    request: null
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);

  const handleClose = () => {
    setModalOpen(false);
    setUpdateCount(updateCount+1);
  }

  useList(OnboardingRequestActions, 'admin', [updateCount]);

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key={'fn'}>{it.full_name}</td>,
      <td key={'type'}>{it.username.substring(it.username.indexOf('@') + 1, it.username.length)}</td>,
      <td key={'r'}>{it.requested_role}</td>,
      <td key={'s'}>{it.status}</td>,
      <td key={'t'}><FriendlyTime time from value={it.created} /></td>,
      <td key={'a'}>{it.status == 'PENDING' &&
      <Button
        onClick={() => {
          setActionState({
            request: it
          });
          setModalOpen(true);
        }}
        variant="contained"
        color="primary"
      >Action</Button>
      }
      </td>
    ]
  )

  return (
    <div>
      <h2>User Onboarding Requests</h2>

      {actionState.request &&
      <OnboardingDialog request={actionState.request} organizations={organizations} open={modalOpen}
                        handleClose={handleClose} />
      }

      <ListComponent items={items}
                     headers={['User','Type of Account' ,'Requested Role', 'Status', 'Date', 'Action']}
                     rowRenderer={renderer}></ListComponent>
    </div>
  );

}
export default OnboardingList;
