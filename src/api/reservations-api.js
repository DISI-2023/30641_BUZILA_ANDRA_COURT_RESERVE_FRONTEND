import {HOST} from "../commons/hosts";
import RestApiClient from "../commons/api/rest-client";

const endpoint = {
    court: '/court'
};

function getAvailableCourts(searchInput, callback){
    let request = new Request(HOST.backend_api + endpoint.court + '/searchForCourts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchInput)
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getAllLocationsWithCourts(callback){
    let request = new Request(HOST.backend_api + endpoint.court, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getAvailableCourts,
    getAllLocationsWithCourts,
}