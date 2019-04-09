import { Injectable } from '@angular/core';
import { TOTAL_FLOOR, RequestType } from './constants';
import { Floor } from './floor';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  floors: Floor[] = [];

  constructor() {
    for (let i = 1; i <= TOTAL_FLOOR; i++) {
      this.floors.push(new Floor(i));
    }
  }

  addInnerRequest(floor: number): void {
    this.floors[floor - 1].addInnerRequest();
  }

  addUpRequest(floor: number): void {
    this.floors[floor - 1].addUpRequest();
  }

  addDownRequest(floor: number): void {
    this.floors[floor - 1].addDownRequest();
  }

  removeAllRequest(floor: number): void {
    this.floors[floor - 1].clearAllRequests();
  }

  empty(): boolean {
    return this.floors.reduce((accu, floor) => (accu && !floor.hasRequest()), true);
  }

  hasRequestAt(floor: number): boolean {
    return this.floors[floor - 1].hasRequest();
  }

  hasInnerRequestAt(floor: number): boolean {
    return this.floors[floor - 1].hasRequest(RequestType.INNER);
  }

  hasUpRequestAt(floor: number): boolean {
    return this.floors[floor - 1].hasRequest(RequestType.UP);
  }

  hasDownRequestAt(floor: number): boolean {
    return this.floors[floor - 1].hasRequest(RequestType.DOWN);
  }

  hasRequestAbove(floor: number): boolean {
    for (let i = floor; i < TOTAL_FLOOR; i++) {
      if (this.floors[i].hasRequest()) {
        return true;
      }
    }
    return false;
  }

  hasRequestBelow(floor: number): boolean {
    for (let i = floor - 2; i >= 0; i--) {
      if (this.floors[i].hasRequest()) {
        return true;
      }
    }
    return false;
  }
}
