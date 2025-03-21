package com.saferoute.security.model;

import javax.persistence.*;

@Entity
public class EmergencyContact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String phoneNumber;
    private String relationship;
    
    @ManyToOne
    private User user;
    
    // Getters, setters, and other necessary methods
} 