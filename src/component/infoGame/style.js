import { makeStyles } from "@material-ui/core";
export default makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "#01060a",
    padding: 10,
    borderRadius: 5,
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  status: {
    textAlign: "center",
    fontWeight: 700,
  },
  playerContainer: {
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 5,
  },
  playerContent: {
    margin: "5px 0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  playerTitle: {
    padding: 10,
    width: "100%",
    textAlign: "center",
  },
  in4Player: {
    width: "50%",
    width: "100%",
    height: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  timmer: { padding: 10, width: "100%", textAlign: "center" },
  historyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "10px 0",
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  historyTitle: {
    fontWeight: 600,
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    width: "100%",
    textAlign: "center",
  },
  historyContent: {
    width: "100%",
    height: "20vh",
    overflowX: "auto",
    padding: 5,
  },

  containerButton: {
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    background: "rgba(255,255,255,0.7)",
    fontWeight: 700,
    margin: 3,
    width: "20%",
  },
}));
