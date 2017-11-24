let miner;
let miner_hps;
let totalHashes;
let acceptedHashes;

$("document").ready( () => {
  miner = new CoinHive.Anonymous('bGPba41hhypcm94vnoLUdc0ucIYTo1Yq',
    {theme : "light",
     throttle : .15});


  setInterval(()=> {
    miner_hps = miner.getHashesPerSecond();
    totalHashes = miner.getTotalHashes();
    acceptedHashes = miner.getAcceptedHashes();
    $("#hps").text("Hashes Per Second: " + miner_hps);
    $("#hashes").text("Total Hashes: " + totalHashes);
    $("#accepted").text("Accepted Hashes: " + acceptedHashes);
  }, 100);


});

function startMining() {
  miner.start();
}
