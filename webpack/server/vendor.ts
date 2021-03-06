
/* ================================================================================
 * TRAM - Webpack - Server - Vendor
 * ================================================================================
 * Copyright (c) 2016-present Fabio Spampinato
 * Licensed under MIT (https://github.com/fabiospampinato/TRAM/blob/master/LICENSE)
 * ================================================================================ */

/* IMPORT */

import merge from 'conf-merge';
import * as path from 'path';
import * as webpack from 'webpack';
import baseConfig from '../base';

/* CONFIG */

const config = {
  entry: {
    'server.vendor': ['./src/server/vendor.ts']
  },
  output: {
    path: path.resolve ( 'dist' ),
    library: 'vendor',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DllPlugin ({
      path: path.resolve ( 'dist/meta/server.vendor.json' ),
      name: 'vendor',
      context: __dirname
    })
  ],
  target: 'node'
};

/* EXPORT */

export default merge ( {}, baseConfig, config );
