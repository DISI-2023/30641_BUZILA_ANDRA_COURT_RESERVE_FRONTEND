import { HOST } from "../commons/hosts";
import RestApiClient from "../commons/api/rest-client";

const endpoint = {
  court: "/court",
};

function deleteCourt(court, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.court + "/deleteCourt",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(court),
    }
  );

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function modifyCourt(court, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.court + "/updateCourt",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(court),
    }
  );

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

export { deleteCourt, modifyCourt };
