package com.application.rtu.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.application.rtu.entity.FlowEntity;
import com.application.rtu.entity.TaskEntity;
import com.application.rtu.model.File;
import com.application.rtu.model.Flow;
import com.application.rtu.model.Task;
import com.application.rtu.repository.FlowRepository;
import com.application.rtu.repository.TaskRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service	
public class RtuServiceImpl implements RtuService{
	
	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private FlowRepository flowRepository;
	
	@Override
	public Task createTask(Task task) {
		
		TaskEntity taskEntity=new TaskEntity();
		
		BeanUtils.copyProperties(task, taskEntity);
		
		taskRepository.save(taskEntity); 
		
		return task;
		
	}

	@Override
	public Flow createFlow(Flow flow) {
		
		FlowEntity flowEntity=new FlowEntity();
		
		BeanUtils.copyProperties(flow, flowEntity);
		
		flowRepository.save(flowEntity); 
		
		return flow;
	}

	@Override
	public String getFlow(String flowId) {
		
		FlowEntity flowEntity=flowRepository.findFirstByOrderByIdDesc();
		
		return flowEntity.getFlowJson();
	}

	@Override
	public List<File> getFiles() {
		// TODO Auto-generated method stub
		File file1=new File();
		File file2=new File();
		File file3=new File();
		
		file1.setId(1);
		file1.setName("file11111111");
		file1.setCurrentFlow("user1");
		file1.setType("task");
		
		file1.setId(2);
		file2.setName("file22222222222");
		file2.setCurrentFlow("user2");
		file2.setType("task");
		
		file1.setId(3);
		file3.setName("file333333");
		file3.setCurrentFlow("user3");
		file3.setType("task");
		
		List<File> fileList=new ArrayList<>();
		fileList.add(file1);
		fileList.add(file2);
		fileList.add(file3);
		
		
		return fileList;
	}

	@Override
	public Task getLatestFile() {
		
		Task task= new Task();
		
		BeanUtils.copyProperties(task, taskRepository.findAll().get(0));
		
		return task;
	}

	@Override
	public List<Task> getFilesByUser(String username) {
		
		List<Task>taskList= taskRepository.findByAssignTo(username).stream()
				.filter(task -> !task.getCompleted())
        .map(sourceEntity -> {
        	Task destinationEntity = new Task();
            BeanUtils.copyProperties(sourceEntity, destinationEntity);
            return destinationEntity;
        })
        .collect(Collectors.toList());

		return taskList;
	}

	@Override
	public Task getFile(String fileId) {
		
		Long taskId=Long.parseLong(fileId);
		
		Task task= new Task();
		
		BeanUtils.copyProperties(taskRepository.findById(taskId).get(),task);
		
		return task;
	}

	@Override
	public Task forward(String fileId) {
		
		FlowEntity flowEntity=flowRepository.findFirstByOrderByIdDesc();
		
		String json=flowEntity.getFlowJson();
		
		Long taskId=Long.parseLong(fileId);
		
		TaskEntity task= new TaskEntity();
		
		task=taskRepository.findById(taskId).get();
		
		int state=Integer.parseInt(task.getState());
		
		int newState=state+1;
		
		task.setState(String.valueOf(newState));
		
		ObjectMapper objectMapper = new ObjectMapper();
        try {
			Map<String, String> dynamicObject = objectMapper.readValue(json, Map.class);
			
			int count=0;
			
			 for(int i = 1; i < dynamicObject.size()+1; i++) {
				 
				 if(i%2==0) {
				 
					 count=count+1;
					 
					 if(count==newState) {
						 
						 String sectionForward = dynamicObject.get("section"+count+"_forward");
						 
					     String sectionReturn = dynamicObject.get("section"+count+"_return");
					     
					     task.setAssignTo(sectionForward);
						 
					 }
				 
				 }
				 
				 if((newState*2)==dynamicObject.size()) {
					 
					 task.setCompleted(true);
					 
				 }
				 
			 }
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
        taskRepository.save(task);
		
		return null;
	}

}