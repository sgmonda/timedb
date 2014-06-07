/* global describe, it, expect, beforeEach, afterEach */

'use strict';

var TimeDB = require('../main.js');

describe('Compute mean', function () {

	var db = null;

	beforeEach(function () {
		db = new TimeDB();
	});

	afterEach(function () {
		db.clean();
	});

	it('Empty mean', function () {
		
		var result;

		result = db.compute(12, 133, 20, db.FUNCTION_MEAN);
		expect(JSON.stringify(result)).toBe(JSON.stringify({12: 0, 32: 0, 52: 0, 72: 0, 92: 0, 112: 0, 132: 0}));
	});

	it('Tiny mean', function () {
		
		db.set(104, [1, 2, 8]);
		db.set(107, [3, 3]);
		db.set(115, 2);
		db.set(200, [1, 2, 3]);

		var result;

		result = db.compute(100, 150, 13, db.FUNCTION_MEAN);
		expect(JSON.stringify(result)).toBe(JSON.stringify({100: 3.4, 113: 2, 126: 0, 139: 0}));

		result = db.compute(102, 213, 17, db.FUNCTION_MEAN);
		expect(JSON.stringify(result)).toBe(JSON.stringify({102: 19/6, 119: 0, 136: 0, 153: 0, 170: 0, 187: 2, 204: 0}));
	});

});
