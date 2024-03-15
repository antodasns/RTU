import axios from "axios";
import { parseJwt } from '../misc/Helpers'

const TASK_API_BASE_URL="http://localhost:8080"

const instance = axios.create({
  baseURL: TASK_API_BASE_URL
})

instance.interceptors.request.use(function (config) {
  // If token is expired, redirect user to login
  if (config.headers.Authorization) {
    const token = config.headers.Authorization.split(' ')[1]
    const data = parseJwt(token)
    if (Date.now() > data.exp * 1000) {
      window.location.href = "/login"
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})


function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}

class TaskService{

   authenticate(username, password) {

    return instance.post('/authenticate', {username,password}, {
      headers: { 'Content-type': 'application/json' }
    })
  }

    saveTask(task,user){

      return instance.post('/rtu/api/saveTask', task, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': bearerAuth(user)
        }
      })

    }

    saveFlow(flow,user){

      return instance.post('/rtu/api/saveFlow', flow, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': bearerAuth(user)
        }
      })
       
    }

    getFlow(flowId,user){

      const url = "/rtu/api/getFlow/"+flowId
      return instance.get(url, {
        headers: { 'Authorization': bearerAuth(user) }
      })

    }

    getFiles(user){

      const url = "/rtu/api/getFiles"
      return instance.get(url, {
        headers: { 'Authorization': bearerAuth(user) }
      })

    }

    getFilesByUser(username,user){

      const url = "/rtu/api/getFilesByUser/"+username
      return instance.get(url, {
        headers: { 'Authorization': bearerAuth(user) }
      })

    }

    getFile(fileId,user){

      const url = "/rtu/api/getFile/"+fileId
      return instance.get(url, {
        headers: { 'Authorization': bearerAuth(user) }
      })

    }

    forward(fileId,user){

      const url = "/rtu/api/forward/"+fileId
      return instance.get(url, {
        headers: { 'Authorization': bearerAuth(user) }
      })

    }

}

export default new TaskService();