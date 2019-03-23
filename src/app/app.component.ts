import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  totalFloor = 5;
  currFloor = 3;
  floors = [];

  ngOnInit() {
    for (let i = this.totalFloor; i > 0; i--) {
      this.floors.push(i);
    }
  }
}
