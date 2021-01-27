import React, {useEffect} from 'react';
import {useParams} from "react-router";
import '../../../common/styles/travel_path.scss';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../common/components/Loading";
import TravelPathDetailComponent from "../../../common/components/TravelPathDetailComponent";
import {TravelPathActions} from "../../../state/actions";

const TravelPathDetail = () => {

  const params = useParams();
  const history = useHistory();

  const item = useSelector(state => state.TravelPaths.item);
  const loading = useSelector(state => state.TravelPaths.loading);
  const dispatch = useDispatch();
  const load = (id) => dispatch({type: TravelPathActions.DETAIL_REQUEST, payload: {id, api: 'operator'}});

  useEffect(() => {
    load(params.id);
  }, [params.id]);


  if (loading || item === null || item === undefined) {
    return (<Loading />);
  }

  return (
    <>
      <h2>Travel Path Detail</h2>
      <TravelPathDetailComponent travelPath={item} />
      {(history.length >= 1) &&
      <button onClick={() => history.goBack()}>Go back</button>}
    </>
  );
};


export default TravelPathDetail;
