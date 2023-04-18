import {Button} from "reactstrap";
import {useNavigate} from "react-router-dom";

function LogoutButton(){

    let navigate = useNavigate();

    function deleteUser() {
        let loggedUser = localStorage.getItem('loggedUser');
        if (loggedUser != null){
            localStorage.removeItem("loggedUser");
            navigate("/");
        }
        else{
            alert("You are not logged in!");
        }
    }

    return(
        <div>
            <Button color={"primary"} onClick={deleteUser}>Logout</Button>
        </div>
    );
}
export default LogoutButton;