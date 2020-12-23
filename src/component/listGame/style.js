import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    margin: 10,
    fontWeight: 700,
  },
  title: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 700,
  },
  filter: {
    display: "flex",
    padding: 10,
    background: "#01060a",
    marginTop: 10,
    width: "100%",
    color: "white",
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
    height: "78vh",
    overflowY: "auto",
    width: "100%",
    background: "rgba(0,0,0,0.1)",
  },
  column: { width: "20%", textAlign: "center" },
  button: {
    color: "white",
    marginLeft: 20,
    border: "1px solid white",
    height: 30,
    fontWeight: 550,
  },
}));
