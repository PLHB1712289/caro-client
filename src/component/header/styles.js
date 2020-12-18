const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#00c853",
    height: "8vh",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    width: 122,
    height: 30,
    boxSizing: "border-box",
    // paddingBottom: 6,
    // paddingTop: 6,
    // paddingLeft: 16,
    // paddingRight: 16,
    // borderRadius: 5,
    textDecoration: "none",
    color: "white",

    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.5)",
      color: "black",
    },
  },
  logo: {
    maxWidth: 40,
    maxHeight: 40,
  },
  iconButton: {
    color: "white",
    width: "50",
    height: "50",
    borderRadius: 5,
  },
}));
