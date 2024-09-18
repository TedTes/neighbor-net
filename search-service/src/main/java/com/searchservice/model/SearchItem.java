package com.example.searchservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "items")
public class SearchItem {

    @Id
    private String id;
    private String name;
    private String description;

    // Getters and Setters
}
