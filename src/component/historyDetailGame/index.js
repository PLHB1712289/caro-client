import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import action from "../../storage/action";
import DetailGame from "./detailGame";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "#00c853",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const size = 20;
const HistoryDetailGame = ({
  open,
  setOpen,
  turnOnLoading,
  turnOffLoading,
  idGame,
}) => {
  const classes = useStyles();

  const [dataGame, setDataGame] = useState(null);

  useEffect(() => {
    turnOnLoading();
    (async () => {
      await new Promise((res) => setTimeout(res, 300));
      open &&
        setDataGame({
          player1: { username: "...", id: "..." },
          player2: { username: "...", id: "..." },
          idGame: "123",
          winner: "123",
          playerX: "123",
          board: Array(size * size).fill(null),
          history: [{ index: 0, board: Array(size * size).fill(null) }],
        });
      turnOffLoading();
    })();

    return () => {
      setDataGame(null);
    };
  }, [idGame]);

  const handleClose = () => {
    setOpen(false);
    setDataGame(null);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              History Game
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Game container */}
        <div
          style={{
            height: "100vh",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(2,13,24,0.9)",
          }}
        ></div>

        {dataGame !== null && <DetailGame data={dataGame} />}
      </Dialog>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  turnOnLoading: () => {
    console.log("Turn on Loading");
    dispatch(action.LOADING.turnOn());
  },

  turnOffLoading: () => {
    console.log("Turn off Loading");
    dispatch(action.LOADING.turnOff());
  },
});

export default connect(() => ({}), mapDispatchToProps)(HistoryDetailGame);
