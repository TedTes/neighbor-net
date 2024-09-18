package com.example.searchservice.controller;

import com.example.searchservice.model.SearchItem;
import com.example.searchservice.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/{query}")
    public List<SearchItem> search(@PathVariable String query) {
        return searchService.search(query);
    }
}
