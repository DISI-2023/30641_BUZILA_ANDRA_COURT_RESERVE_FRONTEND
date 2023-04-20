import {UncontrolledAlert} from "reactstrap";

function ErrorHandler(){
    return (
        <div>
            <UncontrolledAlert color="danger">
                An unexpected error occurred on the server side!
            </UncontrolledAlert>
        </div>
    );
}
export default ErrorHandler;
