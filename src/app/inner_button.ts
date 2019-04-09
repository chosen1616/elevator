import { Button } from './button';

export class InnerButton extends Button {
  floor: number;

  constructor(floor: number) {
    super();
    this.floor = floor;
  }
}
