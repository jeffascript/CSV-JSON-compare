import express from 'express';
import CSVToJSON from 'csvtojson';
import { join } from 'path';
import fs from 'fs-extra';

import masterDataIdArray from './formatedMasterData';

const app = express();
const PORT = 3456 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('hello I am here ');
});

const printCSVWithoutMatch = async (inputCsv, outputCsv, masterdataArray) => {
  await CSVToJSON()
    .fromFile(inputCsv)
    .then(jsonedCSV => {
      // console.log('jsoned CSV', jsonedCSV);
      const csvArrMapped = jsonedCSV.map(x => x.sitesBASF);
      // console.log('mapped CSV and sitesBasf header removed', csvArrMapped);

      const csvArr = [...new Set(csvArrMapped)]; // remove duplicates
      // console.log('removed Duplicates', csvArrMapped);

      const filteredArrWithoutHeader = masterdataArray.filter(item => !csvArr.includes(item));

      const filteredArr = ['IDs not Mapped', ...filteredArrWithoutHeader];
      // eslint-disable-next-line no-useless-escape
      const dataToSave = filteredArr.map(item => JSON.stringify(item, null, 1).replace(/\"/gi, '')).join('\n');

      // console.log("csv pattern", dataToSave);
      fs.writeFile(outputCsv, dataToSave, err => {
        if (err) {
          console.log(err);
        }
        console.log('the file was saved');
      });
    })
    .catch(err => console.log(err));
};

console.log('The length of Master Data is = ', masterDataIdArray.length);

const outputFile = join(__dirname, '/results.csv');

const csvFile = join(__dirname, '/sites.csv');

printCSVWithoutMatch(csvFile, outputFile, masterDataIdArray);

app.listen(PORT, err => {
  if (!err) {
    console.log(`Server is running on ${PORT}`);
  } else {
    console.log(err);
  }
});
