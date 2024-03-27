export function getPenpotSegments(vectorPath: any, x: number, y: number): any {
  const segments = [];

  vectorPath.forEach((path) => {
    const data = path.data;
    const shapesData = data
      .split("Z")
      .filter((shapeData: string) => shapeData.length > 0)
      .map((shapeData: string) => shapeData.trim() + " Z");

    const commandRegex = /([MLCZ])([^MLCZ]*)/g;
    shapesData.forEach((shapeData: string) => {
      let match: RegExpExecArray | null;
      while ((match = commandRegex.exec(shapeData))) {
        const command = match[1];
        const params = match[2].trim().split(" ").map(parseFloat);

        if (command === "M") {
          segments.push({
            command: Symbol.for("move-to"),
            params: { x: params[0] + x, y: params[1] + y },
          });
        } else if (command === "L") {
          segments.push({
            command: Symbol.for("line-to"),
            params: { x: params[0] + x, y: params[1] + y },
          });
        } else if (command === "C") {
          segments.push({
            command: Symbol.for("curve-to"),
            params: {
              x: params[4] + x,
              y: params[5] + y,
              c1x: params[0] + x,
              c1y: params[1] + y,
              c2x: params[2] + x,
              c2y: params[3] + y,
            },
          });
        } else if (command === "Z") {
          segments.push({
            command: Symbol.for("close-path"),
          });
        }
      }
    });
  });

  return segments;
}
