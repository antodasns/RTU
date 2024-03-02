import React, { useEffect, useState } from 'react';
import TaskService from '../services/TaskService';
import TaskAddPage from './TaskAddPage';
import InformationPage from './InformationPage';
import { useUser } from './UserContext';

const FileStatusListingPage = () => {
  const { user } = useUser();

  const [infoId, setInfoId] = useState();

  const [data, setData] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openInfoPopup = (id) => {
    setInfoId(id);
    setIsInfoPopupOpen(true);
  };

  const closeInfoPopup = () => {
    setIsInfoPopupOpen(false);
  };

  useEffect(() => {
    TaskService.getFilesByUser(user.username)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">File Listing Page</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={openPopup}>
         Add Task
        </button>
      </div>

      {/* Render the modal if isPopupOpen is true */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center">
          <TaskAddPage onClose={closePopup} />
        </div>
      )}

    {isInfoPopupOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center">
          <InformationPage onClose={closeInfoPopup} id={infoId}/>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Current Flow</th>
            <th className="py-2 px-4 border-b">Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b"onClick={() => openInfoPopup(item.id)}>{item.taskName}</td>
              <td className="py-2 px-4 border-b">Task Flow</td>
              <td className="py-2 px-4 border-b">Task</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileStatusListingPage;
