package com.application.rtu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.application.rtu.entity.TaskEntity;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity,Long>{
	
	List<TaskEntity> findByAssignTo(String name);
	
	TaskEntity findFirstByOrderByIdDesc();

}