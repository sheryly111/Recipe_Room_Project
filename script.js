/* 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
    1. Shorten and make code more compact
    2. Make it so that not every field has to be filled in order for filter to work 
        - Perhaps with if else statements? 
    3. CHECKS if there are any recipes at all 
        - Check if the length of the json result is less than 1 
    4. When you press the submit button, you should clear the results (incase your new recipe doesn't exist)
        - innerHTML = " " 
        - cuisine.value = " " to reset the values of the fields
        - get the input fields' ID's to ___.innerHTML = " " to show the empty fields  
    5. Make sure it supports multiple options in the search fields 
    6. Reformat the results 
    7. MAKE IT PRETTIER ITS SO UGLY BYE
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

    /* ------------ CHECK IF A RESULT EXISTS ------------ */
    let filter_result = document.querySelector('#filter-result');
    if (all_json.results.length == 0){
        filter_result.innerHTML = `<h3> Sorry we couldn't find a recipe for you`;
    }else{

        /* ------------ FILTERING PROCESS ------------ */
        //Choose a random recipe's ID 
        let random_recipe = all_json.results[getRandomInt(all_json.results.length)].id;

        //Get the info for that recipe 
        let filtered_recipe = `https://api.spoonacular.com/recipes/${random_recipe}/information?apiKey=${key}`;
        const filtered_response = await fetch(filtered_recipe);
        const filtered_json = await filtered_response.json(); 
        console.log(filtered_json); 

        /* ------------ DISPLAYING RESULT ------------ */

        //Gather the info. needed for the brief description
        let recipe_name = filtered_json.title; 
        let recipe_description = filtered_json.summary;
        let recipe_photo = filtered_json.image; 
        let recipe_diets_raw = filtered_json.diets;
        let recipe_time = filtered_json.readyInMinutes; 
        let recipe_servings = filtered_json.servings; 
        let recipe_ingredients_raw = filtered_json.extendedIngredients; 
        let recipe_instructions_raw = filtered_json.analyzedInstructions[0].steps; 

        //Cleaning up data 
        //Diets: 
        let recipe_diets = "";
        for (i = 0 ; i < recipe_diets_raw.length-1; i ++){
            recipe_diets += recipe_diets_raw[i] + ", "; 
        };
        recipe_diets += recipe_diets_raw[recipe_diets_raw.length-1];

        //Ingredients 
        let recipe_ingredients = ``;
        for (i = 0 ; i < recipe_ingredients_raw.length; i ++){
            recipe_ingredients += `<li> ${recipe_ingredients_raw[i].original} </li> `;
        };

        //Instructions
        let recipe_instructions = ``; 
        for (i = 0; i < recipe_instructions_raw.length; i++){
            recipe_instructions += `<li> ${recipe_instructions_raw[i].step} </li>`
        };


        //Inner HTML to Display Info. 
        filter_result.innerHTML = 
        `
        <div class = "container">
            <div class = "row">
                <div class = "brief-description col"> 
                    <h2> ${recipe_name} </h2> 
                    <h3> Diets: ${recipe_diets} </h3> 
                    <h3> Time: ${recipe_time} minutes </h3> 
                    <h3> Servings: ${recipe_servings} </h3> 
                    <p> ${recipe_description} </p> 
                </div>
                <div class = "recipe-photo col">
                    <img src = ${recipe_photo}>
                </div>
            </div> 
        </div>
        <div class = "recipe-ingredients"> 
            <h3> Ingredients Needed: </h3> 
            <ul>
                ${recipe_ingredients}
            </ul>
        </div> 
        <div class = "recipe-instructions">
            <h3> Instructions </h3> 
            <ol>
                ${recipe_instructions}
            </ol>
        </div> 
        `
    }
});
