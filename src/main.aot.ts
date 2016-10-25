import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from '../aot/src/app/app.module.ngfactory';
import {decorateModuleRef} from './app/environment';

platformBrowser()
  .bootstrapModuleFactory(AppModuleNgFactory)
  .then(decorateModuleRef)
  .catch(err => console.error(err));
