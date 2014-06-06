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

	it('Empty database size', function () {
		expect(db.getSize()).toBe(0);
	});

	it('1 elem, 1 value', function () {
		db.setNow(34);
		expect(db.getSize()).toBe(1);
	});

	it('1 elem, many values at once', function () {
		var ts = Date.now();
		db.set(ts, [1, 2, 3]);
		expect(JSON.stringify(db.get(ts))).toBe(JSON.stringify([1, 2, 3]));
	});

	it('1 elem, many simultaneous values', function () {
		var ts = Date.now();
		db.set(ts, [1, 2, 3]);
		db.set(ts, [1, 3]);
		expect(JSON.stringify(db.get(ts))).toBe(JSON.stringify([1, 2, 3, 1, 3]));
	});

	it('Many elements, many simultaneous values', function () {
		var ts1 = Date.now();
		var ts2 = ts1 + 1;
		db.set(ts1, [3, 3, 3]);
		db.set(ts1, [1, 5, 3]);
		db.set(ts2, 55);
		db.set(ts2, 1);
		expect(JSON.stringify(db.get(ts1))).toBe(JSON.stringify([3, 3, 3, 1, 5, 3]));
		expect(JSON.stringify(db.get(ts2))).toBe(JSON.stringify([55, 1]));
		expect(db.getSize()).toBe(2);
		expect(db.getValuesCount()).toBe(8);
	});

});
