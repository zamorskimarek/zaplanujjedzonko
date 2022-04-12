
//js for navigation

const navDesktop = document.querySelector("#desktop");
const navRecipes = document.querySelector("#recipes");
const navPlans = document.querySelector("#plans");
const appNav = document.querySelectorAll(".app-nav > li");
const allWorkspaceContainer = document.querySelectorAll(".app-workspace__container");
const desktop = document.querySelector("#main-workspace");
const recipesWorkspace = document.querySelector("#recipes-workspace");
const plansWorkspace = document.querySelector("#plans-workspace");
const newRecipeWorkspace = document.querySelector("#new-recipe-workspace");
const newPlanWorkspace = document.querySelector("#new-plan-workspace");


function changeSelect(a){
    switch (a) {
        case 1:
            changeNavigation(navDesktop);
            appVisible(desktop);
            break;
        case 2:
            changeNavigation(navRecipes);
            appVisible(recipesWorkspace);
            break;
        case 3:
            changeNavigation(navPlans);
            appVisible(plansWorkspace);
            break;
    }
}

function changeNavigation(a){
    appNav.forEach(function(element) {
        element.classList.remove("app-navigation__list__item__selected");
        element.children[0].classList.add("hidden");
    });
    a.classList.add("app-navigation__list__item__selected");
    a.children[0].classList.add("app-navigation__icon");
    a.children[0].classList.remove("hidden");
}

function appVisible(workspace){
    allWorkspaceContainer.forEach(function(element) {
        element.classList.add("hidden");
    });
    workspace.classList.remove("hidden");
}


//additional functions to clear instructions and ingredients

const clearInstructions = function() {
    Array.from(listOfInstructions.children).forEach(li => {li.remove()})
}

const clearIngredients = function() {
    Array.from(listOfIngredients.children).forEach(li => {li.remove()})
}

//to jest funkcja z ktorej mozecie korzystac wchodzac na strone dodawania nowego planu

const renderAllInputsInSelects = function () {
    planTableInput.forEach(el => {
        addAllRecipesToInputs (el)
    })
}

//logic to navigate between pages form desktop

const AddRecipe = document.querySelector("#add-recipe"); //Zielone pole przenosi do widoku dodawania nowego przepisu
AddRecipe.addEventListener("click", function() {
    inputRecipeTitle.value = null
    inputRecipeDescription.value = null
    inputRecipeInstructions.value = null
    inputRecipeIngredients.value = null
    clearInstructions()
    clearIngredients()
    appVisible(newRecipeWorkspace);
})

const AddPlan = document.querySelector("#add-plan"); //Zielone pole przenosi do widoku dodawania nowego planu
AddPlan.addEventListener("click", function() {
    inputPlanTitle.value = null
    inputPlanDescription.value = null
    inputWeekNumber.value = null
    clearAllInputsInSelects()
    renderAllInputsInSelects();
    appVisible(newPlanWorkspace)
})



//buttons logic



//VARIABLES

  //variables for login procedure

const loginInput = document.querySelector("#login-input");
const loginForm = document.querySelector("#login-form");
const userNameHolder = document.querySelector("#userName");
const welcomePage = document.querySelector("#login-welcomepage");
const mainWorkspace = document.querySelector("#main-workspace");

  //variables for adding new recipe


const inputRecipeTitle = document.querySelector("#input-recipe-title")
const inputRecipeDescription = document.querySelector("#input-recipe-description")

const saveRecipe = document.querySelector("#save-recipe")

  // variables for adding new instruction and rendering instructions list

const inputRecipeInstructions = document.querySelector("#input-recipe-instructions")
const inputRecipeIngredients = document.querySelector("#input-recipe-ingredients")

const buttonRecipeAddInstruction = document.querySelector("#button-recipe-add-instruction")
const buttonRecipeAddIngredient = document.querySelector("#button-recipe-add-ingredient")

const listOfInstructions = document.querySelector("#list-of-instructions")
const listOfIngredients = document.querySelector("#list-of-ingredients")

    // variables for rendering list of recipes

