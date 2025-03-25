package com.saferoute.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController implements HealthIndicator {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Autowired
    private DataSource dataSource;
    
    @Value("${spring.datasource.url}")
    private String dbUrl;
    
    @Override
    public Health health() {
        Map<String, Object> details = new HashMap<>();
        details.put("database_url", dbUrl);
        
        try {
            // Check database connection
            try (Connection conn = dataSource.getConnection()) {
                details.put("database_connected", true);
                details.put("database_product", conn.getMetaData().getDatabaseProductName());
                details.put("database_version", conn.getMetaData().getDatabaseProductVersion());
            }
            
            // Test query
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            
            return Health.up()
                    .withDetails(details)
                    .withDetail("timestamp", System.currentTimeMillis())
                    .build();
        } catch (Exception e) {
            details.put("database_connected", false);
            details.put("error", e.getMessage());
            details.put("error_type", e.getClass().getSimpleName());
            return Health.down()
                    .withDetails(details)
                    .withException(e)
                    .build();
        }
    }
    
    @GetMapping("/health")
    public Map<String, Object> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("database_url", dbUrl);
        
        try {
            // Check database connection
            try (Connection conn = dataSource.getConnection()) {
                response.put("database_connected", true);
                response.put("database_product", conn.getMetaData().getDatabaseProductName());
                response.put("database_version", conn.getMetaData().getDatabaseProductVersion());
            }
            
            // Test query
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            
            response.put("status", "UP");
            response.put("timestamp", System.currentTimeMillis());
        } catch (Exception e) {
            response.put("status", "DOWN");
            response.put("database_connected", false);
            response.put("error", e.getMessage());
            response.put("error_type", e.getClass().getSimpleName());
        }
        return response;
    }
} 