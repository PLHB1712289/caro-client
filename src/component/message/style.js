import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  sender: {
    textAlign: "end",
    display: "flex",
    justifyContent: "flex-end",
    margin: "5px 0",
  },

  receiver: {
    display: "flex",
    margin: "5px 0",
  },

  content: {
    background: "rgba(2,151,36,1)",
    margin: "5px 0",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 7,
    wordWrap: "break-word",
    fontSize: "0.9rem",
    fontWeight: 600,
    width: "fit-content",
  },
}));
