import { Component, OnInit } from '@angular/core';
import { TOTAL_FLOOR } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  floors = [];

  ngOnInit() {
    for (let i = TOTAL_FLOOR; i > 0; i--) {
      this.floors.push(i);
    }
  }
}
