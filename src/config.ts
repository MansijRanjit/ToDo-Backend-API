import dotenv from "dotenv";

dotenv.config();

const config ={
  serverPort:process.env.SERVER_PORT || 3060,

  jwt:{
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
};

export default config;