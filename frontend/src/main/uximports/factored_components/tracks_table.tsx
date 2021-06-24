import React from "react";
import PropTypes from 'prop-types';
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Grid, Checkbox
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  filter: {
    width: '100%',
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    verticalAlign: "middle"
  },
  paper: {
    width: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  table: {
    minWidth: 750,
  }
}));

const TracksTable = (props) => {

  const classes = useStyles();

  const {headers, data, tableTitle, pagination, selectableRows} = props;

  const needsFiltering = headers.filter(h => (h.filterable)).length > 0;

  const renderFilters = () => {
    return (
      <div className={classes.filter}>
        <form noValidate autoComplete="off">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item><span>Filter by:</span></Grid>
            {
              headers
                .filter(h => (h.filterable))
                .map(h => (<Grid item><TextField variant={"outlined"} label={h.title} /></Grid>))
            }
            <Grid item><Button variant={'outlined'}>Apply</Button></Grid>
          </Grid>
        </form>

      </div>
    );
  };


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {tableTitle && <Typography variant={'h6'}>{tableTitle}</Typography>}
        {needsFiltering && renderFilters()}
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {selectableRows && (<TableCell padding="checkbox">
                  <Checkbox
                    checked={false}
                  />
                </TableCell>)}
                {headers.map((h, i) => (<TableCell key={`h-${i}`}>{h.title}</TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((r, i) => {
                const rowAdditionalProps = {};
                if (selectableRows) {
                  rowAdditionalProps['aria-checked'] = false;
                  rowAdditionalProps['selected'] = false;
                  rowAdditionalProps['tab-index'] = -1;
                  rowAdditionalProps['role'] = 'checkbox';
                }
                return (
                  <TableRow
                    {...rowAdditionalProps}
                    hover
                    key={`tr-${i}`}>
                    {selectableRows && (<TableCell padding="checkbox">
                      <Checkbox
                        checked={false}
                      />
                    </TableCell>)}
                    {headers.map((h, j) => (<TableCell key={`td-${i}-${j}`}>
                      {h.renderer && h.renderer(h.accessor(r))}
                      {h.renderer || h.accessor(r)}
                    </TableCell>))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination.isPaginated && <TablePagination
          align='right'
          rowsPerPageOptions={[5, 10]}
          rowsPerPage={5}
          onChangePage={() => {
          }}
          onChangeRowsPerPage={() => {
          }}
          count={data.length}
          page={0}
        />}
      </Paper>
    </div>);
};

TracksTable.defaultProps = {
  tableTitle: null,
  headers: [],
  data: [],
  selectableRows: false,
  pagination: {
    isPaginated: false,
    pageNumber: 0,
    totalPages: 0
  }
}

TracksTable.propTypes = {
  tableTitle: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  selectableRows: PropTypes.bool,
  pagination: PropTypes.shape({
    totalPages: PropTypes.number,
    pageNumber: PropTypes.number,
    isPaginated: PropTypes.bool
  }),
}

export {TracksTable};