const recipesListTableBody = document.querySelector("#recipe-list-table-body"); //uchwyt do tablicy z listą przpisów
const plansListTableBody = document.querySelector("#plan-list-table-body"); //uchwyt do tablicy z listą planów


//LOGIC

//logic for login procedure

const formSubmit = function (e) {
    e.preventDefault();
    if (loginInput.value != 0) {
        const userName = loginInput.value;
        userNameHolder.innerText = userName;
        localStorage.setItem("userName", userName);
        welcomePage.classList.add("hidden");
        mainWorkspace.classList.remove("hidden")
    } else {
        alert("PODAJ POPRAWNA NAZWE UŻYTKOWNIKA")
    }
}

const checkIfUserIsLogged = function () {
    if (localStorage.userName !== null && localStorage.userName !== undefined) {
        welcomePage.classList.add("hidden");
        mainWorkspace.classList.remove("hidden");
        userNameHolder.innerText = localStorage.userName;
    }
}

document.addEventListener("DOMContentLoaded", checkIfUserIsLogged);
loginForm.addEventListener("submit", formSubmit);

//logic for adding recipe

let arrayOfInstructions = [];
let arrayOfIngredients = [];

function Recipe(id, title, description, instructions, ingredients) {
    this.id = id; // id przepisu
    this.title = title; // nazwa przepisu
    this.description = description; // opis przepisu
    this.ingredients = ingredients; // składniki przepisu
    this.instructions = instructions; // instrukcje przepisu
}


/*
Metoda `.saveToLocalStorage()`
zapisująca do localStorage informacje o przepisie */
Recipe.prototype.saveToLocalStorage = function(recipe) {
    let dataFromLocalStorage = [];
    if (localStorage.getItem("allRecipesArray") != null) {
        dataFromLocalStorage = JSON.parse(localStorage.getItem("allRecipesArray"));
        dataFromLocalStorage.push(recipe);
        localStorage.setItem("allRecipesArray", JSON.stringify(dataFromLocalStorage));
    } else {
        dataFromLocalStorage.push(recipe);
        localStorage.setItem("allRecipesArray", JSON.stringify(dataFromLocalStorage));
    }
}

const createRecipe = function() {
    if (inputRecipeTitle.value != 0 && inputRecipeDescription.value != 0) {
        let id;
        let dataFromLocalStorage = [];
        if (JSON.parse(localStorage.getItem("allRecipesArray")) !== null) {
            dataFromLocalStorage = JSON.parse(localStorage.getItem("allRecipesArray"));
            id = dataFromLocalStorage.length + 1;
        } else {
            id = 1
        }
        let title = inputRecipeTitle.value
        let description = inputRecipeDescription.value
        let instructions = arrayOfInstructions
        let ingredients = arrayOfIngredients
        let newRecipe = new Recipe(id, title, description, instructions, ingredients)
        // console.log(newRecipe)
        newRecipe.saveToLocalStorage(newRecipe)
        displayNumberOfRecipes()
        appVisible(desktop)
    } else {
        alert("NIE MOZNA DODAC PRZEPISU BEZ NAZWY LUB OPISU")
    }

}

saveRecipe.addEventListener("click", createRecipe)


//logic for adding new instruction and ingredient

let indexOfInstruction = [];
let indexOfIngredients = [];

