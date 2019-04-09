import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ElevatorStatus } from './constants';
import { RequestService } from './request.service';

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

    if (!this.requestService.hasRequestAbove(this.currFloor) || !this.requestService.hasRequestBelow(this.currFloor)) {
      return true;
    }

    return (this.status === ElevatorStatus.UP && this.requestService.hasUpRequestAt(floor)) ||
           (this.status === ElevatorStatus.DOWN && this.requestService.hasDownRequestAt(floor));
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
