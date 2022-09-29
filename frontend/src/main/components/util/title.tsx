import React from "react";
import {Grid, Typography} from "@mui/material";

const TitleBarButtonContainer = ({title, children}) => {

	return (
		<div>
			<Grid direction="row"
				justify="space-between"
				alignItems="center"
				container>
				<Grid item>
					<Typography variant={'h4'}>{title}</Typography>
				</Grid>
				<Grid item>
					{children}
				</Grid>
			</Grid>

		</div>
	);
};

export {TitleBarButtonContainer};
