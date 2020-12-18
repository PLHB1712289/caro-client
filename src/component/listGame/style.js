import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    margin: 10,
  },
  title: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  filter: {
    display: "flex",
    padding: 10,
    background: "rgba(0,0,0,0.5)",
    marginTop: 10,
    width: "100%",
  },
  no: {
    width: "5%",
    textAlign: "center",
  },
  filterID: {
    width: "30%",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: "79vh",
    overflowY: "scroll",
    width: "100%",
    background: "rgba(0,0,0,0.05)",
  },
  column: { width: "20%", textAlign: "center" },
}));
