package com.application.rtu.services;

import java.util.List;

import com.application.rtu.model.File;
import com.application.rtu.model.Flow;
import com.application.rtu.model.Task;

public interface RtuService {

	Task createTask(Task task);
	
	Flow createFlow(Flow flow);

	String getFlow(String flowId);

	List<File> getFiles();

	Task getLatestFile();

	List<Task> getFilesByUser(String username);

	Task getFile(String fileId);

	Task forward(String fileId);

}
