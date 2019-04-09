import { RequestType } from './constants';

export class Floor {
  num: number;
  requests: boolean[];

  constructor(num) {
    this.num = num;
    this.requests = [false, false, false];
  }

  addInnerRequest(): void {
    this.addRequest(RequestType.INNER);
  }

  addUpRequest(): void {
    this.addRequest(RequestType.UP);
  }

  addDownRequest(): void {
    this.addRequest(RequestType.DOWN);
  }

  addRequest(type: number): void {
    this.requests[type] = true;
  }

  hasRequest(type = null): boolean {
    if (type === null) {
      return this.requests.reduce((accu, curr) => (accu || curr), false);
    } else {
      return this.requests[type];
    }
  }

  clearAllRequests() {
    for (let i = 0; i < this.requests.length; i++) {
      this.requests[i] = false;
    }
  }
}
