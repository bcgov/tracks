import React, {useEffect} from 'react';
import {useParams} from "react-router";
import '../../styles/components/travel_path.scss';
import {useDispatch} from "react-redux";
import Loading from "../../components/util/Loading";
import ActivityDetailComponent from "../../components/ActivityDetailComponent";
import {ActivityActions} from "../../../state/actions";
import {useSelector} from "../../../state/utilities/use_selector";

const ActivityDetail = () => {

	const params = useParams();

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
		return (<Loading/>);
	}

	return (
		<>
			<h2>Travel Path Report Details</h2>
			<ActivityDetailComponent travelPath={item}/>
		</>
	);
};


export default ActivityDetail;
