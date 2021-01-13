import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    padding: 10,
    marginTop: 10,
    color: "white",
    cursor: "pointer",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  hover: {
    "&hover": {},
  },
  column: {
    textAlign: "center",
  },
  waiting: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    borderRadius: "50%",
    marginLeft: 5,
  },
  playing: {
    width: 10,
    height: 10,
    backgroundColor: "orange",
    borderRadius: "50%",
    marginLeft: 5,
  },
  status: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