const addInstruction = function () {
    if (inputRecipeInstructions.value.length != 0) {
        let newLi = document.createElement("li");
        let newEditIcon = document.createElement("i");
        let newDeleteIcon = document.createElement("i");
        newEditIcon.classList.add("edit_icon")
        newEditIcon.classList.add("action_icon")
        newDeleteIcon.classList.add("delete_icon")
        newDeleteIcon.classList.add("action_icon")
        newLi.innerText = inputRecipeInstructions.value;
        newLi.appendChild(newEditIcon)
        //edit function below
        newLi.appendChild(newDeleteIcon)
        //delete function
        const deleteInstructionItem = function () {
            newDeleteIcon.parentElement.remove();
            arrayOfInstructions = Array.from(listOfInstructions.querySelectorAll("li")).map(el => el.innerText)
        }
        newDeleteIcon.addEventListener("click", deleteInstructionItem)
        //
        if (indexOfInstruction.length === 0) {
            listOfInstructions.appendChild(newLi);
        } else {
            listOfInstructions.insertBefore(newLi, listOfInstructions.children[indexOfInstruction])
            listOfInstructions.removeChild(listOfInstructions.children[indexOfInstruction + 1])
        }
        //updating array to export
        arrayOfInstructions = Array.from(listOfInstructions.querySelectorAll("li")).map(el => el.innerText)
        //reset input
        inputRecipeInstructions.value = null
        newEditIcon.addEventListener("click", editElementInstruction)
        indexOfInstruction = []
    } else {
        alert("NIE MOZNA DODAC PUSTEJ INSTRUKCJI")
    }
}

//edit function instructions

const editElementInstruction = function () {
    indexOfInstruction = Array.from(listOfInstructions.querySelectorAll("li")).indexOf(this.parentElement)
    inputRecipeInstructions.value = this.parentElement.innerText
}



const addIngredient = function () {
    if (inputRecipeIngredients.value.length != 0) {
        let newLi = document.createElement("li");
        let newEditIcon = document.createElement("i");
        let newDeleteIcon = document.createElement("i");
        newEditIcon.classList.add("edit_icon")
        newEditIcon.classList.add("action_icon")
        newDeleteIcon.classList.add("delete_icon")
        newDeleteIcon.classList.add("action_icon")
        newLi.innerText = inputRecipeIngredients.value;
        newLi.appendChild(newEditIcon)
        newLi.appendChild(newDeleteIcon)
        //delete function
        const deleteIngredients = function () {
            newDeleteIcon.parentElement.remove();
            arrayOfIngredients = Array.from(listOfIngredients.querySelectorAll("li")).map(el => el.innerText)
        }
        newDeleteIcon.addEventListener("click", deleteIngredients)
        //
        if (indexOfIngredients.length === 0) {
            listOfIngredients.appendChild(newLi);
        } else {
            listOfIngredients.insertBefore(newLi, listOfIngredients.children[indexOfIngredients])
            listOfIngredients.removeChild(listOfIngredients.children[indexOfIngredients + 1])
        }
        //updating array to export
        arrayOfIngredients = Array.from(listOfIngredients.querySelectorAll("li")).map(el => el.innerText)
        //reset input
        inputRecipeIngredients.value = null
        newEditIcon.addEventListener("click", editElementIngredient)
        indexOfIngredients = []
    } else {
        alert("NIE MOZNA DODAC PUSTEJ INSTRUKCJI")
    }
}


//edit function ingredient

const editElementIngredient = function () {
    indexOfIngredients = Array.from(listOfIngredients.querySelectorAll("li")).indexOf(this.parentElement)
    // console.log(this)
    // console.log(indexOfIngredients)
    inputRecipeIngredients.value = this.parentElement.innerText
}


buttonRecipeAddInstruction.addEventListener("click", addInstruction)
buttonRecipeAddIngredient.addEventListener("click", addIngredient)



// console.log(JSON.parse(localStorage.getItem("allRecipesArray")))
// let testowy = JSON.parse(localStorage.getItem("allRecipesArray"))
//
// console.log(testowy)
// console.log(testowy[0])
// console.log(testowy[0].title)
// console.log(testowy[0].description)
// console.log(testowy[0].ingredients)
// console.log(testowy[0].instructions)


//logic for rendering list of recipes

//Poniższa funkcja tworzy komórkę i wstawia ją do tablicy
const insertCell = function (row, cellName, contentFromLocalStorage) {
    const cellToInsert = document.createElement("td");
    cellToInsert.classList.add(`item__${cellName}`);
    row.appendChild(cellToInsert);

    if (contentFromLocalStorage === undefined) {
        cellToInsert.innerText = ""; //ostatnia komórka ma być pusta
    } else {
        cellToInsert.innerText = contentFromLocalStorage; //podstawiam konkretną treść z LocalStorage
    }
}

