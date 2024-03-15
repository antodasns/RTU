import React from "react";
import SelectField from "./SelectField";

const FlowBox = ({ formData, handleInputChange }) => {

  const handleSelectChange = (fieldName, e) => {
    // Assuming you have a function to handle changes in your parent component
    handleInputChange(fieldName, e.target.value);
  };

  const options = [
    { value: "Master", label: "Master" },
    { value: "Developer", label: "Developer" },
    { value: "Tester", label: "Tester" },
  ];
  return (
    <div  className="bg-white p-4 rounded-md max-w-md mx-auto shadow-lg border-b mt-10">
      <div className="px-8 py-8">
        <SelectField label="Forward" name="forward" id='forwardid' width="w-50" type="flow" options={options} fieldfunction={(value) => handleInputChange('forward', value)} value={formData.forward || ''}/>
        <SelectField label="Return" name="return" id='returnid' width="w-50" type="flow" options={options} fieldfunction={(value) => handleInputChange('return', value)} value={formData.return || ''}/>
      </div>
    </div>
  );
};

export default FlowBox;
