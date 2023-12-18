import React, { useState, useRef, useEffect } from "react";
import ConfigureElement from "./ConfigureElement";

const Canvas = ({ draggedItem = {}, setDraggedItem, items = [], setItems }) => {
  const [activeItem, setActiveItem] = useState({}); //item that will get edited

  const [openConfigurePopup, setOpenConfigurePopup] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]); //the selected item from the canvas that is already saved (to edit or delete)

  const canvasRef = useRef(null);
  const [selectionArea, setSelectionArea] = useState({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const [isDragging, setIsDragging] = useState(false);

  const stateRef = useRef({ selectedItems }); // needed for handleKeyDown which is created at initial render when selectedItems is empty, so it will always use empty array instead of the updated one

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown); //adding the window event listener on initial mount
    return () => window.removeEventListener("keydown", handleKeyDown); //removing the window event listener on unmount
  }, []);

  const handleDrop = (e) => {
    //save coordinates and the dragged item in the canvas
    e.preventDefault();
    const canvasRect = canvasRef.current.getBoundingClientRect();
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
      stateRef.current.selectedItems = [updatedItem]; //keeping reference to the updated value to use in handleKeyDown event created at initial render
      setSelectedItems([updatedItem]);
    } else {
      //new item, add it to canvas after user sets up the configuration
      setActiveItem({
        Id: items.length,
        name: draggedItem.Name,
        type: draggedItem.Type,
        position: { x, y },
      });
      setOpenConfigurePopup(true);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (key) => {
    //condition to check if user has selected an item
    const currentSelectedItems = stateRef.current.selectedItems; //using current reference to get the updated value
    if (currentSelectedItems.length === 1 && key.code === "Enter") {
      //open the config menu for the element if user clicked enter
      //can't open the menu for multiple elements
      setActiveItem(currentSelectedItems[0]);
      setOpenConfigurePopup(true);
    } else if (currentSelectedItems.length >= 1 && key.code === "Delete") {
      //delete item from canvas if user clicked delete
      //can delete multiple items at one time
      setActiveItem({});
      const itemIdsToDelete = currentSelectedItems.map((a) => a.Id);
      setItems((prevItems) =>
        prevItems.filter((item) => !itemIdsToDelete.includes(item.Id))
      );
    }
  };

  //DRAGGING AND SELECTING EVENTS
  const handleMouseDown = (e) => {
    //first event that runs when user begins to select items
    setIsDragging(true);
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setSelectionArea({
      start: { x: e.clientX - canvasRect.left, y: e.clientY - canvasRect.top },
      end: { x: e.clientX - canvasRect.left, y: e.clientY - canvasRect.top },
    }); //getting the cooridnate of first click
  };

  const handleMouseMove = (e) => {
    //second event that fires when user moves mouse
    if (isDragging) {
      // check if user is still pressing the mouse
      //only relevant if user is still pressing and dragging
      const canvasRect = canvasRef.current.getBoundingClientRect();
      setSelectionArea({
        start: selectionArea.start,
        end: { x: e.clientX - canvasRect.left, y: e.clientY - canvasRect.top },
      }); //keep updating the selection area; important to display the selection area in UI
    }
  };

  const handleMouseUp = (e) => {
    //final event when user lifts off the click

    const newSelectedItems = items.filter(
      (item) => isItemInSelectionArea(item, selectionArea) // |filter out selected items in the selection area
    );
    if (newSelectedItems.length) {
      setSelectedItems(newSelectedItems);
      stateRef.current.selectedItems = newSelectedItems;
    } else {
      setSelectedItems([]);
      stateRef.current.selectedItems = [];
    }
    setIsDragging(false); //drag and select is complete
  };

  const isItemInSelectionArea = (item, area) => {
    const itemRect = {
      left: item.position.x,
      top: item.position.y,
      right: item.position.x,
      bottom: item.position.y,
    };

    return (
      itemRect.left >= area.start.x &&
      itemRect.top >= area.start.y &&
      itemRect.right <= area.end.x &&
      itemRect.bottom <= area.end.y
    ); //check if item corridnates are inside the selection rectangle area
  };

  return (
    <React.Fragment>
      <div
        className="canvas"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e)}
        onMouseDown={(e) => handleMouseDown(e)} //click
        onMouseMove={(e) => handleMouseMove(e)} //drag and move
        onMouseUp={(e) => handleMouseUp(e)} //finish selection
        ref={canvasRef}
      >
        {items &&
          items.map((item, i) => (
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
                color: item.color,
                background: item.background,
                border: selectedItems.some((a) => a.Id === item.Id)
                  ? "1px solid red"
                  : "",
              }}
              onDragStart={(e) =>
                setDraggedItem({
                  ...item,
                  x: e.clientX - e.currentTarget.getBoundingClientRect().left,
                  y: e.clientY - e.currentTarget.getBoundingClientRect().top, //calculating the offset
                })
              } //item being dragged
              onDoubleClick={() => {
                setActiveItem(item);
                setOpenConfigurePopup(true); //open the config menu on double click
              }}
              onClick={() => {
                setSelectedItems([item]);
                stateRef.current.selectedItems = [item];
              }}
            >
              {item.type === "Input" ? <input type="text" /> : item.name}
            </div>
          ))}
      </div>

      {isDragging && (
        <div
          className="selection-area"
          style={{
            left: `${selectionArea.start.x}px`,
            top: `${selectionArea.start.y}px`,
            width: `${selectionArea.end.x - selectionArea.start.x}px`,
            height: `${selectionArea.end.y - selectionArea.start.y}px`,
          }}
        /> //display selection area if the user is still dragging
      )}

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
