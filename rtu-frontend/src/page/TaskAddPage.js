import React, { useEffect,useState } from "react";
import TextField from "../components/TextField";
import TaskService from "../services/TaskService";
import ButtonField from "../components/ButtonField";
import DateField from "../components/DateField";
import SelectField from "../components/SelectField";

const TaskAddPage = (props) => {
  const options = [
    { value: "master", label: "master" },
    { value: "developer", label: "developer" },
    { value: "tester", label: "tester" },
  ];
 
  const [task, setTask] = useState({
    id: "",
    taskName: "",
    completionDate: "",
    assignDate: "",
    assignTo: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setTask({ ...task, [e.target.name]: value });
  };

  const saveTask = (e) => {
    e.preventDefault();
    TaskService.saveTask(task)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    props.onClose();
  };

  const [hide, setHide] = useState("");

  useEffect(() => {
    if (props.mode === "READ") {
      setHide("true");
      console.log(props.task.assignDate);
      
      setTask(props.task);
    }
  }, [props.mode, props.task]);
  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add Task</h1>
        </div>
        <TextField label="TaskName" name="taskName" id="taskNameid" value={task.taskName} mode={props.mode} fieldfunction={(e) => handleChange(e)}/>
        <DateField label="CompletionDate" name="completionDate" id="completionDateid" value={task.completionDate} mode={props.mode} fieldfunction={(e) => handleChange(e)}/>
        <DateField label="AssignDate" name="assignDate" id="assignDateid" value={task.assignDate} mode={props.mode} fieldfunction={(e) => handleChange(e)}/>
        <SelectField label="AssignTo" name="assignTo" id="assignToid" hide={hide} mode={props.mode} width="w-50" value={task.assignTo || ''} options={options} fieldfunction={(e) => handleChange(e)}/>
        <div className="flex">
        <ButtonField id="saveId" value="Save" hide={hide} buttonfunction={saveTask} type="save"/>
        <ButtonField id="CloseId" value="Close" hide={hide} buttonfunction={props.onClose} type="close"/>
        </div>
      </div>
    </div>
  );
};

export default TaskAddPage;
