/* ------------ HELPER FUNCTIONS ------------ */
//Generate a Random Int. 
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

/* ------------ FORM QUERYING ------------ */
const cuisine_input = document.querySelector('#cuisine-input');
const allergies_input = document.querySelector('#allergies-input');
const diet_input = document.querySelector('#diet-input');
const ingredients_input = document.querySelector('#ingredients-input');

// !!! Shorten and make code more compact? !!! 
//Get the information from the forms 
cuisine_input.addEventListener("change", (e) => {
    let cuisine_result = event.target.value.toLowerCase();
    cuisine = cuisine_result;
});

allergies_input.addEventListener("change", (e) => {
    let allergies_result = event.target.value.toLowerCase();
    allergies = allergies_result;
});

diet_input.addEventListener("change", (e) => {
    let diet_result = event.target.value.toLowerCase();
    diet = diet_result;
});

ingredients_input.addEventListener("change", (e) => {
    let ingredients_result = event.target.value.toLowerCase();
    ingredients = ingredients_result;
});

/* ------------ SUBMISSION BUTTON ------------ */
submitButton.addEventListener("click", async (e) => {
    /* ------------ API FETCHING ------------ */
    //API KEY
    let key = "d19a62610b27408ba490042364b04e91";

    //API Query 
    const query = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&cuisine=${cuisine}&intolerences=${allergies}&diet=${diet}&includeIngredients=${ingredients}`;

    //API Array 
    const all_response = await fetch(query);
    const all_json = await all_response.json();
    console.log(all_json);

    /* ------------ FILTERING PROCESS ------------ */
    //Choose a random recipe's ID 
    let random_recipe = all_json.results[getRandomInt(all_json.results.length)].id;

    //Get the info for that recipe 
    let filtered_recipe = `https://api.spoonacular.com/recipes/${random_recipe}/information?apiKey=${key}`;
    const filtered_response = await fetch(filtered_recipe);
    const filtered_json = await filtered_response.json(); 
    console.log(filtered_json); 
});
