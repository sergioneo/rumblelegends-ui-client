///<reference path="../node_modules/@types/node/index.d.ts" />

import './polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app';

platformBrowserDynamic().bootstrapModule(AppModule);
