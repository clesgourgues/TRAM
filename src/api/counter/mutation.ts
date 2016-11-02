
/* IMPORT */

import Counter from './model';

/* SCHEMA */

const schema = `
  incrementCounter ( id: Int ): Counter
  decrementCounter ( id: Int ): Counter
`;

/* RESOLVERS */

const resolvers = {
  incrementCounter ( root, {id} ) {
    return Counter.get ( id ).run ().then ( function ( counter ) {
      return new Counter ( counter ).increment ().replace ();
    });
  },
  decrementCounter ( root, {id} ) {
    return Counter.get ( id ).run ().then ( function ( counter ) {
      return new Counter ( counter ).decrement ().replace ();
    });
  }
};

/* EXPORT */

export {schema, resolvers};