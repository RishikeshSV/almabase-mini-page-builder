import React, { useState } from "react";
import ConfigureElement from "./ConfigureElement";

const Canvas = ({ draggedItem = {}, setDraggedItem, items = [], setItems }) => {
  const [activeItem, setActiveItem] = useState({}); //the item that was just dragged, i.e, to keep track of the dragged item

  const [openConfigurePopup, setOpenConfigurePopup] = useState(false);

  const [selectedItem, setSelectedItem] = useState({}); //the selected item from the canvas

  const handleDrop = (e) => {
    //save coordinates and the dragged item in the canvas
    e.preventDefault();
    const canvasRect = e.currentTarget.getBoundingClientRect();
    // Calculate the position relative to the canvas
    const x = e.clientX - draggedItem.x - canvasRect.left;
    const y = e.clientY - draggedItem.y - canvasRect.top;
    if (draggedItem.position) {
      // not a new item, just moving the existing item inside the canvas
      const index = items.findIndex((item) => item.Id === draggedItem.Id);
      const updatedItem = { ...items[index], position: { x, y } };
      setItems([
        ...items.slice(0, index),
        updatedItem,
        ...items.slice(index + 1),
      ]);
      setSelectedItem(updatedItem);
    } else {
      //new item, add it to canvas after user sets up the configuration
      setActiveItem({
        Id: items.length,
        name: draggedItem.Name,
        position: { x, y },
      });
      setOpenConfigurePopup(true);
    }
  };

  const handleKeyDown = (key) => {
    if (Object.keys(selectedItem).length) {
      //condition to check if use has selected an item
      if (key === "Enter") {
        //open the config menu for the element if user clicked enter
        setActiveItem(selectedItem);
        setOpenConfigurePopup(true);
      } else if (key === "Delete") {
        //delete item from canvas if user clicked delete
        setActiveItem({});
        setSelectedItem({});
        setItems(items.filter((item) => item.Id !== selectedItem.Id));
      }
    }
  };

  return (
    <React.Fragment>
      <div className="canvas">
        {/* <div className="canvas-header">CANVAS</div> */}
        <div
          className="canvas-area"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e)}
        >
          {items.length
            ? items.map((item, i) => (
                <div
                  tabIndex={i}
                  key={`Item-${i}`}
                  draggable
                  className="dragged-item"
                  style={{
                    outline: "none",
                    transform: `translate(${item.position.x}px, ${item.position.y}px`,
                    fontWeight: item.weight,
                    fontSize: item.size + "px",
                    border: selectedItem.Id === item.Id ? "1px solid red" : "",
                  }}
                  onDragStart={(e) =>
                    setDraggedItem({
                      ...item,
                      x:
                        e.clientX -
                        e.currentTarget.getBoundingClientRect().left,
                      y:
                        e.clientY - e.currentTarget.getBoundingClientRect().top, //calculating the offset
                    })
                  } //item being dragged
                  onDoubleClick={() => {
                    setActiveItem(item);
                    setOpenConfigurePopup(true);
                  }}
                  onClick={() => {
                    selectedItem.Id === item.Id
                      ? setSelectedItem({})
                      : setSelectedItem(item);
                  }}
                  onKeyDown={(e) => handleKeyDown(e.key)}
                >
                  {item.name}
                </div>
              ))
            : null}
        </div>
      </div>

      <ConfigureElement
        openPopup={openConfigurePopup}
        setOpenPopup={setOpenConfigurePopup}
        item={activeItem}
        setItem={setActiveItem}
        items={items}
        setItems={setItems}
      />
    </React.Fragment>
  );
};

export default Canvas;
