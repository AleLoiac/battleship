export class Player {
  constructor(type = "human") {
    if (type !== "human" && type !== "computer") {
      throw new Error("Invalid player type");
    }

    this.type = type;
  }
}
