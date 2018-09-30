let miner;
let miner_hps;
let totalHashes;
let acceptedHashes;


//window.addEventListener

$(window).on('load', () => {
  console.log("Window Loaded");
  $("#loading-outer").hide();
  miner = new CoinHive.Anonymous('bGPba41hhypcm94vnoLUdc0ucIYTo1Yq',
    {theme : "light",
     throttle : .5});
 setInterval(()=> {
   miner_hps = miner.getHashesPerSecond();
   totalHashes = miner.getTotalHashes();
   acceptedHashes = miner.getAcceptedHashes();
   $("#hps").text("Hashes Per Second: " + miner_hps);
   $("#hashes").text("Total Hashes: " + totalHashes);
   $("#accepted").text("Accepted Hashes: " + acceptedHashes);
 }, 100);
});

$("document").ready( () => {
  console.log("Document Ready");





});

function startMining() {
  miner.start();
}
