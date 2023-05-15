import React, { useState, useEffect } from "react";
import "./location.scss";
import { postRequest, getRequest } from "../api/httpUtils";

const TariffForm = ({ setIsOpen }) => {
  const [addSuccessfully, setAddSuccessfully] = useState(false);
  const [criterion, setCriterion] = useState(0);
  const [tariff, setTariff] = useState(0);
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getAllLocations = async () => {
      try {
        const response = await getRequest("/location/getAllLocations");
        setLocations(response.data);
      } catch (error) {
        console.log("Error fetching locations", error);
      }
    };

    getAllLocations();
  }, []);

  const onCriterionChange = (event) => {
    setCriterion(event.target.value);
  };

  const onTariffChange = (value) => {
    setTariff(value.target.value);
  };
  const onLocationChange = (value) => {
    setLocation(value.target.value);
  };

  const onClose = () => {
    setIsOpen(false);
    setAddSuccessfully(false);
  };
  const onFinish = async () => {
    const fieldsContent = {
      criterion: criterion,
      value: tariff,
      location_id: location,
    };

    try {
      await postRequest("/tariff", fieldsContent);
      setAddSuccessfully(true);
    } catch (error) {
      setAddSuccessfully(false);
      console.log("Server error");
    }
  };

  return (
    <div className="locations-page">
      <div className="background-box">
        <h3>Add new tariff</h3>
        <div className="form ">
          <div className="form-line">
            <label>Criterion*</label>

            <select onChange={onCriterionChange} value={criterion}>
              <option value="">Select Criterion</option>
              <option value="pretDeBaza">Default tariff</option>
              <option value="vara">Vara</option>
              <option value="iarna">Iarna</option>
              <option value="weekend">Weekend</option>
              <option value="nocturna">Nocturna</option>
            </select>
          </div>
          <div className="form-line">
            <label>Value*</label>
            <input
              type={"number"}
              placeholder="Value"
              onChange={(value) => onTariffChange(value)}
              value={tariff}
            />
          </div>
          <div className="form-line">
            <label>Location*</label>
            <select value={location} onChange={onLocationChange}>
              <option value="">Select a location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.address}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-submit">
          <p>You need to complete all the fields marked with *</p>
          <p>
            Note: Please enter the default price for the location first.
            Additional tariffs based on the criterion will be added to the
            default price.
          </p>
          {addSuccessfully && <p>Tariff added successfully</p>}
          <button
            className="btn"
            onClick={onFinish}
            disabled={!(criterion && tariff && location)}
          >
            Add
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TariffForm;
