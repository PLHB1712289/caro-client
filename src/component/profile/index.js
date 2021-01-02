import {
    Avatar,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography,
    Grid,
    Link
  } from "@material-ui/core";
  import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
  import React, { useEffect, useState } from "react";
  import { connect } from "react-redux";
  import Chart from 'react-apexcharts'

  import { useHistory } from "react-router-dom";
  import action from "../../storage/action";
  import useStyles from "./style";
  import apiService from "./apiService";
 
  const Profile = () => {
    // Styles
    const classes = useStyles();
    const history = useHistory();
  
    // States
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [user,setUser]=useState(null);
    const [draw,setDraw]=useState(0);
    const [win,setWin]=useState(0);
    const [lose,setLose]=useState(0);
    const [totalGame,setTotalGame]=useState(0);
  
  
    const [series,setSeries]=useState([]);
    const [options,setOptions]=useState({
      
      labels:['Win','Lose','Draw'],
      colors: ['#00FF00', '#FF0000', '#3F51B5'],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                color:'black'
              },
              value: {
                color:'black'
              },
            }
          }
        }
      }
      
    });
    useEffect(() => {
    //   if (localStorage.getItem("token")) {
    //     history.push("/");
    //   }
        
        // if(user===null)
        // {
        //   const getUser=async()=>{
        //     const {success,message,data}=await apiService.getUser();
        //     if(success===true)
        //     {
        //       setUser(data); 
        //       console.log("This is user after get in profile ", data);
        //       setWin(data.totalGameWin);
        //       setLose(data.totalGameLose);
        //       setTotalGame(data.totalGame);
        //       setDraw(data.totalGame-data.totalGameLose-data.totalGameWin);

              
        //     }
        //   }
        //   getUser();
            
        // }
        if(user===null)
        {
          const getUser=async()=>{
            const {success,message,data}=await apiService.getUser();
            if(success===true && data!==user)
            {
              setUser(data); 
              setWin(data.totalGameWin);
              setLose(data.totalGameLose);
              setTotalGame(data.totalGame);
              setDraw(data.totalGame-data.totalGameLose-data.totalGameWin);
  
              
            }
          }
          getUser();
        }
        
        if(user!==null)
        {
            
              //set for chart
              let temp=[];
              

              temp.push(user.totalGameWin);

              temp.push(user.totalGameLose);
              temp.push(user.totalGame-user.totalGameWin-user.totalGameLose);

              setSeries(temp);
              console.log("Check series:",series);
        }
        
    }, [user,series]);
  
   

    return (
      <div
        style={{
          justifyContent:'center',
          alignItems:'center',
          display:'flex',
          flexDirection:'column',
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          style={{
            border: "1px solid white",
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.9)",
            
          }}
        >
          <CssBaseline />
          <div className={classes.paper}>
            
            <h1>Profile</h1>

            <form
              className={classes.form}
              noValidate
            >
              {user !==null ?
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  <Typography
                    variant="h6"
                    >
                    Username:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                <Typography
                    variant="h6"
                    >
                    {user.username}
                  </Typography>
                
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    variant="h6"
                    >
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                <Typography
                    variant="h6"
                    >
                    {user.email}
                  </Typography>
               
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    variant="h6"
                    >
                    Total game:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                <Typography
                    variant="h6"
                    >
                    {totalGame}
                  </Typography>
               
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    variant="h6"
                    >
                    Win:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                <Typography
                    variant="h6"
                    >
                    {win}
                  </Typography>
               
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    variant="h6"
                    >
                    Lose:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                <Typography
                    variant="h6"
                    >
                    {lose}
                  </Typography>
               
                </Grid>
                <Grid item xs={5}>
                  <Typography
                    variant="h6"
                    >
                    Draw:
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                <Typography
                    variant="h6"
                    >
                    {draw}
                  </Typography>
                
                </Grid>
                {series.length>0?
                <div>
                  
                  <Grid item xs={12}>
                      <Chart options={options} series={series} type="donut" width="330px" />

                  </Grid>
                </div>
                
                :
                <div></div>
              }         
              </Grid>
              :<div></div>
              }
                    
                  
               
      
              
            </form>
          </div>
        </Container>
        
        
      </div>
    );
};
  
  
  
export default Profile;
  