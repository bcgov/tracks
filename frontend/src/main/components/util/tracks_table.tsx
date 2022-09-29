import React from "react";
import {
	Button,
	Checkbox,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography
} from "@mui/material";

const TracksTable = ({headers, data, tableTitle, pagination, selectableRows, rowClickHandler}) => {

	const needsFiltering = headers.filter(h => (h.filterable)).length > 0;

	const renderFilters = () => {
		return (
			<div>
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
								.map(h => (<Grid item><TextField variant={"outlined"} label={h.title}/></Grid>))
						}
						<Grid item><Button variant={'outlined'}>Apply</Button></Grid>
					</Grid>
				</form>

			</div>
		);
	};


	return (
		<div>
			<Paper>
				{tableTitle && <Typography variant={'h6'}>{tableTitle}</Typography>}
				{needsFiltering && renderFilters()}
				<TableContainer>
					<Table>
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
										onClick={() => {
											rowClickHandler(r)
										}}
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
//
// TracksTable.defaultProps = {
// 	tableTitle: null,
// 	headers: [],
// 	data: [],
// 	selectableRows: false,
// 	rowClickHandler: () => {
// 	},
// 	pagination: {
// 		isPaginated: false,
// 		pageNumber: 0,
// 		totalPages: 0
// 	}
// }

export {TracksTable};
