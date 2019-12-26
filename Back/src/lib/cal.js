
export const cal = async (bill) => {
  let tempPeople = [];
  let totalDays = 0;
  let totalAmountSpent = 0;
  const pairs = [];


  // get day by day owe values to each other
  await bill.data.map((invoice) => {
    const { friends, paidBy, amount } = invoice;


    // all people array
    tempPeople = [...friends, ...tempPeople];
    totalAmountSpent += amount;
    totalDays += 1;


    // check how many people
    const peopleCount = friends.length;
    // one person share
    const onePersonAmount = amount / peopleCount;
    // split amount
    friends.forEach((element) => {
      pairs.push({ owe: element, to: paidBy, amount: onePersonAmount });
    });

    return '';
  });

  const uniquePeopleArr = [...new Set(tempPeople)];

  const round = value => Math.round(value * 100) / 100;


  const eachPersonSpentArr = await uniquePeopleArr.map((person) => {
    let totalSpent = 0;

    pairs.forEach((element) => {
      if (element.to === person) {
        totalSpent += element.amount;
      }
    });

    // eachPersonSpentArr.push({ name: person, total: totalSpent });
    return { name: person, total: totalSpent };
  });


  const arrNormalize = [];

  // adds up each pairs and get final 'owe and to' pairs .
  pairs.forEach((element) => {
    if (!(element.owe === element.to)) {
      if (arrNormalize === undefined || arrNormalize.length === 0) {
        arrNormalize.push(element);
      } else {
        arrNormalize.forEach((item, i, a) => {
          if (element.owe === item.owe && element.to === item.to) {
            const neTotal = item.amount + element.amount;
            a[i] = { owe: item.owe, to: item.to, amount: neTotal };
          } else if (element.owe === item.to && element.to === item.owe) {
            const neTotal = item.amount - element.amount;
            a[i] = { owe: item.owe, to: item.to, amount: neTotal };
          } else if (arrNormalize.find(x => x.owe === element.owe && x.to === element.to) === undefined || arrNormalize.find(x => x.to === element.owe && x.owe === element.to === undefined)) {
            arrNormalize.push(element);
          }
        });
      }
    }
  });

  const arrOws = [];
  const settlementComb = [];
  // get owes value
  arrNormalize.forEach((element) => {
    if (element.amount < 0) {
      arrOws.push(`${element.to} owe ${element.owe} ${(round(Math.abs(element.amount)))}`);
      settlementComb.push(`${element.to} -> ${element.owe} = ${(round(Math.abs(element.amount)))}  `);
    }

    if (element.amount >= 0) {
      arrOws.push(`${element.owe} owe ${element.to} ${round(element.amount)}`);
      settlementComb.push(`${element.owe} -> ${element.to} = ${(round(element.amount))}  `);
    }
  });


  return {
    totalDays,
    totalAmountSpent,
    eachPersonSpentArr,
    eachPerosnOwsArr: arrNormalize,
    eachPerosnOws: arrOws,
    settlementComb


  };
};

