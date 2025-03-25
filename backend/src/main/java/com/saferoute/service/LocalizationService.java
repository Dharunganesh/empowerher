package com.saferoute.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Locale;

@Service
public class LocalizationService {
    private final Map<String, Map<String, String>> messages;

    public LocalizationService() {
        messages = new HashMap<>();
        
        // English messages
        Map<String, String> enMessages = new HashMap<>();
        enMessages.put("welcome", "Welcome to SafeRoute");
        enMessages.put("error.not.found", "Resource not found");
        enMessages.put("error.unauthorized", "Unauthorized access");
        enMessages.put("error.forbidden", "Access forbidden");
        enMessages.put("error.bad.request", "Bad request");
        enMessages.put("success", "Operation completed successfully");
        messages.put("en", enMessages);

        // Spanish messages
        Map<String, String> esMessages = new HashMap<>();
        esMessages.put("welcome", "Bienvenido a SafeRoute");
        esMessages.put("error.not.found", "Recurso no encontrado");
        esMessages.put("error.unauthorized", "Acceso no autorizado");
        esMessages.put("error.forbidden", "Acceso prohibido");
        esMessages.put("error.bad.request", "Solicitud incorrecta");
        esMessages.put("success", "Operación completada con éxito");
        messages.put("es", esMessages);
    }

    public String getMessage(String key, String language) {
        Map<String, String> languageMessages = messages.getOrDefault(language, messages.get("en"));
        return languageMessages.getOrDefault(key, messages.get("en").get(key));
    }

    public boolean isLanguageSupported(String language) {
        return messages.containsKey(language);
    }
} 