//Funkcja tworzy divy i nadaje im klasy, w tórych są pseudoelementy :before z ikonami fontAwesome
const createActionIcons = function (querySelector) {
    let newEditIcon = document.createElement("i");
    let newDeleteIcon = document.createElement("i");
    newEditIcon.classList.add("edit_icon", "action_icon")
    newDeleteIcon.classList.add("delete_icon", "action_icon", "delete_instruction")

    const actionCells = document.querySelectorAll(querySelector);
    actionCells.forEach(function(cell) {
        cell.appendChild(newEditIcon);
        cell.appendChild(newDeleteIcon);
    })
}

const deleteRecipe = function () { //Funkcja usuwa przepis z widoku i z local storage
    let dataFromLocalStorage = JSON.parse(localStorage.getItem("allRecipesArray"));
    const indexOfRecipe = parseInt(this.parentElement.parentElement.firstElementChild.innerText) - 1; //wyciągam tekst z komórki ID i zamieniam go na liczbę
    dataFromLocalStorage.splice(indexOfRecipe, 1); //usuwam z tablicy przepisów ten konkretny przepis
    dataFromLocalStorage.map(function(recipe, index) { //przypisuję każdemu przpisowi nowe id
        recipe.id = (index + 1);
    })
    localStorage.setItem("allRecipesArray", JSON.stringify(dataFromLocalStorage));  //zapisuję nową tablicę w LocalStorage
    renderRecipesList(); //renderuję na nowo tabelę
}

const renderRecipesList = function () { //Pobieranie listy przepsiow z LocalStorage i wyświetlanie ich w panelu Lista Przpepisów
    recipesListTableBody.innerHTML = ""; //czyszczę tabelkę
    let dataFromLocalStorage = JSON.parse(localStorage.getItem("allRecipesArray")); //tablica przepisów-obiektów pobrana z LocalStorage

    dataFromLocalStorage.map( function(recipe) { // Map przechodzi po tablicy z przepisami z local storage
        const recipesListTableRow = document.createElement("tr"); //tworzę rząd w tabeli
        recipesListTableRow.classList.add("single_recipe"); //dodaję klasę rzędowi
        recipesListTableBody.appendChild(recipesListTableRow); // dodaję rząd do tabeli

        insertCell(recipesListTableRow, "id", recipe.id); //wstawiam komórkę ID
        insertCell(recipesListTableRow, "title", recipe.title); //wstawiam komórkę Nazwa
        insertCell(recipesListTableRow, "description", recipe.description); //wstawiam komórkę Opis
        insertCell(recipesListTableRow, "action"); //wstawiam pustą komórkę Akcje

        createActionIcons(".single_recipe .item__action") //tworzę ikonki

        const deleteIcon = recipesListTableRow.querySelector(".delete_icon");
        deleteIcon.addEventListener("click", deleteRecipe); //dodaję do deleteIcon event usowanie przepisu
    })
}

navRecipes.addEventListener("click", renderRecipesList);

const addRecipeButton = document.querySelector("#recipes-workspace .green_plus_icon"); //Zielony plus przenosi do widoku dodawania nowego przepisu
addRecipeButton.addEventListener("click", function() {
    inputRecipeTitle.value = null;
    inputRecipeDescription.value = null;
    inputRecipeInstructions.value = null;
    inputRecipeIngredients.value = null;
    clearInstructions();
    clearIngredients();
    appVisible(newRecipeWorkspace);
    changeNavigation(navDesktop);
})

//logic for adding new plan


const planTableInput = document.querySelectorAll(".plan-table-input")

const addAllRecipesToInputs = function (input) {
    let placeholder = document.createElement("option")
    placeholder.setAttribute("value", 0)
    input.appendChild(placeholder)
    placeholder.innerText = "Wybierz posilek"
    if (JSON.parse(localStorage.getItem("allRecipesArray")) !== null) {
        JSON.parse(localStorage.getItem("allRecipesArray")).forEach(el => {
            let newSelectOption = document.createElement("option")
            newSelectOption.setAttribute("value", el.id)
            newSelectOption.innerText = el.title
            input.appendChild(newSelectOption)
        })
    }
}

