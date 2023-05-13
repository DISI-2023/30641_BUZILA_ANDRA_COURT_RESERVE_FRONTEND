import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import GetEmailResetPasswordForm from "./get-email-reset-password-form";
import { Link } from "react-router-dom";

function GetEmailResetPasswordModal() {
  const [isSelected, setIsSelected] = useState(false);

  function toggleIsSelected() {
    setIsSelected(!isSelected);
  }

  return (
    <div>
      <Link onClick={toggleIsSelected}>Forgot your password?</Link>
      <Modal isOpen={isSelected} toggle={toggleIsSelected} size="lg">
        <ModalHeader toggle={toggleIsSelected}>
          {" "}
          Enter your email to receive reset password link:{" "}
        </ModalHeader>
        <ModalBody>
          <GetEmailResetPasswordForm toggleModal={toggleIsSelected} />
        </ModalBody>
      </Modal>
    </div>
  );
}
export default GetEmailResetPasswordModal;
