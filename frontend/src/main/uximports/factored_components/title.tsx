import React from "react";
import {Card, Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
  }
}));

const TitleBarButtonContainer = (props) => {

  const classes = useStyles();
  const {title, children} = props;

  return (
    <div className={classes.root}>
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
