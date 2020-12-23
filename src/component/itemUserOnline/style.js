import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
    display: "flex",
    backgroundColor: "#01060a",
    cursor: "pointer",
    fontWeight: 600,
    color: "white",
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
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  online: {
    width: 10,
    height: 10,
    backgroundColor: "green",
    marginLeft: 5,
    borderRadius: "50%",
  },
}));
