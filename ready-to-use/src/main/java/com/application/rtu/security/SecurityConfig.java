package com.application.rtu.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import com.application.rtu.common.SecurityConstants;
import com.application.rtu.security.filter.AuthenticationFilter;
import com.application.rtu.security.filter.ExceptionHandlerFilter;
import com.application.rtu.security.filter.JWTAuthorizationFilter;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class SecurityConfig {

    private final CustomAuthenticationManager customAuthenticationManager;

    @SuppressWarnings("deprecation")
	@Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter(customAuthenticationManager);
        authenticationFilter.setFilterProcessesUrl("/authenticate");
        http
                .headers(headers -> headers.frameOptions().disable())
                .csrf(csrf -> csrf.disable()).cors(cors -> {
                    cors.configurationSource(request -> {
                        CorsConfiguration corsConfig = new CorsConfiguration();
                        corsConfig.addAllowedOrigin("http://localhost:3000");
                        corsConfig.addAllowedHeader("*");
                        corsConfig.addAllowedMethod("*");
                        corsConfig.setAllowCredentials(true);
                        return corsConfig;
                    });
                })
                .authorizeRequests(requests -> requests
                        .requestMatchers(HttpMethod.POST, SecurityConstants.REGISTER_PATH).permitAll()
                        .anyRequest().authenticated()
                        .and()
                        .addFilterBefore(new ExceptionHandlerFilter(), AuthenticationFilter.class)
                        .addFilter(authenticationFilter)
                        .addFilterAfter(new JWTAuthorizationFilter(), AuthenticationFilter.class));
        return http.build();
    }
    
}
