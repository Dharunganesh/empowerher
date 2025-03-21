package com.saferoute;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SafeRouteApplication {
    public static void main(String[] args) {
        SpringApplication.run(SafeRouteApplication.class, args);
    }
} 