qif
===

*qif* is a simple js library for working with [Quicken Interchange Format (.qif)](http://en.wikipedia.org/wiki/Quicken_Interchange_Format) data.  I wrote this library because I needed to programatically create/write .qif files. For parsing/reading qif, see the [qif2json](https://www.npmjs.org/package/qif2json) library.  The reason I didn't add the functionality to that library is that it appears to have dependencies on python and I wanted something really simple in pure js.  The library currently only supports outputting qif from a js object model.

### Install

    npm install qif


### Usage

Convert an array of transaction objects (only cash accounts currently supported) to qif in memory. 
	
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

	var qif = require('qif');
	var qifData = qif.write(transactions);
    console.log(qifData);

...or to a file

	var transactions = {};

	var qif = require('qif');	
	qif.writeToFile(transactions, './out.qif', function (err, qifData) {});


output
    
    !Type:Cash
    D3/7/2014
    T-213.39
    PKroger
    N123
    LGroceries
    Mthis is a memo
    ^
    D3/6/2014
    T-8.16
    PStarbucks
    N456
    LDining Out:Coffee
    ^
