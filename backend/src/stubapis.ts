import {Response} from "express";

/* This file is a stub API for use in frontend development. It returns simulated response */

const data = {
  admin: {
    organizations: {
      list: [{
        "id": "1",
        "name": "Commercial Operator 1",
        "region": "British Columbia",
        "type": "COMMERCIAL OPERATOR",
        "active": true
      }, {
        "id": "3",
        "name": "Commercial Operator 2",
        "region": "British Columbia",
        "type": "COMMERCIAL OPERATOR",
        "active": true
      }],
      view: {
        "id": "3",
        "name": "Commercial Operator 2",
        "region": "British Columbia",
        "type": "COMMERCIAL OPERATOR",
        "active": true
      }
    },
    reports: {
      list: [{
        "user": "co2",
        "organizationname": "Commercial Operator 2",
        "id": "6",
        "state": "SUBMITTED",
        "parkpermit": null,
        "tenure": null,
        "period_start_date": "2019-12-31T16:00:00.000Z",
        "period_end_date": "2021-12-30T16:00:00.000Z",
        "updated_at": "2021-01-27T09:53:52.779Z"
      }]
    },
  },
  area_admin: {
    reports: {
      list: [{
        "user": "co2",
        "organizationname": "Commercial Operator 2",
        "id": "6",
        "state": "SUBMITTED",
        "parkpermit": null,
        "tenure": null,
        "period_start_date": "2019-12-31T16:00:00.000Z",
        "period_end_date": "2021-12-30T16:00:00.000Z",
        "updated_at": "2021-01-27T09:53:52.779Z"
      }],
    },
    permits: {
      list: [{"id": "4", "startdate": "2021-01-23T16:00:00.000Z", "enddate": null, "reference": "PP0004"}, {
        "id": "5",
        "startdate": "2020-12-21T16:00:00.000Z",
        "enddate": null,
        "reference": "PP0005"
      }]
    }
  },
  license_auth_officer: {
    reports: {
      list: [{
        "user": "co2",
        "organizationname": "Commercial Operator 2",
        "id": "6",
        "state": "SUBMITTED",
        "parkpermit": null,
        "tenure": null,
        "period_start_date": "2019-12-31T16:00:00.000Z",
        "period_end_date": "2021-12-30T16:00:00.000Z",
        "updated_at": "2021-01-27T09:53:52.779Z"
      }],
    },
    tenures: {
      list: [{
        "id": "1",
        "organizationname": "Commercial Operator 1",
        "organizationid": "1",
        "startdate": "2021-01-23T16:00:00.000Z",
        "subtenures": "0",
        "enddate": "2024-01-26T16:00:00.000Z",
        "reference": "TEN-0001"
      }, {
        "id": "2",
        "organizationname": "Commercial Operator 1",
        "organizationid": "1",
        "startdate": "2021-01-23T16:00:00.000Z",
        "subtenures": "0",
        "enddate": "2024-01-26T16:00:00.000Z",
        "reference": "TEN-0002"
      }, {
        "id": "3",
        "organizationname": "Commercial Operator 1",
        "organizationid": "1",
        "startdate": "2021-01-23T16:00:00.000Z",
        "subtenures": "0",
        "enddate": "2024-01-26T16:00:00.000Z",
        "reference": "TEN-0003"
      }, {
        "id": "4",
        "organizationname": "Commercial Operator 2",
        "organizationid": "3",
        "startdate": "2021-01-23T16:00:00.000Z",
        "subtenures": "0",
        "enddate": "2024-01-26T16:00:00.000Z",
        "reference": "TEN-0006"
      }]
    }
  },
  commercial_operator: {
    reports: {
      list: [{
        "id": "1",
        "state": "DRAFT",
        "parkpermit": null,
        "tenure": "TEN-0002",
        "period_start_date": "2018-12-31T16:00:00.000Z",
        "period_end_date": "2020-12-30T16:00:00.000Z",
        "updated_at": "2021-01-27T09:50:28.192Z"
      }, {
        "id": "2",
        "state": "SUBMITTED",
        "parkpermit": null,
        "tenure": "TEN-0002",
        "period_start_date": "2017-12-31T16:00:00.000Z",
        "period_end_date": "2019-12-30T16:00:00.000Z",
        "updated_at": "2021-01-27T09:51:24.880Z"
      }]
    },
    travel_paths: {
      list: [{
        "id": "1",
        "createdat": "2021-01-26T09:26:45.115Z",
        "mode": "CYCLE",
        "meters": 198590.10475222036,
        "starttime": null,
        "processingstate": "READY"
      }],
      view: {
        "id": "1",
        "geometry": {
          "type": "MultiLineString",
          "coordinates": [[[-123, 56], [-123, 56.2], [-123.1, 56.5]]]
        },
        "centroid": {"type": "Point", "coordinates": [-123, 56.1]},
        "mode": "CYCLE",
        "meters": 7,
        "createdat": "2021-01-26T09:26:45.115Z",
        "starttime": null,
        "processingstate": "READY"
      }
    },
    permits: {
      list: [{"id": "1", "startdate": "2021-01-23T16:00:00.000Z", "enddate": null, "reference": "PP0001"}, {
        "id": "2",
        "startdate": "2020-03-19T16:00:00.000Z",
        "enddate": null,
        "reference": "PP0002"
      }, {"id": "3", "startdate": "2021-01-03T16:00:00.000Z", "enddate": null, "reference": "PP0003"}]
    },
    tenures: {
      list: [{
        "id": "1",
        "startdate": "2021-01-23T16:00:00.000Z",
        "subtenures": "0",
        "enddate": "2024-01-26T16:00:00.000Z",
        "reference": "TEN-0001"
      }, {
        "id": "2",
        "startdate": "2021-01-23T16:00:00.000Z",
        "subtenures": "0",
        "enddate": "2024-01-26T16:00:00.000Z",
        "reference": "TEN-0002"
      }, {
        "id": "3",
        "startdate": "2021-01-23T16:00:00.000Z",
        "subtenures": "0",
        "enddate": "2024-01-26T16:00:00.000Z",
        "reference": "TEN-0003"
      }]
    }
  },
  conservation_officer: {
    reports: {
      list: [{
        "id": "4",
        "state": "DRAFT",
        "parkpermit": null,
        "tenure": null,
        "period_start_date": "2017-12-31T16:00:00.000Z",
        "period_end_date": "2019-12-30T16:00:00.000Z",
        "updated_at": "2021-01-27T09:53:17.641Z"
      }]
    },
    travel_paths: {
      list: [{
        "id": "1",
        "createdat": "2021-01-26T09:26:45.115Z",
        "mode": "CYCLE",
        "meters": 198590.10475222036,
        "starttime": null,
        "processingstate": "READY"
      }]
    }
  }
}

const stubapis = {
  admin: {
    organizations: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.admin.organizations.list);
      },
      view: async (req, res): Promise<Response> => {
        return res.status(200).send(data.admin.organizations.view)
      }
    },
    reports: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.admin.reports.list)
      }
    }
  },
  area_admin: {
    reports: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.area_admin.reports.list)
      }
    },
    permits: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.area_admin.permits.list)
      }
    }
  },
  license_auth_officer: {
    reports: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.license_auth_officer.reports.list)
      }
    },
    permits: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.license_auth_officer.tenures.list)
      }
    }
  },
  commercial_operator: {
    reports: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.commercial_operator.reports.list)
      },
    },
    travel_paths: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.commercial_operator.travel_paths.list)
      },
      view: async (req, res): Promise<Response> => {
        return res.status(200).send(data.commercial_operator.travel_paths.view)
      },
    },
    permits: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.commercial_operator.permits.list)
      }
    },
    tenures: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.commercial_operator.tenures.list)
      }
    }
  },
  conservation_officer: {
    reports: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.conservation_officer.reports.list)
      },
    },
    travel_paths: {
      list: async (req, res): Promise<Response> => {
        return res.status(200).send(data.conservation_officer.travel_paths.list)
      },
    }
  }
}

export default stubapis;
