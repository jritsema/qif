var assert = require('assert');
var qif = require('../index.js');

var results = '!Type:Cash\r\n\
D3/7/2014\r\n\
T-213.39\r\n\
PKroger\r\n\
LGroceries\r\n\
Mthis is a memo\r\n\
^\r\n\
D3/6/2014\r\n\
T-8.16\r\n\
PStarbucks\r\n\
LDining Out:Coffee\r\n\
^\r\n\
';

describe('qif', function() {

  describe('write()', function() {    

    it('should write data to qif', function() {

      var transactions = {
        cash: [
          {
            date: '3/7/2014',
            amount: -213.39,
            payee: 'Kroger',
            memo: 'this is a memo', 
            category: 'Groceries'
          }, 
          {
            date: '3/6/2014',
            amount: -8.16,
            payee: 'Starbucks',
            category: 'Dining Out:Coffee'
          }      
        ]
      };

      var qifData = qif.write(transactions);
        
      assert.equal(qifData, results);
    });

  });

});