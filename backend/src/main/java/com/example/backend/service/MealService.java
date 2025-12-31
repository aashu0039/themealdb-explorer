package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.cache.annotation.Cacheable;

@Service
public class MealService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Cacheable("meals")
    public Object searchMeal(String name) {
        String url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name;
        return restTemplate.getForObject(url, Object.class);
    }

    @Cacheable("randomMeal")
    public Object getRandomMeal() {
        String url = "https://www.themealdb.com/api/json/v1/1/random.php";
        return restTemplate.getForObject(url, Object.class);
    }

    @Cacheable("categories")
    public Object getCategories() {
        String url = "https://www.themealdb.com/api/json/v1/1/categories.php";
        return restTemplate.getForObject(url, Object.class);
    }
}
