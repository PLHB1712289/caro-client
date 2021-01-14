import { Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Cup from "../../assert/img/cup.png";
import UserDetail from "../userDetail";
import useStyles from "./style";

const RankItem = ({ data, key, rank }) => {
  // Styles
  const classes = useStyles();

  // States
  const [openDialog, setOpenDialog] = useState(false);
  const [from] = useState("from " + data.createdDate);

  const onClickUser = () => {
    setOpenDialog(true);
  };
  const _handleClickCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div
      style={{
        width: "600px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderBottom: "1px solid #F0FFFF",
        marginBottom: "20px",
      }}
      onClick={onClickUser}
    >
      {openDialog === true ? (
        <UserDetail
          open={openDialog}
          onClose={_handleClickCloseDialog}
          userId={data.id}
        />
      ) : (
        <div></div>
      )}

      <form className={classes.form} noValidate>
        <Grid container spacing={1}>
          <Grid
            item
            xs={1}
            className={classes.centerColumnItem}
            style={{ marginLeft: "10px" }}
          >
            <Typography
              variant="h6"
              style={{
                wordWrap: "break-word",
                fontWeight: "bold",
                color: "#FAEBD7",
              }}
            >
              {rank}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.centerColumnItem}>
            <img
              src={data.avatarUrl}
              style={{ width: 50, height: 50, borderRadius: 25 }}
              alt=""
            ></img>
          </Grid>

          <Grid item xs={6} style={{ marginLeft: "10px" }}>
            <div className={classes.flexStartColumnItem}>
              <Typography
                variant="subtitle1"
                style={{
                  wordWrap: "break-word",
                  fontWeight: "bold",
                  color: "#FAEBD7",
                }}
              >
                {data.fullname}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{
                  wordWrap: "break-word",
                  fontWeight: "bold",
                  color: "#FAEBD7",
                }}
              >
                {from}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2} className={classes.centerRowItem}>
            <Typography
              variant="subtitle1"
              style={{ fontWeight: "bold", color: "#FAEBD7" }}
            >
              {data.cup}
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            className={classes.centerRowItem}
            style={{ marginRight: "10px" }}
          >
            <img
              src={Cup}
              style={{ width: 30, height: 30, borderRadius: 15 }}
              alt=""
            ></img>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RankItem;
