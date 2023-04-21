/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? yes
// When do they need to be reset or updated?
// when the type of service is changed (full or half day), a numbers of days selected and the clear days button is clicked.

var costperday = 35;
var daysselected = 0;
// array for business days
var businessDays = [document.getElementById("monday"), document.getElementById("tuesday"), document.getElementById("wednesday"), document.getElementById("thursday"), document.getElementById("friday")];
var clearButton = document.getElementById("clear-button");
var halfDays = document.getElementById("half");
var fullDays = document.getElementById("full");

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

function clicked(day){
    // checks if the day button was already clicked
    if (!day.classList.contains("clicked")){
        day.classList.add("clicked");
        daysselected += 1;
        ServiceCost();
    }
}
// listeners for business days, passes the specific day as the parameter for the function
businessDays[0].addEventListener("click", function() {clicked(businessDays[0]);});
businessDays[1].addEventListener("click", function() {clicked(businessDays[1]);});
businessDays[2].addEventListener("click", function() {clicked(businessDays[2]);});
businessDays[3].addEventListener("click", function() {clicked(businessDays[3]);});
businessDays[4].addEventListener("click", function() {clicked(businessDays[4]);});

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

function reset(){
    // resets all the day buttons in the array
    for (var i = 0; i < businessDays.length; i++){  
    businessDays[i].classList.remove("clicked");
    }  
    // resets the calculated cost
    daysselected = 0;
    ServiceCost();
}
clearButton.addEventListener("click", reset);

/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

function servicehalfday(){
    // sets the daily rate and calls a function to recalculate
    costperday = 20;
    ServiceCost();
    halfDays.classList.add("clicked");
    fullDays.classList.remove("clicked");
}
halfDays.addEventListener("click", servicehalfday);

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

function servicefullday(){
    // sets the daily rate and calls a function to recalculate
    costperday = 35;
    ServiceCost();
    fullDays.classList.add("clicked");
    halfDays.classList.remove("clicked");
}
fullDays.addEventListener("click", servicefullday);

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function ServiceCost(){
    let totalCost = document.getElementById("calculated-cost");
    // calculates and updates the amount displayed
    totalCost.innerHTML = costperday * daysselected;
}
