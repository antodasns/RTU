import React from "react";

const TextAreaField = (props) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <label className=" text-gray-600 text-lg font-normal p-3">
        {props.label}
      </label>
      <textarea
        name={props.name}
        id={props.id}
        className="h-24 w-full border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-3002"
      ></textarea>
    </div>
  );
};

export default TextAreaField;
