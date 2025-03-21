package com.saferoute.security.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    
    @OneToMany
    private List<EmergencyContact> emergencyContacts;
    
    // Getters, setters, and other necessary methods
} 