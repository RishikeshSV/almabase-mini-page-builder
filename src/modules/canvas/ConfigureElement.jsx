import React, { useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ConfigureElement = ({
  openPopup,
  setOpenPopup,
  item,
  setItem,
  setItems,
}) => {
  const toggle = () => setOpenPopup(!openPopup);

  const saveConfiguration = () => {
    setItems((prevItems) => [...prevItems, item]);
    toggle();
  };

  return (
    <Modal isOpen={openPopup} toggle={toggle}>
      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
      <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => saveConfiguration()}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfigureElement;
