import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    margin: 10,
  },
  title: {
    width: "100%",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  content: {
    height: "83.4vh",
    overflowY: "auto",
    marginTop: 10,
    background: "rgba(0,0,0,0.1)",
  },
  button: {
    color: "white",
    marginLeft: 20,
    border: "1px solid white",
    height: 30,
    fontWeight: 550,
  },
}));
