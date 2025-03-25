package com.saferoute.controller;

import com.saferoute.model.ApiResponse;
import com.saferoute.service.LocalizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

public class BaseController {
    
    @Autowired
    protected LocalizationService localizationService;

    protected ResponseEntity<ApiResponse<?>> successResponse(Object data, String messageKey, String language) {
        String message = localizationService.getMessage(messageKey, language);
        return ResponseEntity.ok(ApiResponse.success(data, message, language));
    }

    protected ResponseEntity<ApiResponse<?>> errorResponse(String messageKey, String language) {
        String message = localizationService.getMessage(messageKey, language);
        return ResponseEntity.badRequest().body(ApiResponse.error(message, language));
    }

    protected ResponseEntity<ApiResponse<?>> notFoundResponse(String language) {
        return errorResponse("error.not.found", language);
    }

    protected ResponseEntity<ApiResponse<?>> unauthorizedResponse(String language) {
        return errorResponse("error.unauthorized", language);
    }

    protected ResponseEntity<ApiResponse<?>> forbiddenResponse(String language) {
        return errorResponse("error.forbidden", language);
    }

    protected ResponseEntity<ApiResponse<?>> badRequestResponse(String language) {
        return errorResponse("error.bad.request", language);
    }
} 
