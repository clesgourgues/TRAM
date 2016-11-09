
/* =================================================================================
 * ARRRT - Server
 * =================================================================================
 * Copyright (c) 2016-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/fabiospampinato/ARRRT/blob/master/LICENSE)
 * ================================================================================= */

/* IMPORT */

import * as bodyParser from 'body-parser';
import * as Chalk from 'chalk';
import * as compression from 'compression';
import * as express from 'express';
import {graphqlConnect, graphiqlExpress} from 'graphql-server-express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as React from 'react';
import {ApolloProvider} from 'react-apollo';
import {renderToString} from 'react-dom/server';
import {AppContainer} from 'react-hot-loader';
import {RouterContext, createMemoryHistory, match} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Client, Schema} from 'api';
import {configureStore} from '../redux/store';
import Environment from 'modules/environment';
import Settings from 'modules/settings';
import routes from 'ui/routes';
import {Html} from 'ui/components';
const manifest = require ( '../../dist/meta/manifest.json' );

/* APP */

const app = express ();

app.use ( compression () );

app.use ( favicon ( path.join ( __dirname, 'assets/favicon.ico' ) ) );

app.use ( express.static ( path.join ( __dirname, 'assets' ) ) );

app.use ( '/public', express.static ( path.join ( __dirname, 'public' ) ) );

app.use ( Settings.graphql.endpoint, bodyParser.json (), graphqlConnect ({
  schema: Schema
}));

if ( Environment.isDevelopment ) {

  app.use ( Settings.graphql.interface, graphiqlExpress ({
    endpointURL: Settings.graphql.endpoint,
  }));

}

app.get ( '*', ( req, res ) => {

  const location = req.url,
        memoryHistory = createMemoryHistory ( req.originalUrl ),
        store = configureStore ( memoryHistory ),
        history = syncHistoryWithStore ( memoryHistory, store );

  match ( { history, routes, location }, ( err, redirectLocation, renderProps ) => {

    if ( err ) {

      res.status ( 500 ).send ( err.message );

    } else if ( redirectLocation ) {

      res.redirect ( 302, redirectLocation.pathname + redirectLocation.search );

    } else if ( renderProps ) {

      const page = (
        <Html manifest={manifest}>
          <AppContainer>
            <ApolloProvider store={store} client={Client} key="provider">
              <RouterContext {...renderProps} />
            </ApolloProvider>
          </AppContainer>
        </Html>
      );

      res.status ( 200 ).send ( `<!doctype html>${renderToString ( page )}` );

    } else {

      res.status ( 404 ).send ( 'Not Found?' );

    }

  });

});

/* LISTEN */

app.listen ( Settings.server.port, Settings.server.host, err => {
  if ( err ) return console.error ( Chalk.bgRed ( err ) );
  if ( Environment.isDevelopment ) {
    let {protocol, host, port} = Settings.server;
    console.info ( Chalk.black.bgGreen ( `[GRAPHIQL] Available at ${protocol}://${host}:${port}${Settings.graphql.interface}` ) );
  }
  console.info ( Chalk.black.bgGreen ( `[RETHINKDB] Dashboard available at ${Settings.rethinkdb.http.url}` ) );
  console.info ( Chalk.black.bgGreen ( `[APP] Listening at ${Settings.server.url}` ) );
});
