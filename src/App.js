import React, { useState } from "react";
import "./styles/index.scss";
import Canvas from "./modules/canvas";
import Sidebar from "./modules/sidebar";

function App() {
  const [draggedItem, setDraggedItem] = useState(null); //keep track of the item being dragged
  const [items, setItems] = useState([]); //items displayed in the canvas

  const downloadFile = () => {
    //method to download the current configuration as a json file
    const config = { config: items };
    const jsonData = JSON.stringify(config, null, 2);
    //creating a blob object to download the json file through an <a> tag
    const blob = new Blob([jsonData], { type: "application/json" });
    const downloadLink = document.createElement("a"); //creating the a element
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "config.json";
    document.body.appendChild(downloadLink);
    downloadLink.click(); //downloading file
    document.body.removeChild(downloadLink); //deleting the a element
  };
  const uploadFile = (file) => {
    //method to upload a saved configuration as json file to continue where user left off
    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    let extractedData = "";
    fileReader.onload = (e) => {
      extractedData = JSON.parse(e.target.result); //parsing the text to object
      setItems(extractedData.config);
    };
  };

  return (
    <React.Fragment>
      {/* <div className="app-header">MINI PAGE BUILDER</div> */}
      <div className="app-container pd-0 mg-0">
        <Canvas //area where user will drop the items
          draggedItem={draggedItem}
          setDraggedItem={setDraggedItem}
          items={items}
          setItems={setItems}
        />
        <Sidebar //contains list of items that user will use to create his mini-website
          setDraggedItem={setDraggedItem}
          downloadFile={downloadFile}
          uploadFile={uploadFile}
        />
      </div>
    </React.Fragment>
  );
}

export default App;
