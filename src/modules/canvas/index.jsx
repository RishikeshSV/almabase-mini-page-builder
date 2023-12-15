import React, { useState } from "react";

const Canvas = ({ draggedItem }) => {
  const [items, setItems] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setItems([
      ...items,
      {
        ...draggedItem,
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
                {item.Name}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Canvas;
