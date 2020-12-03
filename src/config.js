const PRODUCTION_ENVIRONEMT = {
  title: "Production",
};

const DEVERLOPMENT_ENVIRONEMT = {
  title: "Environment",
};

const ENVIRONMENT =
  process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
    ? { ...PRODUCTION_ENVIRONEMT }
    : { ...DEVERLOPMENT_ENVIRONEMT };

console.log(ENVIRONMENT);

export default ENVIRONMENT;
