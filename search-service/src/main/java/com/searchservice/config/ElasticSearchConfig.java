package com.example.searchservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;

@Configuration
public class ElasticsearchConfig {

    @Bean
    public ElasticsearchRestTemplate elasticsearchTemplate() {
        ClientConfiguration clientConfiguration = 
                ClientConfiguration.builder()
                                   .connectedTo("elasticsearch:9200")
                                   .build();

        return new ElasticsearchRestTemplate(RestClients.create(clientConfiguration).rest());
    }
}
