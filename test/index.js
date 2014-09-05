var assert = require('assert');
var fs = require('fs');
var qif = require('../index.js');

var results = '!Type:Cash\r\n\
D3/7/2014\r\n\
T-213.39\r\n\
PKroger\r\n\
N123\r\n\
LGroceries\r\n\
Mthis is a memo\r\n\
^\r\n\
D3/6/2014\r\n\
T-8.16\r\n\
PStarbucks\r\n\
N456\r\n\
LDining Out:Coffee\r\n\
^\r\n\
';

var transactions = {
  cash: [
    {
      date: '3/7/2014',
      amount: -213.39,
      payee: 'Kroger',
      memo: 'this is a memo', 
      category: 'Groceries',
      checknumber: 123
    }, 
    {
      date: '3/6/2014',
      amount: -8.16,
      payee: 'Starbucks',
      category: 'Dining Out:Coffee',
      checknumber: 456
    }      
  ]
};

describe('qif', function() {

  describe('write()', function() {    

    it('should write data to qif', function() {

      var qifData = qif.write(transactions);
        
      assert.equal(qifData, results);
    });

  });

  describe('writeToFile()', function() {    

    it('should write data to qif file', function (done) {

      var file = './test.qif';
      qif.writeToFile(transactions, file, function (err, qifData) {
        if (err) throw err;

        assert.equal(qifData, results);

        var qifData = fs.readFileSync(file);
        assert.equal(qifData, results);

        done();
      });        
      
    });

  });  

});