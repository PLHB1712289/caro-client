import { Paper, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChangePassword from "../changePassword";
import UpdateProfile from "../updateProfile";
import HistoryGame from "./historyGame";
import ProfilePlayer from "./profilePlayer";

const Profile = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // States
  const [tab, setTab] = useState(0);

  let containerProfile = <ProfilePlayer />;

  switch (tab) {
    case 0:
      containerProfile = <ProfilePlayer />;
      break;

    case 1:
      containerProfile = <HistoryGame />;
      break;

    case 2:
      containerProfile = <UpdateProfile />;
      break;

    case 3:
      containerProfile = <ChangePassword />;
      break;

    default:
      containerProfile = <ProfilePlayer />;
      break;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        Width: "100vw",
        alignItems: "center",
      }}
    >
      <div style={{ width: "70%" }}>
        <Paper square style={{ background: "rgba(0,0,0,0)" }}>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, newValue) => setTab(newValue)}
            aria-label="tab"
            centered
          >
            <Tab
              label="Profile Player"
              fullWidth
              style={{ color: "white", fontWeight: 600 }}
            />
            <Tab
              label="History game"
              fullWidth
              style={{ color: "white", fontWeight: 600 }}
            />
            <Tab
              label="Edit Infomation"
              fullWidth
              style={{ color: "white", fontWeight: 600 }}
            />
            <Tab
              label="Change Password"
              fullWidth
              style={{ color: "white", fontWeight: 600 }}
            />
          </Tabs>
        </Paper>

        {containerProfile}
      </div>
    </div>
  );
};

export default Profile;
