import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config();

/**
 * Creates and configures an Express application
 * @returns {express.Application} Configured Express application
 */
function createServer(): express.Application {
  const app = express();

  app.use(cors());
  app.use(express.json());

  return app;
}

const app = createServer();
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };
