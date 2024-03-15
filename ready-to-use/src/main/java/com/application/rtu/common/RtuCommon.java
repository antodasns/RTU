package com.application.rtu.common;

import java.util.Base64;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class RtuCommon {
	
	public static String bCryptPasswordEncoder(String str) {
		
		BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
		
		return bcrypt.encode(str);
		
	}
	
	public static String b64Encode(String str) {
		
		byte[] encodedBytes = Base64.getEncoder().encode(str.getBytes());
		
		return new String(encodedBytes);
		
	}
	
	public static String b64Decode(String str) {
		
		byte[] decodedBytes = Base64.getDecoder().decode(str);
		
		return new String(new String(decodedBytes));
		
	}

}
