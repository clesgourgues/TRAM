
/* ================================================================================
 * TRAM - API - Todo - Queries
 * ================================================================================
 * Copyright (c) 2016-present Fabio Spampinato
 * Licensed under MIT (https://github.com/fabiospampinato/TRAM/blob/master/LICENSE)
 * ================================================================================ */

/* IMPORT */

import gql from 'graphql-tag';
import {Todo} from './fragments';

/* QUERIES */

const get = {
  gql: gql`
    query todoGet {
      todo: todoGet {
        ...Todo
      }
    },
    ${Todo}
  `
};

/* EXPORT */

export {get};
