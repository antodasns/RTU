package com.application.rtu.model;

import lombok.Data;

@Data
public class Flow {
	
	private long id;
	private String flowJson;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFlowJson() {
		return flowJson;
	}
	public void setFlowJson(String flowJson) {
		this.flowJson = flowJson;
	}
	
	
	

}
