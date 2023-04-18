import {Button} from "reactstrap";

function LogoutButton(){

    function deleteUser() {
        let loggedUser = localStorage.getItem('loggedUser');
        if (loggedUser != null){
            localStorage.removeItem("loggedUser");
        }
    }

    return(
        <div>
            <Button color={"primary"} onClick={deleteUser}>Logout</Button>
        </div>
    );
}
export default LogoutButton;