import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    margin: 10,
  },
  title: {
    width: "100%",
  },
  content: {
    height: "86vh",
    overflowY: "scroll",
    background: "rgba(0,0,0,0.05)",
    marginTop: 10,
  },
}));
