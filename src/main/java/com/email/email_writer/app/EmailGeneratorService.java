package com.email.email_writer.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.Objects;

@Service
public class EmailGeneratorService {

    private final WebClient webclient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApikey;

    public EmailGeneratorService(WebClient webclient) {
        this.webclient = webclient;
    }

    public String GenerateEmailReply(EmailRequest emailRequest){
        //build prompt
        String prompt = BuildPrompt(emailRequest);
        //craft prompt
        Map<String, Object> requestBody = Map.of("input",prompt);
        //get request and response
        String response = webclient.post().uri(geminiApiUrl + geminiApikey)
                .header("Content-Type","application/json")
                .retrieve()
                .bodyToMono(String.class)
                .block();

    }
    private String BuildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content.Please Don't generate a subject line ");
        if((emailRequest.getTone() != null) && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone");
        }
        prompt.append("\nOriginal email: \n").append(emailRequest.getContent());
        return prompt.toString();
    }
}
