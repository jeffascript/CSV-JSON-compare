/** input longitude and latitude headers on csv
 * 1. Loop through building json and through the csv data converted2json
 *    - if the id of csv matches that of geo.json,
 *          -then copy the geojson.coordinates[0] as long
 *           && geojson.coordinates[1] as lat
 * 2. Add long && lat as titles + other titles on the csv in existence => on a new csv file
 * 3. generate a new csv with this new array/objects
 */

const resp = (a, b) => a * b;

console.log(resp(2, 3));
