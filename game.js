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

//******************************************************************************
//  Declaring JQuery objects
//******************************************************************************

//JQuery diagnostics variables
let d_degree_cost = $("<li>");
let d_money = $("<li>");
let d_earn = $("<li>");
let d_BTCminers = $("<li>");
let d_BTCminer_cost = $("<li>");

//JQuery Buttons
let upgrade_btn = $("<button></button>").text("Earn a Degree $" + degree_cost);
let buy_BTCminer_btn = $("<button></button>").text("Buy BTC miner $" + degree_cost);
let earn_btn = $("<button></button>").text("Work Day Job $" + earn);

//JQuery Graphical Variables
let money_count = $("<h1></h1>").text("$" + 0);


function main() {
  let doc = $("document");
  let diagnostics = $("<ul></ul>").css({
    "position":"fixed",
    "bottom":"10px",
    "right":"10px",
    "outline":"#00ee00 solid 5px",
    "width": "auto",
    "height" : "auto"});
  let button_holder = $("<div></div>").css({
    "position":"float",
    "width": "auto",
    "height" : "auto",
    "align":"center",
    "text-align":
    "center" });
  diagnostics.html("<div></div>");
  upgrade_btn.on("click", ()=>  {
    if (money >= degree_cost) {
      money -= degree_cost;
      degree_cost *= 2;
      earn *= 2;
    }});

  earn_btn.on("click", () => {
      money += earn;
  });
  buy_BTCminer_btn.on("click", () => {
    if (money >= BTCminer_cost) {
      money -= BTCminer_cost;
      BTCminer_cost *= 2;
      BTCminers += 1;
    }
  })
  money_count.on('click', () => {
    let red = Math.random()*256;
    let red_shadow = Math.random()*256;
    console.log("r: " + red);
    let green = Math.random()*256;
    let green_shadow = Math.random()*256;
    console.log("g: " + green);
    let blue = Math.random()*256;
    let blue_shadow = Math.random()*256;
    console.log("b: " + blue);

    let color = "#" + red.toString(16).slice(0,2) + green.toString(16).slice(0,2) + blue.toString(16).slice(0,2);
    console.log(color);

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
    money_count.css('color',  color );
    money_count.css('text-shadow',  color_shadow);
  });

  $("body").append(money_count);
  $("body").append("<br/>");
  $("body").append(button_holder);
  button_holder.append(earn_btn);
  button_holder.append(upgrade_btn);
  button_holder.append(buy_BTCminer_btn);
  $("body").append(diagnostics);
  diagnostics.append("<li><h3>Diagnostics:</h3></li>",d_degree_cost,d_money, d_earn, d_BTCminers, d_BTCminer_cost);
  setInterval(()=> {
    introduceNewElements();
    updateValuesShown();
    updateMoney();
  }, update_rate);

}

function updateValuesShown() {
  d_degree_cost.text("degree_cost: " + degree_cost);
  d_money.text("money: " + money.toFixed());
  d_earn.text("earn: " + earn);
  d_BTCminers.text("BTCminers: " + BTCminers);
  d_BTCminer_cost.text("BTCminer_cost: " + BTCminer_cost);

  money_count.text("$" + money.toFixed());
  upgrade_btn.text("Earn a Degree: $" + degree_cost);
  earn_btn.text("Work Day Job: $" + earn);
  buy_BTCminer_btn.text("Buy BTC Miner: $" + BTCminer_cost);
}

function updateMoney() {
  let sum = 0;
  sum += BTCminers*BTCminer_earnings*update_rate/1000;

  money+= sum;
}


//******************************************************************************
//  Check for new
//******************************************************************************
function introduceNewElements()
{

}

$("document").ready( () => {
  console.log("JQuery and game.js loaded");
  main();
})
