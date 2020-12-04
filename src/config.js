const PRODUCTION_ENVIRONEMT = {
  title: "Production",
  URL_SERVER: process.env.REACT_APP_URL_SERVER,
  FB_APP_ID: process.env.REACT_APP_FB_APP_ID,
  GG_APP_ID: process.env.REACT_APP_GG_APP_ID,
};

const DEVELOPMENT_ENVIRONEMT = {
  title: "Development",
  URL_SERVER: "http://localhost:3000",
  FB_APP_ID: "420604992406615",
  GG_APP_ID:
    "416888207455-fma1rt8jeo76bsdcdo3ebgic6hl464ae.apps.googleusercontent.com",
};

const ENVIRONMENT =
  process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
    ? { ...PRODUCTION_ENVIRONEMT }
    : { ...DEVELOPMENT_ENVIRONEMT };

console.log(
  `Run on ${
    process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
      ? "PRODUCTION ENVIRONMENT"
      : "DEVELOPMENT ENVIRONMENT"
  }`
);

export default ENVIRONMENT;
