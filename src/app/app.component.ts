import { Component, OnInit } from '@angular/core';
import { AppState } from './app.service';

@Component({
	selector: 'app',
	template: `
    <router-outlet></router-outlet>
  `,
})
export class AppRootComponent implements OnInit {
	constructor(public appState: AppState) {}

	public ngOnInit() {}
}