// tworzenie tablicy tablic indexow - po indeksie mozecie zobaczyc ktory przepis jest w ktorym dniu o jakiej porze

let monday = document.querySelectorAll(".monday .plan-table-input")
let tuesday = document.querySelectorAll(".tuesday .plan-table-input")
let wednesday = document.querySelectorAll(".wednesday .plan-table-input")
let thursday = document.querySelectorAll(".thursday .plan-table-input")
let friday = document.querySelectorAll(".friday .plan-table-input")
let saturday = document.querySelectorAll(".saturday .plan-table-input")
let sunday = document.querySelectorAll(".sunday .plan-table-input")


const arrFromDay = function (day) {
    let arrOfThisDay = []
    day.forEach(select => {
        arrOfThisDay.push(parseInt(select.value));
    })
    // console.log(arrOfThisDay)
    return arrOfThisDay
}
//funkcja tworzaca tablice 7 tablic, gdzie => [[a, b, c, d, e],[a, b, c, d, e],...,[a, b, c, d, e]] , a = sniadanie, b = drigie sniadanie itd
//czyli np arrayOfIndexes[0] to tablica 5 ID, czyli wszystkie posilki na poniedzialek, po koleji
// np arrayOfIndexes[6].[4] to ID posilku na kolacje w niedziele.
//W TABLICY ZAPISANE SA ID PRZEPISOW, A NIE CALE OBIEKTY, WIEC WRZUCAJAC DO SWOICH STRON, KORZYSTACIE Z ID PRZEPISU !!!!!

const arrFromWeek = function () {
    let arrayOfIndexes = []
    arrayOfIndexes.push(arrFromDay(monday))
    arrayOfIndexes.push(arrFromDay(tuesday))
    arrayOfIndexes.push(arrFromDay(wednesday))
    arrayOfIndexes.push(arrFromDay(thursday))
    arrayOfIndexes.push(arrFromDay(friday))
    arrayOfIndexes.push(arrFromDay(saturday))
    arrayOfIndexes.push(arrFromDay(sunday))
    // console.log(arrayOfIndexes)
    return arrayOfIndexes
}

// tutaj konstruktor planu

function Plan(weekNumber, title, description, arrayOfIndexes) {
    this.weekNumber = weekNumber; // numer tygodnia
    this.title = title; // nazwa planu
    this.description = description; // opis planu
    this.arrayOfIndexes = arrayOfIndexes; // tablica posilkow w planie
}

/*
Metoda `.saveToLocalStorage()`
zapisująca do localStorage informacje o PLANIE */
Plan.prototype.saveToLocalStorage = function(plan) {
    let dataFromLocalStorage = [];
    if (localStorage.getItem("allPlansArray") != null) {
        dataFromLocalStorage = JSON.parse(localStorage.getItem("allPlansArray"));
        dataFromLocalStorage.push(plan);
        localStorage.setItem("allPlansArray", JSON.stringify(dataFromLocalStorage));
    } else {
        dataFromLocalStorage.push(plan);
        localStorage.setItem("allPlansArray", JSON.stringify(dataFromLocalStorage));
    }
}

//tutaj funkcja dodawania planu i zmienne


const inputPlanTitle = document.querySelector("#input-plan-title")
const inputPlanDescription = document.querySelector("#input-plan-description")
const inputWeekNumber = document.querySelector("#input-week-number")

const planSave = document.querySelector("#plan-save")


    //function that clears all dropdown options
const clearAllInputsInSelects = function () {
    document.querySelectorAll(".plan-table-input option").forEach(el => {
        el.remove()
    })
}

