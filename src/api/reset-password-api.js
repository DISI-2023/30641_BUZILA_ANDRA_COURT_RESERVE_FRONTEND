import { HOST } from "../commons/hosts";
import RestApiClient from "../commons/api/rest-client";

const endpoint = {
  resetPassword: "/resetPassword",
};

function getResetPasswordEmail(data, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.resetPassword + "/changePassword",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  RestApiClient.performRequest(request, callback);
}

function resetPassword(data, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.resetPassword + "/resetPasswordUser",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  RestApiClient.performRequest(request, callback);
}

export { getResetPasswordEmail, resetPassword };
