package com.searchservice.service;

import com.searchservice.model.SearchResult;
import com.searchservice.repository.ElasticsearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.io.IOException;

@Service
public class SearchService {

    @Autowired
    private ElasticsearchRepository elasticsearchRepository;

    public List<SearchResult> search(String query) throws IOException {
        return elasticsearchRepository.searchDocuments("neighbornet-posts","content", query, SearchResult.class);
    }
}
