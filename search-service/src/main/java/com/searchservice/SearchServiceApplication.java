package com.searchservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SearchServiceApplication {
    public static void main(String[] args) {
        System.out.println("server running on port 3004");
        SpringApplication.run(SearchServiceApplication.class, args);
    }
}
