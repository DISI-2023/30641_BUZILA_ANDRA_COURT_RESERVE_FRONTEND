import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import LoginForm from "./login-form";
import MakeReservationForm from "./make-reservation-form";

function MakeReservationModal() {
  const [isSelected, setIsSelected] = useState(false);

  function toggleIsSelected() {
    setIsSelected(!isSelected);
  }

  return (
    <div>
      <Button type={"button"} color="primary" onClick={toggleIsSelected}>
        Make a reservation
      </Button>
      <Modal isOpen={isSelected} toggle={toggleIsSelected} size="lg">
        <ModalHeader toggle={toggleIsSelected}>
          {" "}
          Make a reservation:{" "}
        </ModalHeader>
        <ModalBody>
          <MakeReservationForm toggleModal={toggleIsSelected} />
        </ModalBody>
      </Modal>
    </div>
  );
}
export default MakeReservationModal;
