import React, { useState, useEffect } from "react";
import "./location.scss";
import defaultCourtMap from "../../assets/defaultMap.png";
import { Button } from "reactstrap";
import { postRequest } from "../../api/httpUtils";
import { FILE_READER_STATES } from "../../constants/fileReaderStates";

const Locations = ({ onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [addLocationClicked, setAddLocationClicked] = useState(true);
  const [courtMap, setCourtMap] = useState(defaultCourtMap);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState("");

  const onAddressChange = (value) => {
    setAddress(value.target.value);
  };

  const onLongitudeChange = (value) => {
    setLongitude(value.target.value);
  };
  const onLatitudeChange = (value) => {
    setLatitude(value.target.value);
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === FILE_READER_STATES.Done) {
        setCourtMap(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onFinish = async () => {
    const fieldsContent = {
      address: address,
      longitude: longitude,
      latitude: latitude,
      courtsImage: courtMap,
    };

    try {
      await postRequest("/location/addLocation", fieldsContent);
    } catch (error) {
      console.log("Server error");
    }
  };

  return (
    <div className="locations-page">
      <Button>Add location</Button>
      {addLocationClicked && (
        <>
          <div className="background-box">
            <h3>Add new location</h3>
            <div className="form ">
              <div className="form-line">
                <label>Address*</label>
                <input
                  type={"text"}
                  maxLength={100}
                  placeholder="Address"
                  onChange={(value) => onAddressChange(value)}
                  value={address}
                />
              </div>
              <div className="form-line">
                <label>Longitude*</label>
                <input
                  type={"number"}
                  placeholder="Longitude"
                  onChange={(value) => onLongitudeChange(value)}
                  value={longitude}
                />
              </div>
              <div className="form-line">
                <label>Latitude*</label>
                <input
                  type={"number"}
                  placeholder="Latitude"
                  onChange={(value) => onLatitudeChange(value)}
                  value={latitude}
                />
              </div>
            </div>
            <div className={"map"}>
              <img src={courtMap} alt="map" />
              <div className="form-line">
                <label className="upload-label" htmlFor="input">
                  Upload courts map
                </label>
                <input
                  type="file"
                  name="image-upload"
                  id="input"
                  accept="image/*"
                  onChange={imageHandler}
                />
              </div>
            </div>
            <div className="form-submit">
              <p>You need to complete all the fields marked with *</p>
              <button
                className="btn"
                onClick={onFinish}
                disabled={!(address && longitude && latitude)}
              >
                Add
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Locations;
