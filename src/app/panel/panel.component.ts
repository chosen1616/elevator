import { Component, OnInit } from '@angular/core';
import { RequestType } from '../constants';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  innerRequestType: number = RequestType.INNER;

  constructor(private requestService: RequestService) { }

  ngOnInit() { }

  onClick(floor: number) {
    this.requestService.addInnerRequest(floor);
  }
}
