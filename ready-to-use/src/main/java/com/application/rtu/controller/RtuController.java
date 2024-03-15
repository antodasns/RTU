package com.application.rtu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.rtu.entity.User;
import com.application.rtu.model.File;
import com.application.rtu.model.Flow;
import com.application.rtu.model.Task;
import com.application.rtu.services.RtuService;
import com.application.rtu.services.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/rtu/api")
public class RtuController {
	
	@Autowired
	private RtuService rtuService;
	
	@Autowired
	private UserService userService;;


	@PostMapping("/saveTask")
	public Task createTask(@RequestBody Task task) { 
		
		task.setState("0");
		
		task.setCompleted(false);
		
		return rtuService.createTask(task); 
		
	}
	
	@PostMapping("/saveFlow")
	public Flow createFlow(@RequestBody Object combinedFormData) { 
		
		ObjectMapper mapper = new ObjectMapper();
		
		String json="";
		try {
			
			json = mapper.writeValueAsString( combinedFormData );
			
			Flow flow =new Flow();
			
			flow.setFlowJson(json);
			
			return rtuService.createFlow(flow);
			
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
		
	}
	
	@GetMapping("/getFlow/{flowId}") 
	public String getFlow(@PathVariable("flowId") String flowId) {
		return rtuService.getFlow(flowId); 
	}
	
	@GetMapping("/getFiles") 
	public List<File> getFiles() {
		return rtuService.getFiles();   
	}
	
	@GetMapping("/getLatestFile") 
	public Task getLatestFile() {
		return rtuService.getLatestFile();   
	}
	
	@GetMapping("/getFilesByUser/{username}") 
	public List<Task> getFilesByUser(@PathVariable("username") String username) {
		return rtuService.getFilesByUser(username);   
	}
	
	@GetMapping("/getFile/{fileId}") 
	public Task getFile(@PathVariable("fileId") String fileId) {
		return rtuService.getFile(fileId);   
	}
	
	@GetMapping("/forward/{fileId}") 
	public Task forward(@PathVariable("fileId") String fileId) {
		return rtuService.forward(fileId);   
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<String> findById(@PathVariable Long id) {
		return new ResponseEntity<>(userService.getUser(id).getUsername(), HttpStatus.OK);
	}

    @PostMapping("/user/register")
	public ResponseEntity<HttpStatus> createUser(@RequestBody User user) {
		userService.saveUser(user);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
}