const createPlan = function() {
    if (inputPlanTitle.value != 0 && inputPlanDescription.value !=0 && inputWeekNumber.value != 0) {
        let weekNumber = parseInt(inputWeekNumber.value)
        if (weekNumber < 1 || weekNumber > 52 || isNaN(weekNumber)) {
            alert("PODAJ PORAWNY NUMER TYGODNIA - LICZBE Z ZAKRESU 1 DO 52");
            return;
        } else {
            let title = inputPlanTitle.value
            let description = inputPlanDescription.value
            let arrayOfIndexes = arrFromWeek()
            let newPlan = new Plan(weekNumber, title, description, arrayOfIndexes)
                //sprawdzamy czy numer tygodnia sie nie powtarza
                if  (JSON.parse(localStorage.getItem("allPlansArray")) === null) {
                    newPlan.saveToLocalStorage(newPlan)
                    desktopPlan(numberOfWeek, 53);
                    appVisible(desktop)
                    return;
                } else {
                    let arrayToCheckDuplications = []
                    JSON.parse(localStorage.getItem("allPlansArray")).forEach(el => {
                        arrayToCheckDuplications.push(el.weekNumber)
                    });
                    if (arrayToCheckDuplications.indexOf(weekNumber) === -1) {
                        newPlan.saveToLocalStorage(newPlan)
                        desktopPlan(numberOfWeek, 53);
                        appVisible(desktop)
                    } else {
                        alert("PODANY TYDZIEŃ MA JUŻ USTALONY PLAN POSIŁKÓW. MOŻESZ GO EDYTOWAC Z MENU PLANÓW")
                    }
                }
            }
        } else {
        alert("UPEWNIJ SIĘ, ŻE WSZYSTKIE POLA SĄ WYPEŁNIONE")
    }
}

planSave.addEventListener("click", createPlan)


// Logic for rendering list of plans

const deletePlan = function () { //Funkcja usuwa plan z widoku i z local storage
    let dataFromLocalStorage = JSON.parse(localStorage.getItem("allPlansArray"));
    const indexOfPlan = parseInt(this.parentElement.parentElement.firstElementChild.innerText) - 1; //wyciągam tekst z komórki ID i zamieniam go na liczbę
    dataFromLocalStorage.splice(indexOfPlan, 1); //usuwam z tablicy przepisów ten konkretny przepis

    localStorage.setItem("allPlansArray", JSON.stringify(dataFromLocalStorage));  //zapisuję nową tablicę w LocalStorage
    renderPlansList(); //renderuję na nowo tabelę
}

const renderPlansList = function () { //Pobieranie listy planów z LocalStorage i wyświetlanie ich w panelu Lista Planów
    plansListTableBody.innerHTML = ""; //czyszczę tabelkę
    let dataFromLocalStorage = JSON.parse(localStorage.getItem("allPlansArray")); //tablica przepisów-obiektów pobrana z LocalStorage


    dataFromLocalStorage.forEach( function(plan, index) { // Map przechodzi po tablicy z przepisami z local storage
        const plansListTableRow = document.createElement("tr"); //tworzę rząd w tabeli
        plansListTableRow.classList.add("single_plan"); //dodaję klasę rzędowi

        plansListTableBody.appendChild(plansListTableRow); // dodaję rząd do tabeli

        insertCell(plansListTableRow, "id", (index+1).toString()); //wstawiam komórkę ID
        insertCell(plansListTableRow, "title", plan.title); //wstawiam komórkę Nazwa
        insertCell(plansListTableRow, "description", plan.description); //wstawiam komórkę Opis
        insertCell(plansListTableRow, "week", plan.weekNumber); //wstawiam komórkę Opis
        insertCell(plansListTableRow, "action"); //wstawiam pustą komórkę Akcje

        createActionIcons(".single_plan .item__action") //tworzę ikonki

        const deleteIcon = plansListTableRow.querySelector(".delete_icon");
        console.log(deleteIcon);
        deleteIcon.addEventListener("click", deletePlan); //dodaję do deleteIcon event usowanie przepisu
    })
}

navPlans.addEventListener("click", renderPlansList);

const addPlanButton = document.querySelector("#plans-workspace .green_plus_icon"); //Zielony plus przenosi do widoku dodawania nowego przepisu
addPlanButton.addEventListener("click", function() {
    inputPlanTitle.value = null;
    inputPlanDescription.value = null;
    inputWeekNumber.value = null;
    clearAllInputsInSelects();
    renderAllInputsInSelects();
    appVisible(newPlanWorkspace);
    changeNavigation(navDesktop);
})


