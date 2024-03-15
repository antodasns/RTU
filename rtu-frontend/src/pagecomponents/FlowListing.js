import React, { useState } from "react";
import FlowBox from '../components/FlowBox';
import axios from 'axios';
import ButtonField from "../components/ButtonField";
import TaskService from "../services/TaskService";
import CircularJSON from 'circular-json';
import { useAuth } from '../context/AuthContext';


const FlowListing = () => {

  const Auth = useAuth()
  const user = Auth.getUser()

  const [formDataArray, setFormDataArray] = useState([]);

  const handleInputChange = (sectionIndex, fieldName, value) => {
    setFormDataArray((prevData) => {
      const newData = [...prevData];
      newData[sectionIndex] = { ...newData[sectionIndex], [fieldName]: value };
      return newData;
    });
  };

  const handleAddSection = () => {
    setFormDataArray((prevData) => [...prevData, {}]);
  };

  const handleSubmit = () => {
    // Combine data from all sections
    const combinedFormData = formDataArray.reduce((acc, sectionData, index) => {
      const sectionKeyPrefix = `section${index + 1}`;
      Object.keys(sectionData).forEach((field) => {
        const key = `${sectionKeyPrefix}_${field}`;
        const value = sectionData[field];
        acc[key] = value;
        console.log(value);
      });
      return acc;
    }, {});

    const flow = CircularJSON.stringify(combinedFormData);

    TaskService.saveFlow(flow,user)
      .then((response) => {
        
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div >
    <h1 className="text-3xl font-bold mb-4">Configure User Flow</h1>
      {formDataArray.map((formData, index) => (
        <div key={index}>
          <h2>Flow {index + 1}</h2>
          <FlowBox
            formData={formData}
            handleInputChange={(fieldName, value) => handleInputChange(index, fieldName, value)}
          />
        </div>
      ))}
      <button onClick={handleAddSection}>
        <svg class="h-8 w-8 text-red-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
      </button>
      <ButtonField id="saveId" value="Save" buttonfunction={handleSubmit}/>
    </div>
  );
};

export default FlowListing;
