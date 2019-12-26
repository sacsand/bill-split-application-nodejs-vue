
import { expect } from 'chai';
import { describe, it } from 'mocha';
// import sayHello from '../src/index';
import { cal } from '../src/lib/cal';

describe('testing for total value', () => {
  describe('total value output', () => {
    it('total should be equal to each person spent', async () => {
      const data =
      { data: [
        { day: 1,
          amount: 50,
          paidBy: 'tanu',
          friends: ['kasun', 'tanu']
        },
        { day: 2,
          amount: 100,
          paidBy: 'kasun',
          friends: ['kasun', 'tanu', 'shakeel']
        },
        { day: 3,
          amount: 100,
          paidBy: 'shakeel',
          friends: ['shakeel', 'tanu', 'shakeel']
        }
      ] };
      const str = await cal(data);

      const { totalAmountSpent, eachPersonSpentArr } = str;
      let total = 0;
      eachPersonSpentArr.forEach((element) => {
        total += element.total;
      });

      expect(totalAmountSpent).to.equal(total);
    });
  });
});

