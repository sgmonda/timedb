/* global describe, it, expect */

'use strict';

var TimeDB = require('../main.js');

describe('Antiquity', function () {

	it('Lapsed key added', function () {

		var db = new TimeDB('test', 1000);

		var value = Math.random();
		db.set(Date.now() - 1001, value);
		expect(db.getValuesCount()).toBe(0);
	});

	it('Antiquity of 1ms', function (done) {

		var db = new TimeDB('test', 1000);

		var value = Math.random();
		db.setNow(value);

		expect(db.getValuesCount()).toBe(1);
		setTimeout(function () {
			expect(db.getValuesCount()).toBe(0);
			done();
		}, 1000);
	});
});

