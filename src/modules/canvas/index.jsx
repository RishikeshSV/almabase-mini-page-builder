import React, { useState } from "react";
import ConfigureElement from "./ConfigureElement";

const Canvas = ({ draggedItem, setDraggedItem }) => {
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [openConfigurePopup, setOpenConfigurePopup] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const canvasRect = e.currentTarget.getBoundingClientRect();
    // Calculate the position relative to the canvas
    const x = e.clientX - draggedItem.x - canvasRect.left;
    const y = e.clientY - draggedItem.y - canvasRect.top;
    setActiveItem({
      Id: items.length,
      name: draggedItem.Name,
      position: { x, y },
    });
    if (draggedItem.position) {
      const index = items.findIndex((item) => item.Id === draggedItem.Id);
      setItems([
        ...items.slice(0, index),
        { ...items[index], position: { x, y } },
        ...items.slice(index + 1),
      ]);
    } else setOpenConfigurePopup(true);
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
                  key={`Item-${i}`}
                  draggable
                  className="dragged-item"
                  style={{
                    transform: `translate(${item.position.x}px, ${item.position.y}px`,
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
