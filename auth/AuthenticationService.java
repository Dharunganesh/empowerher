package com.saferoute.security.auth;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    
    public AuthResult authenticate(String username, String password) {
        // Authentication logic
    }
    
    public AuthResult register(UserRegistrationDTO registrationDTO) {
        // Registration logic
    }
    
    public void logout(String token) {
        // Logout logic
    }
} 