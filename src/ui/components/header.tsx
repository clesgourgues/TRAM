
/* =========================================================================
 * REPONAME - UI - Components - Header
 * =========================================================================
 * Copyright (c) 2016-2017 Fabio Spampinato
 * Licensed under MIT (REPOLICENSE)
 * ========================================================================= */

/* IMPORT */

import * as React from 'react';
import {Link} from 'react-router';

/* HEADER */

class Header extends React.Component<any, any> {
  render () {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="counter">Counter</Link></li>
          <li><Link to="todo">Todo</Link></li>
        </ul>
      </nav>
    );
  }
}

/* EXPORT */

export {Header};
