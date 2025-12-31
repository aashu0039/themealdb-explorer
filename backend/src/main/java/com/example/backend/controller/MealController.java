package com.example.backend.controller;

import com.example.backend.service.MealService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/search")
    public Object search(@RequestParam String name) {
        return mealService.searchMeal(name);
    }

    @GetMapping("/random")
    public Object random() {
        return mealService.getRandomMeal();
    }

    @GetMapping("/categories")
    public Object categories() {
        return mealService.getCategories();
    }
}
