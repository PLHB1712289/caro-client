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
}));
