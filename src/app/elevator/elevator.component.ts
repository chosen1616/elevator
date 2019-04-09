import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FLOOR_HEIGHT } from '../constants';
import { EngineService } from '../engine.service';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent implements OnInit, OnDestroy {

  floorHeight = FLOOR_HEIGHT;
  doorOpenPercentage = 1;
  requestLoadsubscription: Subscription;

  constructor(private engineService: EngineService) { }

  ngOnInit() {
    this.requestLoadsubscription = this.engineService.getRequestLoad().subscribe(floor => {
      this.openAndCloseDoor();
    });
    // this.engineService.start();
  }

  ngOnDestroy() {
    this.requestLoadsubscription.unsubscribe();
  }

  openDoor() {
    this.doorOpenPercentage = 90;
  }

  closeDoor() {
    this.doorOpenPercentage = 1;
  }

  openAndCloseDoor() {
    this.openDoor();
    setTimeout(() => {
      this.closeDoor();
    }, 500);
  }

}
