import React, { useState } from "react";
import "./styles/index.scss";
import Canvas from "./modules/canvas";
import Sidebar from "./modules/sidebar";

function App() {
  const [draggedItem, setDraggedItem] = useState(null); //keep track of the item being dragged

  return (
    <React.Fragment>
      {/* <div className="app-header">MINI PAGE BUILDER</div> */}
      <div className="app-container pd-0 mg-0">
        <Canvas draggedItem={draggedItem} setDraggedItem={setDraggedItem} />
        <Sidebar setDraggedItem={setDraggedItem} />
      </div>
    </React.Fragment>
  );
}

export default App;
