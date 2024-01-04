import express from "express";
import serverConfig from "./config";

import routes from "./routes";
import { logger } from "./middlewares/logger";
import { notFoundError,genericErrorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());//Get req body

app.use(logger);

app.use(routes);

app.use(genericErrorHandler);

app.use(notFoundError);

app.listen(serverConfig.serverPort, () => {
  console.log(`Server is listening on port: ${serverConfig.serverPort}`);
});
