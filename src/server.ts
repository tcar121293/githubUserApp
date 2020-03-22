import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import schema from './schema';
const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: {
    settings: {
      'editor.theme': 'light',
    }
  }
});

server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
  { port: 3000 },
  (): void => console.log(`\nGraphQL is now running on http://localhost:3000/graphql`));