import React from "react";

const TextField = (props) => {
  let readOnly = false;
  if (props.mode === "READ") {
    readOnly = true;
  }

  const displayNone = props.hide==="true" ? { display: "none" } : {};

  return (
    <div className="items-center justify-center h-14 w-full my-4" style={displayNone}>
      <label className="text-gray-600 text-lg font-normal p-3">
        {props.label}
      </label>
      <input
        type="text"
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.fieldfunction} 
        className="h-10 w-96 border mt-2 px-2 py-2"
        readOnly={readOnly} 
      />
    </div>
  );
};

export default TextField;
