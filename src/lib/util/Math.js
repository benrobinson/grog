export class Radians {
  static toDegrees(radians) {
    return deg * (180 / Math.PI)
  }
}

export class Degrees {
  static toRadians(degrees) {
    return degrees * (Math.PI / 180)
  }

  static slope(degrees, speed) {
    const sin = Math.sin(Degrees.toRadians(degrees));
    const opp = speed * sin;
    const cos = Math.cos(Degrees.toRadians(degrees));
    const adj = speed * cos;
    return {
      x: adj,
      y: opp
    }
  }
}