export class Map {
  constructor() {
    this.goal = { x: 3, y: 3 };
    this.traps = [];
    this.trap = { x: this.goal.x - 1, y: this.goal.y - 1 };
  }

  setChoices() {
    const choices = ["forward", "right", "left", "back"];
    choices.splice(Math.floor(Math.random() * 5), 1);
    this.choices = choices;
  }

  putTrap(number) {
    if (this.traps.length > 5) {
      this.traps.shift();
    }
    const newTrap = { x: 0, y: 0 };
    do {
      number += 1;
      newTrap.x = this.goal.x - Math.floor(Math.random() * number);
      newTrap.y = this.goal.y - Math.floor(Math.random() * number);
    } while (newTrap.x === this.goal.x && newTrap.y === this.goal.y);

    if (this.traps.find(({ x, y }) => x === newTrap.x && y === newTrap.y)) {
      return false;
    }
    this.traps.push(newTrap);
    return true;
  }
}
