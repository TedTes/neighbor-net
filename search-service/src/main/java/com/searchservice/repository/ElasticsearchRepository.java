package com.searchservice.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ElasticsearchRepository {

    private final ElasticsearchClient elasticsearchClient;

    @Autowired
    public ElasticsearchRepository(ElasticsearchClient elasticsearchClient) {
        this.elasticsearchClient = elasticsearchClient;
    }

    public <T> List<T> searchDocuments(String index, String field, String value, Class<T> documentClass) throws IOException {
        SearchRequest searchRequest = SearchRequest.of(s -> s
                .index(index)
                .query(q -> q
                        .match(m -> m
                                .field(field)
                                .query(value)
                        )
                )
        );

        SearchResponse<T> searchResponse = elasticsearchClient.search(searchRequest, documentClass);

        List<T> documents = new ArrayList<>();
        for (Hit<T> hit : searchResponse.hits().hits()) {
            documents.add(hit.source());
        }
        return documents;
    }
}
