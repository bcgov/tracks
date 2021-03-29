import React, {useState} from 'react';
import Loading from "../../components/Loading";
import {useSelector} from "react-redux";
import {OnboardingRequestActions} from "../../../state/actions";
import {useList} from "../../../state/utilities/use_list";
import OnboardingDialog from "../../components/OnboardingDialog";
import ListComponent from "../../components/ListComponent";
import FriendlyTime from "../../components/FriendlyTime";
import {Button} from "@material-ui/core";

const OnboardingList = () => {

  const items = useSelector(state => state.OnboardingRequests.items);
  const loading = useSelector(state => state.OnboardingRequests.loading);

  const organizations = [
    {id: 2, name: 'Government of British Columbia'},
    {id: 1, name: 'Commercial Operator 1'},
    {id: 3, name: 'Commercial Operator 2'},
  ]

  const [actionState, setActionState] = useState({
    request: null
  });
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  }

  useList(OnboardingRequestActions, 'admin');

  if (loading || items === undefined) {
    return (<Loading />);
  }

  const renderer = (it) => (
    [
      <td key={'fn'}>{it.full_name}</td>,
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
    <>
      <h2>User Onboarding Requests</h2>

      {actionState.request &&
      <OnboardingDialog request={actionState.request} organizations={organizations} open={modalOpen}
                        handleClose={handleClose} />
      }

      <ListComponent items={items}
                     headers={['User', 'Requested Role', 'Status', 'Date', 'Action']}
                     rowRenderer={renderer}></ListComponent>
    </>
  );

}


export default OnboardingList;
