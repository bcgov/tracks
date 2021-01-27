import React from 'react';
import CONFIG from "../../../config";
import {useParams} from "react-router";
import DetailPane, {DetailMap} from "../../../common/components/DetailPane";

const TenureDetail = () => {
  const path = `${CONFIG.API_BASE}/api/v1/operator/tenures/:id`;
  const params = useParams();

  const detailMapping = {
    title: 'Tenure Detail',
    map: [
      DetailMap('reference', 'Reference'),
      DetailMap('subtenures', 'Subtenures'),
      DetailMap('startdate', 'Start Date'),
      DetailMap('enddate', 'End Date'),
    ]
  }

  const renderer = (it) => (
    <DetailPane it={it} title={detailMapping.title} map={detailMapping.map} />
  )

  return (
    <>
      {/*<DetailComponent id={params.id} path={path} renderer={renderer} />*/}
    </>
  );
};

export default TenureDetail;
