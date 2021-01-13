import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import useStyle from "./style";
import PersonIcon from "@material-ui/icons/Person";
import UserDetail from "../userDetail";
const ItemUserOnline = ({ data }) => {
  const classes = useStyle();
  const { id, username } = data;
  const history = useHistory();

  const [openDiaLog,setOpenDialog]=useState(false);

  const _handleClickCloseDialog = () => {
    setOpenDialog(false);
  };
  const _handleOnClick = () => {
    setOpenDialog(true);
    //history.push(`/player/${id}`);
  };

  return (
    <div className={classes.container} onClick={_handleOnClick}>
      {openDiaLog===true?
        <UserDetail open={openDiaLog} onClose={_handleClickCloseDialog} userId={id}/>:
        <div></div>
      }
      <div style={{ width: "15%", display: "flex", alignItems: "center" }}>
        <PersonIcon />
      </div>
      <div className={classes.item}>
        <div className={classes.username}>{username}</div>
        <div className={classes.id}>ID: {id}</div>
      </div>

      <div className={classes.status}>
        <div>Online</div>
        <div className={classes.online}></div>
      </div>
    </div>
  );
};

export default ItemUserOnline;
