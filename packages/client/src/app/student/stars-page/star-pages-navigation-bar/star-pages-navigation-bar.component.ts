import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Dance, Figure, Star } from '@core/models';

@Component({
  selector: 'dsapp-star-pages-navigation-bar',
  templateUrl: './star-pages-navigation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarPagesNavigationBarComponent implements OnInit {

  @Input() star: Star;
  @Input() dance: Dance;
  @Input() figure: Figure;

  constructor() { }

  ngOnInit() {
  }

}
