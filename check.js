const sites = require('./sites.json');
const buildings = require('./buildings.json');

const countSites = JSON.parse(JSON.stringify(sites)).length;
const countbuildings = JSON.parse(JSON.stringify(buildings)).length;

console.log({ countSites });

console.log({ countbuildings });
