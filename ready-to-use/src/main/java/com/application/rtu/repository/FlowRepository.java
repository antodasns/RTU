package com.application.rtu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.application.rtu.entity.FlowEntity;

@Repository
public interface FlowRepository extends JpaRepository<FlowEntity,Long>{
	
	FlowEntity findFirstByOrderByIdDesc();

}

