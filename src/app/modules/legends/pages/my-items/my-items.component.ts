// Angular dependencies
import { Component, OnInit } from '@angular/core';
import { TabsInterface } from '../../../cross';
import { CardsProvider } from '../../providers';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'my-items-component',
  styleUrls: ['./my-items.component.scss'],
  templateUrl: './my-items.component.html',
})
export class MyItemsComponent implements OnInit {
  private cardsService: Array<any> = [];
  configParams: Array<TabsInterface> = [
    {
      name: 'Characters',
      active: true,
    },
    {
      name: 'Eggs',
      active: false,
    },
    {
      name: 'Broxes',
      active: false,
    },
  ];
  constructor(private cardsProvider: CardsProvider) { }
  public ngOnInit() {
    this.cardsProvider.getMyItems('a82e08f41e958514c74959c5876dfea5f539b6ca').subscribe(data => {
      this.cardsService = data.beasts;
    }, err => console.log(err))
  }
}
