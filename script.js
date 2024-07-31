/* 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
    1. Shorten and make code more compact
    2. Make it so that not every field has to be filled in order for filter to work 
    3. CHECKS if there are any recipes at all 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
*/

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

    /* ------------ DISPLAYING RESULT ------------ */
    // Brief Description: 
    // Title, Description, Photo, Diets, readyInMinutes, Servings 
    // A button to generate the instructions and ingredients 
    // A button to generate a new reciepe instead 

    //Gather the info. needed for the brief description
    let recipe_name = filtered_json.title; 
    let recipe_description = filtered_json.summary;
    let recipe_photo = filtered_json.image; 
    let recipe_diets_raw = filtered_json.diets;
    let recipe_time = filtered_json.readyInMinutes; 
    let recipe_servings = filtered_json.servings; 

    //Cleaning up data 
    //Diets: 
    let recipe_diets = "";
    for (i = 0 ; i < recipe_diets_raw.length-1; i ++){
        recipe_diets += recipe_diets_raw[i] + ", "; 
    }
    recipe_diets += recipe_diets_raw[recipe_diets_raw.length-1]

    //Inner HTML to Display Info. 
    let filter_result = document.querySelector('#filter-result');
    filter_result.innerHTML = 
    `
    <div class = "container">
        <div class = "row">
            <div class = "brief-description col"> 
                <h2> ${recipe_name} </h2> 
                <h3> Diets: ${recipe_diets} </h3> 
                <h3> Time: ${recipe_time} minutes </h3> 
                <h3> Servings: ${recipe_servings} </h3> 
            </div>
            <div class = "recipe-photo col">
                <img src = ${recipe_photo}>
            </div>
        </div>
    </div>
    <div class = "recipe-description">
        <p> ${recipe_description} </p> 
    </div> 
    `

});
