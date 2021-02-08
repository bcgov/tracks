import React, {useEffect} from 'react';
import {useParams} from "react-router";
import '../../styles/components/travel_path.scss';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../components/Loading";
import ActivityDetailComponent from "../../components/ActivityDetailComponent";
import {ActivityActions} from "../../../state/actions";

const ActivityDetail = () => {

  const params = useParams();
  const history = useHistory();

  const item = useSelector(state => state.Activities.item);
  const loading = useSelector(state => state.Activities.loading);
  const dispatch = useDispatch();
  const load = (id) => dispatch({type: ActivityActions.DETAIL_REQUEST, payload: {id, api: 'operator'}});
  const unload = () => dispatch({type: ActivityActions.DETAIL_UNLOAD});

  useEffect(() => {
    load(params.id);
    return () => {
      unload();
    }
  }, [params.id]);


  if (loading || item === null || item === undefined) {
    return (<Loading />);
  }

  return (
    <>
      <h2>Activity Detail</h2>
      <ActivityDetailComponent travelPath={item} />
      {(history.length >= 1) &&
      <button onClick={() => history.goBack()}>Go back</button>}
    </>
  );
};


export default ActivityDetail;
