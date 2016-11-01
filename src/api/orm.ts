
/* IMPORT */

import * as thinky from 'thinky';
import Settings from '../modules/settings';

/* ORM */

let ORM = thinky ( Settings.rethinkdb ),
    type = ORM.type,
    Errors = ORM.Errors;

/* EXPORT */

export default ORM;
export {type, Errors};