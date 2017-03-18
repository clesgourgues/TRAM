
/* ================================================================================
 * TRAM - UI - Components - HTML
 * ================================================================================
 * Copyright (c) 2016-present Fabio Spampinato
 * Licensed under MIT (https://github.com/fabiospampinato/TRAM/blob/master/LICENSE)
 * ================================================================================ */

/* IMPORT */

import * as React from 'react';
import * as Helmet from 'react-helmet';
import Settings from 'modules/settings';
import 'ui/template';

/* HTML */

class HTML extends React.Component<any, undefined> {

  private resolveFile ( file, hot = true ) {

    const baseurl  = hot && Settings.hotServer.enabled ? Settings.hotServer.url : Settings.server.url,
          manifest = this.props.manifests.find ( manifest => file in manifest ),
          filepath = manifest ? manifest[file] : '';

    return `${baseurl}${filepath}`;

  }

  render () {

    const {content, state} = this.props,
          head = Helmet.rewind (),
          stylesheet = null,
          stylesheets = DEVELOPMENT ? [] : [this.resolveFile ( 'client.css' )],
          scripts = [this.resolveFile ( 'client.vendor.js', false ), this.resolveFile ( 'client.js' )];

    if ( DEVELOPMENT ) {

      const styles = require ( 'ui/styles' ).default;

      if ( CLIENT ) {

        styles.forEach ( style => style._insertCss () );

      } else {

        const css = styles.map ( style => style._getCss () ).join ( '' );

        stylesheet = <style>{css}</style>;

      }

    }

    return (
      <html {...head.htmlAttributes.toComponent ()}>
        <head>
          {head.base.toComponent ()}
          {head.title.toComponent ()}
          {head.meta.toComponent ()}
          {head.link.toComponent ()}
          {head.script.toComponent ()}
          {head.noscript.toComponent ()}
          {stylesheet}
          {stylesheets.map ( ( src, i ) => <link rel="stylesheet" type="text/css" href={src} key={i} /> )}
        </head>
        <body>
          <main id="app-root" dangerouslySetInnerHTML={{ __html: content }}></main>
          <script dangerouslySetInnerHTML={{ __html: `window.__REDUX_STATE__ = ${JSON.stringify ( state )}`}} />
          {scripts.map ( ( src, i ) => <script src={src} key={i}></script> )}
        </body>
      </html>
    );

  }

}

/* EXPORT */

export {HTML};
