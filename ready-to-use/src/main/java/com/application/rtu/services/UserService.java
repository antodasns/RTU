package com.application.rtu.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.application.rtu.entity.User;

public interface UserService {
	
	User getUser(Long id);
    User getUser(String username);
    User saveUser(User user);
}
