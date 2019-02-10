// Angular dependencies
import { Component, OnInit } from '@angular/core';
import { TabsInterface } from '../../../cross';
import { CardsProvider } from '../../providers';
import CONSTANTS from '@legends/constants';

@Component({
  selector: 'my-items-component',
  styleUrls: ['./my-items.component.scss'],
  templateUrl: './my-items.component.html',
})
export class MyItemsComponent implements OnInit {
  private cardsService: Array<any> = [];
  private eggs: Array<any> = [];
  configParams: Array<TabsInterface> = [
    {
      name: 'Characters',
      active: true,
    },
    {
      name: 'Eggs',
      active: false,
    },
    /*{
      name: 'Broxes',
      active: false,
    },*/
  ];
  private tab: string = 'Characters';

  constructor(private cardsProvider: CardsProvider) { }
  public ngOnInit() {
    this.cardsProvider.getMyItems('a82e08f41e958514c74959c5876dfea5f539b6ca').subscribe(data => {
      this.cardsService = data.beasts;
      const eggs = JSON.parse(data.eggs)
      CONSTANTS.EGGS.map(i => {
        if (eggs[i.name]) {
          this.eggs.push({
            path: i.path,
            id: i.name,
            total: eggs[i.name]
          });
        }
      });

    }, err => console.log(err))
  }

  activeTab(tab) {
    this.tab = tab.name;
  }
}
