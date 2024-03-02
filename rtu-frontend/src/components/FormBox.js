import React from "react";
import SelectField from "./SelectField";

const FormBox = (props) => {

  const options = [
    { value: "master", label: "master" },
    { value: "developer", label: "developer" },
    { value: "tester", label: "tester" },
  ];
  return (
    <div  className="bg-white p-4 rounded-md max-w-md mx-auto shadow-lg border-b mt-10">
      <div className="px-8 py-8">
        <SelectField label="Type" name="type" id="typeid" width="w-50" options={options}/>
      </div>
    </div>
  );
};

export default FormBox;
