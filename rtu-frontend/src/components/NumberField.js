import React from "react"

const NumberField = (props) =>{
return(
    <div className="items-center justify-center h-14 w-full my-4">
      <label className=" text-gray-600 text-lg font-normal p-3">
        {props.label}
      </label>
      <input type="number" name={props.name} id={props.id} className="h-10 w-96 border mt-2 px-2 py-2"></input>
    </div>
)
}

export default NumberField;