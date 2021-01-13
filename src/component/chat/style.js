import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    border: "2px solid rgba(0,0,0,0.8)",
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  title: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1rem",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    height: 25,
  },
  container: {
    width: "100%",
    height: "132px",
    overflowY: "auto",
    padding: "20px 10px",
  },
  formSendMess: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
  },

  input: {
    width: "87%",
    height: 30,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 5,
  },

  buttonSend: {
    width: "12%",
    height: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 5,
  },
}));
