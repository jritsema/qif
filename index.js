module.exports = (function () {

  'use strict';

  var fs = require('fs');

  function writeField(code, value) {
    var result = '';
    if (value) {
      result += code;
      result += value;
      result += '\r\n';
    }
    return result;
  }

  var write = function (transactions) {
    var result;
    if (transactions && transactions.cash) {
      result = '!Type:Cash\r\n';
      for (var i = 0; i < transactions.cash.length; i++) {
        var transaction = transactions.cash[i];
        result += writeField('D', transaction.date);
        result += writeField('T', transaction.amount);
        result += writeField('P', transaction.payee);
        result += writeField('N', transaction.checknumber);
        result += writeField('L', transaction.category);
        result += writeField('M', transaction.memo);
        result += '^\r\n';
      };
    }
    return result;
  };

  var writeToFile = function (transactions, file, callback) {
    var data = write(transactions);
    fs.writeFile(file, data, function (err) {
      if (err) throw err;
      callback(undefined, data);
    });
  };

  return {
    write: write,
    writeToFile: writeToFile
  };

})();
