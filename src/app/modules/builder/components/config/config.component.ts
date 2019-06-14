import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-builder-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  @Input() imageName: string;
  @Input() logoUrl: string;
  @Input() tag: string;

  constructor() { }

  ngOnInit() {
    console.log(this.logoUrl);
  }
}
