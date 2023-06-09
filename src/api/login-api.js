import { HOST } from "../commons/hosts";
import RestApiClient from "../commons/api/rest-client";

const endpoint = {
  login: "/login",
};

function loginUser(user, callback) {
  let request = new Request(HOST.backend_api + endpoint.login, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  RestApiClient.performRequest(request, callback);
}
export { loginUser };
