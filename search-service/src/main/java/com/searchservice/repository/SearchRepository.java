package com.example.searchservice.repository;

import com.example.searchservice.model.SearchItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchRepository extends ElasticsearchRepository<SearchItem, String> {
    List<SearchItem> findByName(String name);
}
