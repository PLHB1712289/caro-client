import AppBar from "@material-ui/core/AppBar";
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
import apiService from "./apiService";

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
      if (idGame) {
        const { success, data } = await apiService.getGame(idGame);
        await new Promise((res) => setTimeout(res, 200));

        if (success) {
          console.log("DATA:", data);
          const { player1, player2, game, history } = data;
          setDataGame({
            player1,
            player2,
            idGame: game._id,
            winner: game.winner,
            playerX: game.playerX,
            board:
              history.length === 0
                ? Array(size * size).fill(null)
                : history[history.length - 1].board,
            history,
          });
        }
      }
      turnOffLoading();
    })();

    return () => {
      setDataGame(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {dataGame !== null && <DetailGame dataGame={dataGame} />}
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
