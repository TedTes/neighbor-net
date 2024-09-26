package com.searchservice.controller;

import com.searchservice.model.SearchResult;
import com.searchservice.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping
    public List<SearchResult> search(@RequestParam String query) {
        try {
          return searchService.search(query);
        } catch(IOException error) {
             error.printStackTrace();
             List<SearchResult> errorResult = new ArrayList<>();
            errorResult.add(new SearchResult("Error", "An error occurred during search: " + error.getMessage()));
            return errorResult;
            
        }
        
    }
}
