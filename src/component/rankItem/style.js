import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {},
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(0.1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(0.5),
    marginBottom:'15px'
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  socialLoginFB: {
    margin: theme.spacing(1, 0, 1),
    width: "100%",
    borderRadius: 4,
    backgroundColor: "rgba(24,119,242,0.8)",
    height: 40,
    color: "white",

    "&:hover": {
      backgroundColor: "rgba(24,119,242,0.6)",
    },
  },
  titleSocialLogin: {
    fontSize: "0.875rem",
    textTransform: "uppercase",
    color: "white",
    margin: "0 10px",
    fontWeight: 500,
  },
  flexStartColumnItem:{
    display:'flex',
    flex:1,

    flexDirection:'column',
    justifyContent:'center',
  },
  centerColumnItem:{
    display:'flex',
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  centerRowItem:{
    display:'flex',
    flex:1,
    flexDirection:'row',

    justifyContent:'center',
    alignItems:'center',
  }
}));
