import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import UpdateCourtForm from "./update-court-form";

function UpdateCourtModal({ getData, courtData }) {
  const [isSelected, setIsSelected] = useState(false);

  function toggleIsSelected() {
    setIsSelected(!isSelected);
  }

  return (
    <div>
      <Button type={"button"} color="primary" onClick={toggleIsSelected}>
        Update
      </Button>
      <Modal isOpen={isSelected} toggle={toggleIsSelected} size="lg">
        <ModalHeader toggle={toggleIsSelected}>
          {" "}
          Modify a court's data:{" "}
        </ModalHeader>
        <ModalBody>
          <UpdateCourtForm getData={getData} courtData={courtData} />
        </ModalBody>
      </Modal>
    </div>
  );
}
export default UpdateCourtModal;