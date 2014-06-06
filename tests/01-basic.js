/* global describe, it, expect */

'use strict';

var TimeDB = require('../main.js');

describe('Basic tests', function () {

	it('Database creation', function () {
		var name = 'test-database';
		var db = new TimeDB(name);
		expect(db.name).toBe(name);
	});

});
