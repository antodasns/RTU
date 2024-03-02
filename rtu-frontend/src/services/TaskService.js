import axios from "axios";

const TASK_API_BASE_URL="http://localhost:8080/rtu/api"

class TaskService{

    saveTask(task){
        return axios.post(TASK_API_BASE_URL+"/saveTask",task)
    }

    saveFlow(flow){

        console.log(flow);
        return axios.post(TASK_API_BASE_URL+"/saveFlow", flow, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    }

    getFlow(flowId){

      return axios.get(TASK_API_BASE_URL+"/getFlow/"+flowId)

    }

    getFiles(){

      return axios.get(TASK_API_BASE_URL+"/getFiles")

    }

    getFilesByUser(username){

      return axios.get(TASK_API_BASE_URL+"/getFilesByUser/"+username)

    }

    getFile(fileId){

      return axios.get(TASK_API_BASE_URL+"/getFile/"+fileId)

    }

    forward(fileId){

      return axios.get(TASK_API_BASE_URL+"/forward/"+fileId)

    }

}

export default new TaskService();