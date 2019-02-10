// Angular dependencies
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TabsInterface } from './tabs.interface';

@Component({
  selector: 'tabs-component',
  styleUrls: ['./tabs.component.scss'],
  templateUrl: './tabs.component.html',
})
export class TabsComponent implements OnInit {
  @Input()
  private configParams: Array<TabsInterface>;
  @Output() active: EventEmitter<Object> = new EventEmitter();

  constructor() { }
  public ngOnInit() {
    console.log(this.configParams);
  }

  setTabs(item) {
    this.configParams.map((o, i) => {
      if (o.name === item.name) {
        this.configParams[i].active = true;
        this.active.emit(this.configParams[i]);
      } else {
        this.configParams[i].active = false;
      }
    });
  }
}
