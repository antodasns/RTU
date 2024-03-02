import React from "react"

const SelectField = (props) =>{

    let readOnly = false;
  if (props.mode === "READ") {
    readOnly = true;
  }
  const displayNone = props.hide==="true" ? { display: "none" } : {};

return(
    <div className="items-center justify-center h-14 w-full my-4" style={displayNone}>
    <label className=" text-gray-600 text-lg font-normal p-3">
    {props.label}
    </label>
    {props.type == 'flow'? 
    <select  name={props.name} id={props.id} className={'h-10 ' +props.width+ ' border mt-2 px-2 py-2'}  readOnly={readOnly} onChange={(e) => props.fieldfunction(e.target.value)}>
    <option value="">Select an option</option>
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
    </select>
     : 
     <select name={props.name} id={props.id} className={'h-10 ' + props.width + ' border mt-2 px-2 py-2'}  readOnly={readOnly} onChange={(e) => props.fieldfunction(e)} value={props.value}>
     <option value="">Select an option</option>
             {props.options.map((option) => (
                 <option key={option.value} value={option.value}>
                 {option.label}
                 </option>
             ))}
     </select>
     }
    </div>
    )
}

export default SelectField;