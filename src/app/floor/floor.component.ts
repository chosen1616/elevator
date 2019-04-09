import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit {

  @Input() floorNum: number;

  constructor(private requestService: RequestService) { }

  ngOnInit() { }

  addUpRequest() {
    this.requestService.addUpRequest(this.floorNum);
  }

  addDownRequest() {
    this.requestService.addDownRequest(this.floorNum);
  }
}
