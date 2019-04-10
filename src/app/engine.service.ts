import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ElevatorStatus } from './constants';
import { RequestService } from './request.service';
import { shiftInitState } from '@angular/core/src/view';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EngineService implements OnDestroy {

  currFloor: number;
  status: number;
  timer: any;

  private requestLoadsubject = new Subject<number>();

  constructor(private requestService: RequestService) {
    this.currFloor = 1;
    this.status = ElevatorStatus.IDLE;
  }

  ngOnDestroy() {
    this.timer.clearInterval();
  }

  start() {
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  getRequestLoad(): Observable<number> {
    return this.requestLoadsubject.asObservable();
  }

  private tick(): void {
    if (this.requestService.empty()) {
      this.status = ElevatorStatus.IDLE;
      return;
    }

    if (this.requestService.hasRequestAt(this.currFloor)) {
      if (this.shouldHandleRequest(this.currFloor)) {
        this.handleRequest(this.currFloor);
        return;
      }
    }

    if (!this.requestService.hasRequestAbove(this.currFloor)) {
      this.goDown();
    } else if (!this.requestService.hasRequestBelow(this.currFloor)) {
      this.goUp();
    } else {
      if (this.status === ElevatorStatus.UP) {
        this.goUp();
      } else {
        this.goDown();
      }
    }
  }

  private shouldHandleRequest(floor: number): boolean {
    if (this.requestService.hasInnerRequestAt(this.currFloor)) {
      return true;
    }

    if (this.requestService.hasUpRequestAt(floor)) {
      // up request
      if (this.status === ElevatorStatus.UP) {
        // elevator is going up
        return true;
      } else {
        // elevator is going down
        return !this.requestService.hasRequestBelow(floor);
      }
    } else {
      // down request
      if (this.status === ElevatorStatus.DOWN) {
        // elevator is going down
        return true;
      } else {
        // elevator is going up
        return !this.requestService.hasRequestAbove(floor);
      }
    }
  }

  private handleRequest(floor: number) {
    this.requestService.removeAllRequest(floor);
    this.requestLoadsubject.next(floor);
  }

  private goDown() {
    this.status = ElevatorStatus.DOWN;
    this.currFloor -= 1;
  }

  private goUp() {
    this.status = ElevatorStatus.UP;
    this.currFloor += 1;
  }
}
