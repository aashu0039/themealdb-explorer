const backendUrl = "http://localhost:8080/api/meals";


function searchMeal() {
    const name = document.getElementById("searchInput").value;
    fetch(`${backendUrl}/search?name=${name}`)
        .then(res => res.json())
        .then(data => showMeals(data.meals));
}


function randomMeal() {
    fetch(`${backendUrl}/random`)
        .then(res => res.json())
        .then(data => showMeals([data.meals[0]]));
}


function showMeals(meals) {
    const div = document.getElementById("meals");
    div.innerHTML = "";

    if (!meals) {
        div.innerHTML = "<p>No meals found 😢</p>";
        return;
    }

    meals.forEach(meal => {
        div.innerHTML += `
            <div class="card" onclick='openModal(${JSON.stringify(meal)})'>
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strCategory} | ${meal.strArea}</p>
            </div>
        `;
    });
}


function openModal(meal) {
    document.getElementById("mealModal").style.display = "block";

    document.getElementById("modalImg").src = meal.strMealThumb;
    document.getElementById("modalTitle").innerText = meal.strMeal;
    document.getElementById("modalCategory").innerText = "Category: " + meal.strCategory;
    document.getElementById("modalArea").innerText = "Area: " + meal.strArea;
    document.getElementById("modalInstructions").innerText = meal.strInstructions;
    document.getElementById("modalYoutube").href = meal.strYoutube;

    const ul = document.getElementById("modalIngredients");
    ul.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const qty = meal[`strMeasure${i}`];
        if (ing && ing.trim() !== "") {
            const li = document.createElement("li");
            li.innerText = `${ing} - ${qty}`;
            ul.appendChild(li);
        }
    }
}

function closeModal() {
    document.getElementById("mealModal").style.display = "none";
}


function loadCategories() {
    fetch(`${backendUrl}/categories`)
        .then(res => res.json())
        .then(data => {
            const div = document.getElementById("categories");
            data.categories.forEach(cat => {
                div.innerHTML += `
                    <div class="card">
                        <img src="${cat.strCategoryThumb}">
                        <h3>${cat.strCategory}</h3>
                    </div>
                `;
            });
        });
}

window.onload = loadCategories;
