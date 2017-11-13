/*---TODO---*/
//  Keyboard integration (buttons/ diagnostics/ cheats)
//  Counts on upgrades and assets
//  Mute button for audio
//  Total Click counter
//  Create an education level based on education upgrades
//  Credits
//  Add limited time double earnings
//  Achievements
//  Saves?
//
//******************************************************************************
//  Declaring Global Variables to keep track of game state
//******************************************************************************
let money = 0;
let degree_cost = 10;
let earn = 1;
let BTCminers = 0;
let BTCminer_cost = 10;
let BTCminer_upgrade_cost = 100;
let BTCminer_earnings = 1;

//Constants
const update_rate = 100;
const programming_time = 12;

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
let d_BTCminer_earnings = $("<li>");
let d_BTCminer_upgrade_cost = $("<li>");
let d_time_programming = $("<li>");


let upgrade_BTCminer_shown = false;
let notification_showing = false;


//JQuery Buttons
let button_holder = $("<div id='button_holder'></div>");
let upgrade_btn = $("<button></button>").text("Earn a Degree " + numTo$(degree_cost));
let buy_BTCminer_btn = $("<button></button>").text("Buy BTC miner " + numTo$(BTCminer_cost));
let upgrade_BTCminer_btn = $("<button></button>").text("Upgrade BTC miner " + numTo$(BTCminer_upgrade_cost));
let earn_btn = $("<button></button>").text("Work Day Job " + numTo$(earn));


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
  $("body").append(diagnostics);
  diagnostics.append("<li><h3>Diagnostics:</h3></li>",
    d_degree_cost,
    d_money,
    d_earn,
    d_BTCminers,
    d_BTCminer_cost,
    d_BTCminer_earnings,
    d_BTCminer_upgrade_cost,
    d_time_programming);

  main();});


//******************************************************************************
//  Inits some event listeners and some other junk rn that I'll clean up
//******************************************************************************

function main() {
  let doc = $("document");
  buttonInit();
  audioInit();

  setInterval(()=> {
    introduceNewElements();
    updateValuesShown();
  }, update_rate);

  setInterval(()=> {
    updateMoney();
  }, 1000);
}


//******************************************************************************
//  Supporting Functions for Buttons
//******************************************************************************
function buttonInit() {
  //Place buttons within button holder
  button_holder.append(earn_btn);
  button_holder.append(upgrade_btn);
  button_holder.append(buy_BTCminer_btn);
  button_holder.append(upgrade_BTCminer_btn);
  upgrade_BTCminer_btn.hide();
  //Assign correct actions to the buttons
  upgrade_btn.on("click", upgrade );
  earn_btn.on("click", work);
  buy_BTCminer_btn.on("click", buy_BTCminer);
  upgrade_BTCminer_btn.on("click", upgrade_BTCminer);
  money_value.on('click', change_money_color);
}

function upgrade() {
    if (money >= degree_cost) {
      money -= degree_cost;
      delta_money(-1 * degree_cost);
      degree_cost *= 3;
      earn *= 2;
    }
    else {
      notification("Not enough money");
    }
}

function work() {
    money += earn;
    delta_money(earn);
}

function buy_BTCminer() {
  if (money >= BTCminer_cost) {
    money -= BTCminer_cost;
    delta_money(-1 * BTCminer_cost);
    BTCminer_cost = Math.floor(BTCminer_cost * 1.2) + 1;
    BTCminers += 1;
  }
  else {
    notification("Not enough money");
  }
}

function upgrade_BTCminer() {
  if (money >= BTCminer_upgrade_cost) {
    money -= BTCminer_upgrade_cost;
    delta_money(-1 * BTCminer_upgrade_cost);
    BTCminer_upgrade_cost = Math.floor(Math.pow(10, Math.log10(BTCminer_upgrade_cost) + .5));
    BTCminer_earnings *= 2;
  }
  else {
    notification("Not enough money");
  }
}


