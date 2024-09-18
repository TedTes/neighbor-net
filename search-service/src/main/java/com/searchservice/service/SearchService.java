package com.example.searchservice.service;

import com.example.searchservice.model.SearchItem;
import com.example.searchservice.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    @Autowired
    private SearchRepository searchRepository;

    public List<SearchItem> search(String query) {
        return searchRepository.findByName(query);
    }
}
