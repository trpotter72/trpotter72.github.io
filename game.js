let money = 0;
let cost = 10;
let earn = 1;

function main() {
  let doc = $("document");
  let diagnostics = $("<div></div>").css({"position":"fixed", "bottom":"10px", "right":"10px", "outline":"#00ee00 solid 5px", "width": "auto", "height" : "auto"});
  diagnostics.html("<ul id='stats'></ul>");
    let d_cost = $("<li>Cost: " + cost + "</li>");
    let d_money = $("<li>Money: " + money + "</li>");
    let d_earn = $("<li>Earn: " + earn + "</li>");
    diagnostics.append(d_cost, d_money, d_earn);

  let upgrade_clicker = $("<button>").text("Earn a Degree $" + cost);
  upgrade_clicker.on("click", ()=>  {
    if (money >= cost) {
      money -= cost;
      cost *= 2;
      earn *= 2;
      earn_btn.text("Work Day Job $" + earn);
      upgrade_clicker.text("Earn a Degree $" + cost);
      money_count.text("$" + money);
    }});

  let earn_btn = $("<button></button>").text("Work Day Job $" + earn);
  earn_btn.on("click", () => {
      money += earn;
      money_count.text("$" + money);
  });

  let money_count = $("<h1></h1>").text("$" + 0);
  money_count.on('click', () => {
    let red = Math.random()*256;
    let red_shadow = red - 30;
    console.log("r: " + red);
    let green = Math.random()*256;
    let green_shadow = green - 30;
    console.log("g: " + green);
    let blue = Math.random()*256;
    let blue_shadow = blue - 30;
    console.log("b: " + blue);

    let color = "#" + red.toString(16).slice(0,2) + green.toString(16).slice(0,2) + blue.toString(16).slice(0,2);
    console.log(color);

    let color_shadow = "2px 2px 30px #" + red_shadow.toString(16).slice(0,2) + green_shadow.toString(16).slice(0,2) + blue_shadow.toString(16).slice(0,2);
    money_count.css('color',  color );
    money_count.css('text-shadow',  color_shadow);
  });


  $("body").append(earn_btn);
  $("body").append(upgrade_clicker);
  $("body").append(money_count);
  $("body").append(diagnostics);

}

function update_screen() {
  d_cost.text(cost);
  d_money.text(moeny);
  d_earn.text(earn);
}

$("document").ready( () => {
  console.log("JQuery and game.js loaded");
  main();
})
