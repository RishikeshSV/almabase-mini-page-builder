import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const ConfigureElement = ({
  openPopup,
  setOpenPopup,
  item,
  setItem,
  items,
  setItems,
}) => {
  const toggle = () => {
    setOpenPopup(!openPopup);
  };

  const saveConfiguration = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = {};
    for (const [name, value] of form) formData[name] = value; //extract data from form and store it in a object for easy accessibility
    const temp = {
      ...item,
      name: formData.name,
      position: { x: formData.x, y: formData.y },
      weight: formData.weight,
      size: formData.size,
    };
    const index = items.findIndex((item) => item.Id === temp.Id); //check if new or exisiting item
    setItem(temp);
    index === -1
      ? setItems((prevItems) => [...prevItems, temp])
      : setItems((prevItems) => [
          ...prevItems.slice(0, index),
          temp,
          ...prevItems.slice(index + 1),
        ]); //update item with new configurations(x,y,size etc) or add the new item to canvas with the selected configurations
    toggle(); //closing the modal
  };

  return (
    <Modal isOpen={openPopup} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>{`Edit ${item.name}`}</ModalHeader>
      <ModalBody>
        <form onSubmit={(e) => saveConfiguration(e)}>
          <div className="d-flex pd-y-5">
            <span className="wd-100">Text:</span>
            <input
              name="name"
              className="flex-one"
              type="text"
              defaultValue={item.name}
            />
          </div>
          <div
            className="d-flex pd-y-5"
            style={{ justifyContent: "space-between" }}
          >
            <div className="d-flex">
              <div className="wd-100">X:</div>
              <input
                className="wd-100"
                name="x"
                type="number"
                defaultValue={Math.floor(item.position?.x)}
              />
            </div>
            <div className="d-flex">
              <div className="wd-100 mg-l-10">Y:</div>
              <input
                name="y"
                className="wd-100"
                type="number"
                defaultValue={Math.floor(item.position?.y)}
              />
            </div>
          </div>
          <div
            className="d-flex pd-y-5"
            style={{ justifyContent: "space-between" }}
          >
            <div className="d-flex">
              <div className="wd-100">Font Size:</div>
              <input
                name="size"
                className="wd-100"
                type="number"
                defaultValue={item.size ?? 16}
              />
            </div>
            <div className="d-flex">
              <div className="wd-100 mg-l-10">Font Weight:</div>
              <input
                name="weight"
                className="wd-100"
                type="number"
                defaultValue={item.weight ?? 400}
              />
            </div>
          </div>
          <div className="txt-center mg-t-10">
            <button className="submit-btn" type="submit">
              SAVE
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ConfigureElement;
