import React from 'react';
import CONFIG from "../../../config";
import {useParams} from "react-router";
import DetailPane, {DetailMap} from "../../components/DetailPane";

const OfficerDetail = () => {
  const path = `${CONFIG.API_BASE}/api/v1/admin/officers/:id`;
  const params = useParams();

  const detailMapping = {
    title: 'Conservation Officer Detail',
    map: [
      DetailMap('name', 'Name'),
      DetailMap('region', 'Region'),
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

export default OfficerDetail;
