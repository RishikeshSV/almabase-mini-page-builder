import React, { useState } from "react";
import ConfigureElement from "./ConfigureElement";

const Canvas = ({ draggedItem, setDraggedItem }) => {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState({});

  const [openConfigurePopup, setOpenConfigurePopup] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});

  const handleDrop = (e) => {
    e.preventDefault();
    const canvasRect = e.currentTarget.getBoundingClientRect();
    // Calculate the position relative to the canvas
    const x = e.clientX - draggedItem.x - canvasRect.left;
    const y = e.clientY - draggedItem.y - canvasRect.top;
    if (draggedItem.position) {
      const index = items.findIndex((item) => item.Id === draggedItem.Id);
      setItems([
        ...items.slice(0, index),
        { ...items[index], position: { x, y } },
        ...items.slice(index + 1),
      ]);
    } else {
      setActiveItem({
        Id: items.length,
        name: draggedItem.Name,
        position: { x, y },
      });
      setOpenConfigurePopup(true);
    }
  };

  const handleKeyDown = (key) => {
    if (selectedItem) {
      if (key === "Enter") {
        setActiveItem(selectedItem);
        setOpenConfigurePopup(true);
      } else if (key === "Delete") {
        setActiveItem({});
        setSelectedItem({});
        setItems(items.filter((item) => item.Id !== selectedItem.Id));
      }
    }
  };

  return (
    <React.Fragment>
      <div className="canvas">
        <div className="canvas-header">CANVAS</div>
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
                        e.currentTarget.getBoundingClientRect().left, //calculate the offset
                      y:
                        e.clientY - e.currentTarget.getBoundingClientRect().top, //calculate the offset
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
        setItems={setItems}
      />
    </React.Fragment>
  );
};

export default Canvas;
