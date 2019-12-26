
import { cal } from '../../lib';

const fs = require('fs');


export const calculate = async (req, res) => {
  let { data, fromFile } = req.body;
  let result = '';


  // read from file
  if (fromFile === true) {
    try {
      data = fs.readFileSync('./uploads/upload.txt', 'utf8');
    } catch (e) {
      console.log('Error:', e.stack);
    }
  }

  const bill = JSON.parse(data);

  try {
    result = await cal(bill);
  } catch (e) {
    console.log('Error:', e.stack);
  }

  const { totalDays,
    totalAmountSpent,
    eachPersonSpentArr,
    eachPerosnOwsArr,
    eachPerosnOws,
    settlementComb } = result;


  res.send({
    totalDays,
    totalAmountSpent,
    eachPersonSpentArr,
    eachPerosnOwsArr,
    eachPerosnOws,
    settlementComb
  });
};
