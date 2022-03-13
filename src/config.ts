const dev = {
  apiGatewayUrl: "http://localhost:3333/v1",
};

const prod = {
  apiGatewayUrl: "https://api.clipps.io/v1",
};

const stage = {
  apiGatewayUrl: "https://api-stage.clipps.io/v1",
};

let config = dev;

config = process.env.REACT_APP_ENV === "production" ? prod : config;
config = process.env.REACT_APP_ENV === "stage" ? stage : config;

export default {
  ...config,
};
