import React, { useState } from "react";
import "./styles/index.scss";
import Canvas from "./modules/canvas";
import Sidebar from "./modules/sidebar";

function App() {
  const [draggedItem, setDraggedItem] = useState(null); //keep track of the item being dragged
  const [items, setItems] = useState([]);

  const downloadFile = () => {
    console.log("DOWNLOAD FILE", items);
    const config = { config: items };
    const jsonData = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "config.json";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const uploadFile = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    let extractedData = "";
    fileReader.onload = (e) => {
      extractedData = JSON.parse(e.target.result);
      setItems(extractedData.config);
    };
  };

  return (
    <React.Fragment>
      {/* <div className="app-header">MINI PAGE BUILDER</div> */}
      <div className="app-container pd-0 mg-0">
        <Canvas
          draggedItem={draggedItem}
          setDraggedItem={setDraggedItem}
          items={items}
          setItems={setItems}
        />
        <Sidebar
          setDraggedItem={setDraggedItem}
          downloadFile={downloadFile}
          uploadFile={uploadFile}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