//******************************************************************************
// AUDIO: Creates the looping audio along side controls
//******************************************************************************
function audioInit() {
let audio = document.createElement("audio");
let songList = ["./song1.mp3", "./song2.mp3", "./song3.mp3", "./song4.mp3"];
let currentSong = 0;
audio.setAttribute("src", songList[currentSong]);
audio.play();
//Switiching functionallity
audio.addEventListener('ended', ()=>{
  audio.setAttribute("src", songList[(currentSong + 1) % songList.length]);
  currentSong += 1;
  console.log("Now playing " + songList[(currentSong + 1) % songList.length]);
  audio.load();
  audio.play();})

//TODO: Create mute button for game, make sure that it loops
}


//******************************************************************************
//  UPDATE: functions which are called periodically to change/ learn about game
//******************************************************************************

//  Run every tick to refresh the values of all on screen displays
function updateValuesShown() {
  //Diagnostics panel
  d_degree_cost.text("degree_cost: " + degree_cost);
  d_money.text("money: " + money.toFixed());
  d_earn.text("earn: " + earn);
  d_BTCminers.text("BTCminers: " + BTCminers);
  d_BTCminer_cost.text("BTCminer_cost: " + BTCminer_cost);
  d_BTCminer_earnings.text("BTCminer_earnings: " + BTCminer_earnings);
  d_BTCminer_upgrade_cost.text("BTCminer_upgrade_cost: " + BTCminer_upgrade_cost);
  d_time_programming.text("Time programming: " + programming_time + " hours");
  //Wealth and cost updates
  money_value.text(numTo$(money.toFixed()));
  upgrade_btn.text("Earn a Degree: " + numTo$(degree_cost));
  earn_btn.text("Work Day Job: " + numTo$(earn));
  buy_BTCminer_btn.text("Buy BTC Miner: " + numTo$(BTCminer_cost));
  upgrade_BTCminer_btn.text("Upgrade BTC miner " + numTo$(BTCminer_upgrade_cost));
}

//  Called every tick to increment money based on current investments
function updateMoney() {
  let sum = 0;
  sum += BTCminers*BTCminer_earnings;
  money+= sum;
  if (sum != 0) {
    delta_money(sum);
  }
}

//  Check for new changes to game state which should invoke a UI change
function introduceNewElements()
{
  if (!upgrade_BTCminer_shown && BTCminers > 10) {
    upgrade_BTCminer_btn.show();
    upgrade_BTCminer_shown = true;
  }
}



//******************************************************************************
// MISC: Helper functions I think needed a good home
//******************************************************************************

//Convert a single
function numTo$(amount){
  //Handles the case of a < $1000 value, some redundency right now
  if(Math.abs(amount) < 1000){
    if (amount >= 0){  return "$" + amount;}
    else {return "-$" + Math.abs(amount);}
  }
  let postfixList = [' ','K','M','B','T','Q'];
  let postfix = 0;
  while ((Math.abs(amount / 1000) > 1) && (postfix < postfixList.length))
  {
    postfix += 1;
    amount /= 1000;
  }
  if (amount > 0){  return "$" + amount.toFixed(1) + postfixList[postfix];}
  else {return "-$" + Math.abs(amount).toFixed(1) + postfixList[postfix];}
}



//******************************************************************************
//  EEFECTS: On screen manipulation (effects/ notifications/ ect.)
//******************************************************************************

//  Responsible for displaying the floating away digits (input with correct sign pls)
function delta_money(change) {
  let delta = $("<span id='delta_money'>" + numTo$(change) + "</span>");
  if (change < 0) {
    delta.css("color", "#ff0000");
  }
  delta.appendTo(money_count);
  setTimeout(() => {
    delta.remove();
  }, 3500);
  money_value.text(numTo$(money.toFixed()));
}

//  Create notifications with given color
function notification(message, color = "#ff0000"){
  if(!notification_showing){
    let notification = $("<span id='notification'>" + message + "</span>");
    notification.css("color", color);
    notification.appendTo($("body"));
    notification_showing = true;
    setTimeout(() => {
      notification.remove();
      notification_showing = false;
    }, 1500);
  }
}

//  Changes the color and glow of your wealth randomly
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
