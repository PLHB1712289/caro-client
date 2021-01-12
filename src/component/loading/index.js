// import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { SemipolarLoading } from "react-loadingg";
import { connect } from "react-redux";

const Loading = (props) => {
  const classes = useStyles();

  const { isdisplay, children } = props;

  return (
    <>
      {isdisplay ? (
        <>
          <div className={classes.root}>
            <div className={classes.case}>
              <div>
                <SemipolarLoading />
              </div>
            </div>
            <div
              style={{
                color: "white",
                marginTop: 100,
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              loading
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {children}
    </>
  );
};

const mapStateToProps = (state) => ({ isdisplay: state.loading });

export default connect(mapStateToProps, () => ({}))(Loading);
// export default Loading;
