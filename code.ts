figma.showUI(__html__);

function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-arrows") {
    const nodes: SceneNode[] = [];

    for (const node of figma.currentPage.selection) {
      nodes.push(node);
    }

    if (nodes.length === 2) {
      console.log("asdasddas");
      // const vector = figma.createVector();
      // figma.currentPage.appendChild(vector);

      // Create two stickies
      const line: LineNode = figma.createLine();

      // Move to (50, 50)
      line.x = nodes[0].x;
      line.y = nodes[1].y;

      // Make line 200px long
      line.resize(getDistance(nodes[0].x, nodes[0].y, nodes[1].x, nodes[1].y),0);
      console.log(getDistance(nodes[0].x, nodes[0].y, nodes[1].x, nodes[1].y) );

      // 4px thick red line with arrows at each end
      line.strokeWeight = 4;
      line.strokes = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];
      line.strokeCap = "ARROW_LINES";
      figma.currentPage.appendChild(line);

      // Connect the two stickies
      // const connector = figma.createConnector();
      // connector.connectorStart = {
      //   endpointNodeId: stickyLeft.id,
      //   magnet: "AUTO",
      // };

      // connector.connectorEnd = {
      //   endpointNodeId: stickyRight.id,
      //   magnet: "AUTO",
      // };
    }
    console.log(nodes);
  }
};
