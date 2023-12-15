import React, { useState } from "react";

const Canvas = ({ draggedItem }) => {
  const [items, setItems] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();

    const canvasRect = e.currentTarget.getBoundingClientRect();
    // Calculate the position relative to the canvas
    const x = e.clientX - draggedItem.x - canvasRect.left;
    const y = e.clientY - draggedItem.y - canvasRect.top;
    setItems([
      ...items,
      {
        name: draggedItem.Name,
        position: { x, y },
      },
    ]);
  };

  return (
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
                className="dragged-item"
                style={{
                  transform: `translate(${item.position.x}px, ${item.position.y}px`,
                }}
              >
                {item.name}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Canvas;
