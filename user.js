export class User {
  constructor() {
    this.direction = "north";
    this.DIRECTION = ["north", "east", "south", "west"];
    this.point = { x: 0, y: 0 };
    this.max = { x: 7, y: 7 };
    this.min = { x: -3, y: -3 };
  }

  faceToDirection(choice) {
    switch (choice) {
      case "right":
        this.direction =
          this.DIRECTION[(this.DIRECTION.indexOf(this.direction) + 1) % 4];
        break;
      case "left":
        this.direction =
          this.DIRECTION[(this.DIRECTION.indexOf(this.direction) + 3) % 4];
        break;
      case "back":
        this.direction =
          this.DIRECTION[(this.DIRECTION.indexOf(this.direction) + 2) % 4];
        break;
    }
    return this.#walk();
  }

  #walk() {
    switch (this.direction) {
      case "north":
        this.point.y += 1;
        break;
      case "south":
        this.point.y -= 1;
        break;
      case "east":
        this.point.x += 1;
        break;
      case "west":
        this.point.x -= 1;
        break;
    }
    if (
      this.point.x < this.min.x ||
      this.point.x > this.max.x ||
      this.point.y < this.min.y ||
      this.point.y > this.max.y
    ) {
      console.log(this.point, "You are too far away from the goal.\n");
    }
    return this.point;
  }
}
