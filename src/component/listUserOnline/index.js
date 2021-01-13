import React from "react";
import useStyle from "./style";
import {useHistory} from "react-router-dom";
import { Button, Tooltip, Zoom } from "@material-ui/core";

const ListUserOnline = ({ children }) => {
  const classes = useStyle();
  const history=useHistory();
  const setOpenRank=()=>{
    history.push("/rank");
  }
  return (
    <div className={classes.container}>
      
      <div style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
      }}>
        <div className={classes.title}>ONLINE</div>
        <Tooltip title="Create a new room" TransitionComponent={Zoom} arrow>
        <Button
                  onClick={() => {
                    setOpenRank();
                  }}
                  className={classes.button}
                >
                  Rank
        </Button>
      </Tooltip>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default ListUserOnline;
