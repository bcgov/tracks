import React, {useEffect} from 'react';
import {useParams} from "react-router";
import DetailPane, {DetailMap} from "../../../common/components/DetailPane";
import {useDispatch, useSelector} from "react-redux";
import {OperatorActions} from "../../../state/actions";
import Loading from "../../../common/components/Loading";

const OperatorDetail = () => {
    const params = useParams();
    const item = useSelector(state => state.Operators.item);
    const loading = useSelector(state => state.Operators.loading);
    const dispatch = useDispatch();
    const load = (id) => dispatch({type: OperatorActions.DETAIL_REQUEST, payload: {id, api: 'admin'}});


    useEffect(() => {
      load(params.id);
    }, [params.id]);


    if (loading || item === null || item === undefined) {
      return (<Loading />);
    }


    const detailMapping = {
      title: 'Commercial Operator Detail',
      map: [
        DetailMap('name', 'Name'),
        DetailMap('region', 'Region'),
        DetailMap('active', 'active', (v) => (v.active ? 'Active' : 'Inactive')),
      ]
    }

    return (
      <DetailPane it={item} title={detailMapping.title} map={detailMapping.map} />
    );
  }
;

export default OperatorDetail;
