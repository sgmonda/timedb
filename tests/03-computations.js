/* global describe, it, expect, beforeEach, afterEach */

'use strict';

var TimeDB = require('../main.js');

describe('Basic tests', function () {

	var db = null;

	beforeEach(function () {
		db = new TimeDB();
	});

	afterEach(function () {
		db.clean();
	});

	it('Empty sum', function () {

		var result = db.compute(0, 5, 1, db.FUNCTION_SUM);
		expect(JSON.stringify(result)).toBe(JSON.stringify({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}));

		result = db.compute(0, 6, 2, db.FUNCTION_SUM);
		expect(JSON.stringify(result)).toBe(JSON.stringify({0: 0, 2: 0, 4: 0, 6: 0}));

		result = db.compute(0, 21, 5, db.FUNCTION_SUM);
		expect(JSON.stringify(result)).toBe(JSON.stringify({0: 0, 5: 0, 10: 0, 15: 0, 20: 0}));
	});

	it('Small sum', function () {

		db.set(0, [3, 4]);
		db.set(1, 1);
		db.set(2, 1);
		db.set(3, [2]);
		var result = db.compute(0, 5, 2, db.FUNCTION_SUM);
		expect(JSON.stringify(result)).toBe(JSON.stringify({0: 8, 2: 3, 4: 0}));

		db.set(4, [2, 2, 2]);
		db.set(5, 1);
		result = db.compute(0, 5, 2, db.FUNCTION_SUM);
		expect(JSON.stringify(result)).toBe(JSON.stringify({0: 8, 2: 3, 4: 7}));
	});

	it('Out of margins sums', function () {

		db.set(0, [3, 4]);
		db.set(1, 1);
		db.set(2, 1);
		db.set(3, [2]);
		var result = db.compute(1, 8, 2, db.FUNCTION_SUM);
		expect(JSON.stringify(result)).toBe(JSON.stringify({1: 2, 3: 2, 5: 0, 7: 0})); // This test fails
	});

});
