package com.email.email_writer.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webclient = WebClient.builder().build();

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApikey;


    public String GenerateEmailReply(EmailRequest emailRequest){
        //build prompt
        String prompt = BuildPrompt(emailRequest);
        //craft prompt
        Map<String, Object> requestBody = Map.of("model", "gemini-3.5-flash",
                "input",prompt);
        //get request and response
        String response = webclient.post().uri(geminiApiUrl + geminiApikey)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        System.out.println(extractResponseContent(response));
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("steps")
                    .get(1)
                    .path("content")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e){
            return "Error processing request: " + e.getMessage();
        }
    }

    private String BuildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content.Please Don't generate a subject line ");
        if((emailRequest.getTone() != null) && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone");
        }
        prompt.append("\nOriginal email: \n").append(emailRequest.getContent());
        System.out.println(prompt);
        return prompt.toString();
    }
}
