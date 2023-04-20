import {useState} from "react";
import {Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import LoginForm from "./login-form";

function LoginModal(){

    const [isSelected, setIsSelected] = useState(false);

    function toggleIsSelected(){
        setIsSelected(!isSelected);
    }

    return (
        <div>
            <Button type={"button"} color="primary" onClick={toggleIsSelected}>Login</Button>
            <Modal isOpen={isSelected} toggle={toggleIsSelected} size="lg">
                <ModalHeader toggle={toggleIsSelected}> Login to your account: </ModalHeader>
                <ModalBody>
                    <LoginForm />
                </ModalBody>
            </Modal>
        </div>
    );
}
export default LoginModal;