//ilosc przepisów
    displayNumberOfRecipes = function(){
    let recipesLocalStorage = JSON.parse(localStorage.getItem("allRecipesArray"));
    let numberOfPlan = document.querySelector("#reciptsNumber");
    numberOfPlan.innerHTML = Object.keys(recipesLocalStorage).length;
    }

document.addEventListener("DOMContentLoaded",displayNumberOfRecipes);



// wyswietlanie planu


//czas
let numberOfWeek=0;

let time = function (){

    let date = new Date();
    let days =  date.getDate();
    let month = date.getMonth()+1;

    if(month==1){
        numberOfWeek += days/7;
    }
    else if(month==2){
        numberOfWeek += 4.4;
        numberOfWeek += days/7;
    }
    else if(month>2 && month<8){
        numberOfWeek += 8.4
        numberOfWeek += (month/2-1) * 4.3;
        numberOfWeek += (month-(month/2+2))*4.4;
        numberOfWeek += days/7;
    }
    else{
        numberOfWeek += 12.9
        numberOfWeek += (month/2-1) * 4.3;
        numberOfWeek += (month-(month/2+3))*4.4;
        numberOfWeek += days/7;
    }
    numberOfWeek = Math.ceil(numberOfWeek);

    desktopPlan(numberOfWeek,53);
}



let desktopNextButton = document.querySelector(".app-main__table__button__next")
let desktopPrevButton = document.querySelector(".app-main__table__button__prev")

desktopNextButton.addEventListener("click", function(){
    if(numberOfWeek<52) {
        let indexWeek=53;
        numberOfWeek = numberOfWeek + 1;
        desktopPlan(numberOfWeek,indexWeek);
    }
})

desktopPrevButton.addEventListener("click", function(){
    if(numberOfWeek>1){
        let indexWeek=53;
        numberOfWeek = numberOfWeek-1;
        desktopPlan(numberOfWeek,indexWeek);
    }
})


const desktopPlan = function (numberOfWeek,indexWeek) {
    let plansLocalStorage = JSON.parse(localStorage.getItem("allPlansArray"));
    let recipesLocalStorage = JSON.parse(localStorage.getItem("allRecipesArray"));
    let table = document.querySelectorAll(".table__area");
    let header = document.querySelector(".app-main__table__header");

    //console.log(numberOfWeek);
    //weekId.innerText = numberOfWeek.toString();


    let array=[["x","x","x","x","x"],["x","x","x","x","x"],["x","x","x","x","x"],["x","x","x","x","x"],["x","x","x","x","x"],["x","x","x","x","x"],["x","x","x","x","x"]];

    let weekPlan = plansLocalStorage.map( function(plan) {
        if(plan.weekNumber==numberOfWeek){
            return plan.arrayOfIndexes;
        }
        else{
            return array;
        }
    })


    for(let i=0;i<Object.keys(plansLocalStorage).length; i++){
        if(plansLocalStorage[i].weekNumber == numberOfWeek){
            indexWeek=i;
        }
    }
    let j = 0;


    if(indexWeek!=53) {
        header.innerHTML =`Twój plan na ${numberOfWeek.toString()} tydzień:`;
        weekPlan[indexWeek].forEach(function (items, index) {
            items.forEach(function (item) {
                table[j].innerHTML = item;
                if (item == 0) {
                    table[j].innerHTML = "----";
                }
                else {
                    table[j].innerHTML = recipesLocalStorage[item - 1].title;
                }
                j = j + 7;
            })
            j = index + 1;
        })
    }
    else{
        header.innerHTML =`Nie ma planu na ${numberOfWeek.toString()} tydzień`;
        weekPlan[0].forEach(function (items, index) {
            items.forEach(function (item) {
                table[j].innerHTML = item;
                j = j + 7;
            })
            j = index + 1;
        })
    }
}

document.addEventListener("DOMContentLoaded", time);


