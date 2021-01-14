import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  avatar: {
    minWidth: 140,
    minHeight: 140,
    borderRadius: "50%",
    marginRight: 20,
    // objectFit: "cover",
    display: "block",
  },
  username: { fontSize: "1.2rem", fontWeight: 700, marginBottom: 10 },
  infoBasic: { display: "flex" },
  titleInfoBasic: {
    width: "30%",
    border: "1px solid rgba(255,255,255,0.5)",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  valueInfoBasic: {
    width: "70%",
    border: "1px solid rgba(255,255,255,0.5)",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerInfomation: {
    color: "white",
    fontWeight: 600,
    fontSize: "1.1rem",
    display: "flex",
    marginTop: 20,
  },
  containerIndexGameAndRateWin: {
    display: "flex",
  },
  indexTitle: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    marginLeft: 10,
  },
  indexContentValue: {
    fontSize: "1.5rem",
    marginLeft: 10,
    fontWeight: 800,
  },

  containerDetailIndex: {
    display: "flex",
    marginTop: 20,
  },
  subsContainerDetailInfo: {
    width: "50%",
    margin: 10,
  },
  itemDetail: {
    display: "flex",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",
  },

  itemDetailTitle: {
    fontWeight: 900,
    width: "50%",
    marginRight: 10,
    background: "rgba(255,255,255,0.05)",

    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  itemDetailValue: {
    fontWeight: 800,
    width: "50%",
    background: "rgba(255,255,255,0.05)",
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 3,
  },

  containerChart: {
    height: 553,
    width: "50%",
    background: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginLeft: 20,
  },
}));
