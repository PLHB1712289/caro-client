import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    display: "flex",
    background: "rgba(0,0,0,0.1)",
    cursor: "pointer",
    "&hover": {
      background: "green",
    },
  },
  item: {
    width: "70%",
  },
  username: { wordWrap: "break-word" },
  id: { fontSize: "0.7rem" },
  status: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
