import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    margin: 10,
  },
  title: {
    width: "100%",
    color: "white",
    fontSize: "1.5rem",
  },
  content: {
    height: "86vh",
    overflowY: "auto",
    // background: "rgba(0,0,0,0.05)",
    marginTop: 10,
  },
}));
