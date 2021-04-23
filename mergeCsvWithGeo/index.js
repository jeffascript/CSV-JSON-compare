/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/** input longitude and latitude headers on csv
 * 1. Loop through building json and through the csv data converted2json
 *    - if the id of csv matches that of geo.json,
 *          -then copy the geojson.coordinates[0] as long
 *           && geojson.coordinates[1] as lat
 * 2. Add long && lat as titles + other titles on the csv in existence => on a new csv file
 * 3. generate a new csv with this new array/objects
 */

import CSVToJSON from 'csvtojson';

import { join } from 'path';

import { Parser } from 'json2csv';

import fs from 'fs-extra';

import buildingJSON from '../jsonData/buildings.json';

const buildingCSV = join(__dirname, './building.csv');

const outputFile = join(__dirname, '/buildingWithGeo.csv');

const json2csvParser = new Parser();

const printCSV = async (inputCSV, outputCSV, jsonFile) => {
  await CSVToJSON()
    .fromFile(inputCSV)
    .then(jsonedCSV => {
      const jsonEdited = jsonedCSV.map(b => {
        jsonFile.forEach(bjson => {
          if (bjson.id !== b.BuildingGuid) return [];
          const [long, lat] = bjson.coordinates;
          b.Longitude = long;
          b.Latitude = lat;
        });

        return b;
      });

      const dataToSave = json2csvParser.parse(jsonEdited);
      //   console.log(dataToSave);

      fs.writeFile(outputCSV, dataToSave, err => {
        if (err) {
          console.log(err);
        }
        console.log('the file was saved');
      });
    })
    .catch(err => console.log(err));
};

printCSV(buildingCSV, outputFile, buildingJSON);
