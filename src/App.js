import React, { useState, useRef } from "react";
import "./styles/index.scss";
import Canvas from "./modules/canvas";
import Sidebar from "./modules/sidebar";

function App() {
  const [draggedItem, setDraggedItem] = useState(null); //keep track of the item being dragged

  return (
    <React.Fragment>
      <div className="app-header">MINI PAGE BUILDER</div>
      <div className="container">
        <Sidebar setDraggedItem={setDraggedItem} />
        <Canvas draggedItem={draggedItem} setDraggedItem={setDraggedItem} />
      </div>
    </React.Fragment>
  );
}

export default App;
