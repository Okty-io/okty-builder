import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../core/services/title.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: TitleService) {
  }

  ngOnInit() {
    this.titleService.set('Home');
  }
}
