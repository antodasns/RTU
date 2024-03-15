package com.application.rtu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.application.rtu.entity.TaskEntity;
import com.application.rtu.entity.User;

public interface UserRepository extends JpaRepository<User,Long>{
	
	Optional<User> findByUsername(String name);

}
