import React, { useEffect, useState ,Component } from 'react';
import TaskService from "../services/TaskService";
import ButtonField from '../components/ButtonField';
import TaskAddPage from './TaskAddPage';
import { useAuth } from '../context/AuthContext';

const InformationPage = (props) => {
  const Auth = useAuth()
  const user = Auth.getUser()

  const [data, setData] = useState([]);

  const [task, setTask] = useState({
    id: "",
    taskName: "",
    completionDate: "",
    assignDate: "",
    assignTo: "",
  });

  useEffect(() => {
    TaskService.getFlow(1,user)
      .then((response) => {
        var map = new Map(Object.entries(response.data))
        setData(map);
      })
      .catch((error) => {
        console.log(error);
      });

      TaskService.getFile(props.id,user)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formward=()=>{

    TaskService.forward(props.id,user)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

    props.onClose();

  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center p-4" style={{margin: "-200px 0px 0px 0px"}}>
      {Array.from(data).map(([key, value]) => (
        <div key={key}>
          {key.endsWith('_forward') && (
            <BoxWithArrow>{value}</BoxWithArrow>
          )}
        </div>
      ))}
      </div>

      <div className="p-4">
            <TaskAddPage mode="READ" task={task}/>
          <div className="flex mt-4 md:gap-4">
            {/* <ButtonField id="saveId" value="Approve"  type="submit"/> */}
            <ButtonField id="saveId" value="Forward" buttonfunction ={formward} type="save"/>
            <ButtonField id="saveId" value="Return"   type="grey"/>
            <ButtonField id="CloseId" value="Close" buttonfunction={props.onClose} type="close"/>
          </div>
      </div>
    </div>
  );
};

// Styles for individual elliptical boxes with arrows
const boxWithArrowStyles = "flex items-center";

// Styles for individual elliptical boxes
const ellipseBoxStyles =
  "w-20 h-10 rounded-full bg-blue-500 flex justify-center items-center text-white";

// CSS class for the arrow
const arrowStyles = "h-2 w-10 bg-blue-500";

// Arrow component
const Arrow = () => <div className={arrowStyles}></div>;

// Box component with arrow
const BoxWithArrow = ({ children }) => (
  <div className={boxWithArrowStyles}>
    <div className={ellipseBoxStyles}>{children}</div>
    <Arrow />
  </div>
);

export default InformationPage;
