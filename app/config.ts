const dev = {
  apiGatewayUrl: "http://127.0.0.1:3333/v1",
};

const prod = {
  apiGatewayUrl: "https://api.clipps.io/v1",
};

const stage = {
  apiGatewayUrl: "https://api-stage.clipps.io/v1",
};

let config = dev;

config = process.env.NODE_ENV === "production" ? prod : config;
config = process.env.NODE_ENV === "test" ? stage : config;

export default {
  ...config,
};
