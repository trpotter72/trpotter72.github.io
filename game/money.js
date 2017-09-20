

//******************************************************************************
//  Declaring Global Variables to keep track of game state
//******************************************************************************

let money = 0;
let degree_cost = 10;
let earn = 1;
let BTCminers = 0;
let BTCminer_cost = 10;

//Constants
const update_rate = 100;
const BTCminer_earnings = 1;
const programming_time = 6;

//******************************************************************************
//  Declaring JQuery objects
//******************************************************************************

//JQuery diagnostics variables
let diagnostics = $("<ul id='diagnostics'></ul>");
let d_degree_cost = $("<li>");
let d_money = $("<li>");
let d_earn = $("<li>");
let d_BTCminers = $("<li>");
let d_BTCminer_cost = $("<li>");
let d_time_programming = $("<li>");


//JQuery Buttons
let button_holder = $("<div id='button_holder'></div>")
let upgrade_btn = $("<button></button>").text("Earn a Degree $" + degree_cost);
let buy_BTCminer_btn = $("<button></button>").text("Buy BTC miner $" + degree_cost);
let earn_btn = $("<button></button>").text("Work Day Job $" + earn);

//JQuery Graphical Variables
let money_count = $("<div id='money_count'></div>");
let money_value = $("<h1>0</h1>")

//******************************************************************************
//  Constructs and appends the JQuery elements together and calls main() on load
//******************************************************************************
$("document").ready( () => {
  console.log("JQuery and game.js loaded");

  $("body").append(money_count);
    money_count.append(money_value);
  $("body").append("<br/>");
  $("body").append(button_holder);
  button_holder.append(earn_btn);
  button_holder.append(upgrade_btn);
  button_holder.append(buy_BTCminer_btn);
  $("body").append(diagnostics);
  diagnostics.append("<li><h3>Diagnostics:</h3></li>",
    d_degree_cost,
    d_money,
    d_earn,
    d_BTCminers,
    d_BTCminer_cost,
    d_time_programming);

  main();});

//******************************************************************************
//  Inits some event listeners and some other junk rn that I'll clean up
//******************************************************************************

function main() {
  let doc = $("document");

  upgrade_btn.on("click", ()=>  {
    if (money >= degree_cost) {
      money -= degree_cost;
      delta_money(-1 * degree_cost);
      degree_cost *= 2;
      earn *= 2;
    }});

  earn_btn.on("click", () => {
      money += earn;
      delta_money(earn);
  });
  buy_BTCminer_btn.on("click", () => {
    if (money >= BTCminer_cost) {
      money -= BTCminer_cost;
      delta_money(-1 * BTCminer_cost);
      BTCminer_cost *= 2;
      BTCminers += 1;
    }
  })
  money_value.on('click', change_money_color);

  setInterval(()=> {
    introduceNewElements();
    updateValuesShown();
    updateMoney();
  }, update_rate);

}


//******************************************************************************
//  Run every tick to refresh the values of all on screen displays
//******************************************************************************
function updateValuesShown() {
  d_degree_cost.text("degree_cost: " + degree_cost);
  d_money.text("money: " + money.toFixed());
  d_earn.text("earn: " + earn);
  d_BTCminers.text("BTCminers: " + BTCminers);
  d_BTCminer_cost.text("BTCminer_cost: " + BTCminer_cost);
  d_time_programming.text("Time programming: " + programming_time + " hours");

  money_value.text("$" + money.toFixed());
  upgrade_btn.text("Earn a Degree: $" + degree_cost);
  earn_btn.text("Work Day Job: $" + earn);
  buy_BTCminer_btn.text("Buy BTC Miner: $" + BTCminer_cost);
}


//******************************************************************************
//  Called every tick to increment money based on current investments
//******************************************************************************
function updateMoney() {
  let sum = 0;
  sum += BTCminers*BTCminer_earnings*update_rate/1000;
  money+= sum;
}


//******************************************************************************
//  Check for new changes to game state which should invoke a UI change
//******************************************************************************
function introduceNewElements()
{

}


//******************************************************************************
//  Responsible for displaying the floating away digits (input with correct sign pls)
//******************************************************************************
function delta_money(change) {
  let delta = $("<span id='delta_money'>" + change + "</span>");
  if (change < 0) {
    delta.css("color", "#ff0000");
  }
  delta.appendTo(money_count);
  setTimeout(() => {
    console.log("Tried to remove");
    delta.remove();
  }, 3500);
}


//******************************************************************************
//  Changes the color and glow of your wealth randomly
//******************************************************************************
function change_money_color() {
  let red = Math.random()*256;
  let red_shadow = Math.random()*256;
  let green = Math.random()*256;
  let green_shadow = Math.random()*256;
  let blue = Math.random()*256;
  let blue_shadow = Math.random()*256;
  let color = "#" + red.toString(16).slice(0,2) + green.toString(16).slice(0,2) + blue.toString(16).slice(0,2);
  let color_shadow = "0px 0px 40px #"
  + red_shadow.toString(16).slice(0,2)
  + green_shadow.toString(16).slice(0,2)
  + blue_shadow.toString(16).slice(0,2)
  + ",-2px -2px #000000,"
    + "2px 2px #000000,"
    + "2px -2px #000000,"
    + "-2px 2px #000000,"
    + "0px -2px #000000,"
    + "0px 2px #000000,"
    + "2px 0px #000000,"
    + "-2px 0px #000000";
  money_value.css('color',  color );
  money_value.css('text-shadow',  color_shadow);
}
