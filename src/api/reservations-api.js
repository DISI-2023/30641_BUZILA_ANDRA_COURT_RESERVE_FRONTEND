import { HOST } from "../commons/hosts";
import RestApiClient from "../commons/api/rest-client";

const endpoint = {
  court: "/court",
  reservation: "/reservation",
};

function getAvailableCourts(searchInput, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.court + "/searchForCourts",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchInput),
    }
  );

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function getAllLocationsWithCourts(callback) {
  let request = new Request(
    HOST.backend_api + endpoint.court + "/getCourtsForAdmin",
    {
      method: "GET",
    }
  );

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function makeReservation(data, callback) {
  let request = new Request(HOST.backend_api + endpoint.reservation, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function calculateReservationPrice(data, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.reservation + "/calculatePrice",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

export {
  getAvailableCourts,
  getAllLocationsWithCourts,
  makeReservation,
  calculateReservationPrice,
};
