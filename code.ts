figma.showUI(__html__);

let nodes: any[] = []
let lines: any[] = []

function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

function updateLines() {
  lines.forEach((line, index) => {
    const startNode = nodes[index];
    const endNode = nodes[index + 1];

    if (startNode && endNode) {
      const distance = getDistance(startNode.x, startNode.y, endNode.x, endNode.y);
      const angle = Math.atan2(endNode.y - startNode.y, endNode.x - startNode.x);
      const rotationInDegrees = -angle * (180 / Math.PI);

      line.x = startNode.x;
      line.y = startNode.y;
      line.resize(distance, 0);
      line.rotation = rotationInDegrees;
    }
  });
}

figma.on("documentchange", () => {
  console.log("change")
  updateLines();
  //https://www.figma.com/plugin-docs/api/properties/figma-on/
})

figma.on("selectionchange", () => {

})

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-arrows") {
    nodes = [];
    console.log(figma.currentPage.selection)
    for (const node of figma.currentPage.selection) {
      nodes.push(node);
    }

    console.log(nodes)
    // if (nodes.length === 2) {
    //   const line = figma.createLine();
    //   line.name = "fancy-arrow"
    //   const startNode = nodes[0];
    //   const endNode = nodes[1];

    //   line.x = startNode.x;
    //   line.y = startNode.y;

    //   const distance = getDistance(startNode.x, startNode.y, endNode.x, endNode.y);
    //   const angle = Math.atan2(endNode.y - startNode.y, endNode.x - startNode.x);
    //   const rotationInDegrees = -angle * (180 / Math.PI);

    //   line.resize(distance, 0);
    //   line.rotation = rotationInDegrees;
    //   line.strokeWeight = 4;
    //   line.strokes = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];
    //   line.strokeCap = "ARROW_LINES";
    //   lines.push(line);
    //   figma.currentPage.appendChild(line);
    // }
    console.log(nodes)
    nodes.forEach((node, index) => {
      if (index + 1 === nodes.length) return

      const line = figma.createLine();
      line.name = "fancy-arrow"
      const startNode = node;
      const endNode = nodes[index + 1];

      line.x = startNode.x;
      line.y = startNode.y;

      const distance = getDistance(startNode.x, startNode.y, endNode.x, endNode.y);
      const angle = Math.atan2(endNode.y - startNode.y, endNode.x - startNode.x);
      const rotationInDegrees = -angle * (180 / Math.PI);

      line.resize(distance, 0);
      line.rotation = rotationInDegrees;
      line.strokeWeight = 4;
      line.strokes = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];
      line.strokeCap = "ARROW_LINES";
      lines.push(line);
      figma.currentPage.appendChild(line);

    })

  }
  else if (msg.type === "remove-arrows") {
    figma.currentPage.findAll(n => n.name.includes("fancy-arrow")).forEach(el => el.remove());
    lines = []
  }
};
