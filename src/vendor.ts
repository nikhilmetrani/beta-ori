// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...

import 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
require('!style!raw!../node_modules/bootstrap/dist/css/bootstrap.css');
if ('production' === ENV) {
} else {
}
