import React from "react";
import {TitleBarButtonContainer} from "../factored_components/title";
import {TracksTable} from "../factored_components/tracks_table";
import moment from "moment/moment";
import {Button} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const headers = [
  {title: 'Name', filterable: true, accessor: (r) => r.name},
  {title: 'Responsible Business Unit', filterable: true, accessor: (r) => r.responsibleBusinessUnit},
  {title: 'Region', filterable: true, accessor: (r) => r.region},
  {title: 'Last Activity', filterable: false, accessor: (r) => r.lastActivity, renderer: v => (v.format('DD/MM/YY'))},
]

const data = [
  {
    name: 'Op1',
    responsibleBusinessUnit: 'Victoria',
    region: 'Victoria',
    lastActivity: moment()
  }
]

const CROperatorList = (props) => {

  return (
    <>

      <TitleBarButtonContainer title={'Commercial/Recreational Operators'}>
        <Button color={'primary'} variant={'contained'}>
          <AddIcon/>
          Add Operator
        </Button>
      </TitleBarButtonContainer>

      <TracksTable
        headers={headers}
        data={data}
        pagination={{
          totalPages: 1,
          pageNumber: 1,
          isPaginated: true
        }
        }
      />
    </>
  );
};

export
{
  CROperatorList
};
