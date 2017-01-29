/**
 *
 * @public
 * @namespace App
 * @description constructs and initializes all core modules
 *
 */

import * as core from './imports/modules/index.js';

/* compile all less files from ./stylesheets */
const css = require("./main.less");

class App_Build {
    constructor() {
    	core.animation.init();
    }
};

const App = new App_Build();



