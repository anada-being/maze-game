export class User {
  constructor(x = 0, y = 0, maxX = 7, maxY = 7, minX = -3, minY = -3) {
    this.direction = "north";
    this.DIRECTION = ["north", "east", "south", "west"];
    this.point = { x, y };
    this.max = { x: maxX, y: maxY };
    this.min = { x: minX, y: minY };
  }

  setY(number) {
    this.point.y = number;
  }

  setX(number) {
    this.point.x = number;
  }

  setDirection(direction) {
    this.direction = direction;
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
    return this.walk();
  }

  walk() {
    switch (this.direction) {
      case "north":
        this.setY(this.point.y + 1);
        break;
      case "south":
        this.setY(this.point.y - 1);
        break;
      case "east":
        this.setX(this.point.x + 1);
        break;
      case "west":
        this.setX(this.point.x - 1);
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
