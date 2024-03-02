import React from "react";

const ButtonField = (props) => {

  let content;

  if (props.type === 'save') {
    content = "rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6";
  } else if (props.type === 'close') {
    content = "rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6";;
  } else if (props.type === 'submit') {
    content = "rounded text-white font-semibold bg-blue-400 hover:bg-blue-700 py-2 px-6";;
  } else {
    content = "rounded text-white font-semibold bg-gray-400 hover:bg-gray-700 py-2 px-6";;
  }
  const displayNone = props.hide==="true" ? { display: "none" } : {};
  return (
    <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4" style={displayNone}>
      <button
        onClick={props.buttonfunction}
        className= {content}
        id={props.id}
      >
        {props.value}
      </button>
    </div>
  );
};

export default ButtonField;
