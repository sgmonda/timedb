/**
 *      _____ _           ___  ___ 
 *     |_   _(_)_ __  ___|   \| _ )
 *       | | | | '  \/ -_) |) | _ \
 *       |_| |_|_|_|_\___|___/|___/
 *    
 *     A simple time series database for NodeJS
 *
 *     Author: Sergio García Mondaray <sgmonda@gmail.com>
 *     Website: https://github.com/sgmonda/timedb
 *
 **/                             

'use strict';

// Dependencies ================================================================

var storage = require('./lib/storage');
var math = require('./lib/math');

// Globals =====================================================================

var constants = {

	FUNCTION_SUM: 1,
	FUNCTION_MEAN: 2,
	FUNCTION_COUNT: 3,
	FUNCTION_MAX: 4,
	FUNCTION_MIN: 5,
	FUNCTION_RANGE: 6
};

// Core ========================================================================

/**
 * TimeDB class
 * @param {string} name Database name
 **/
function TimeDB (name) {

	var self = this;

	// Static constants
	Object.keys(constants).forEach(function (constant) {
		self[constant] = constants[constant];
	});

	self.name = name || Math.random().toString(36).slice(2);

	/**
	 * Sets some values to an specified timestamp
	 **/
	self.set = function (ts, values) {

		if (!Array.isArray(values)) {
			values = [values];
		}

		values = values.map(function (v) {
			var number = parseFloat(v);
			if (!number || typeof number !== 'number') {
				throw new Error('Wrong number format: ' + v);
			}
			return number;
		});

		storage.setValues(ts, values);
	};

	/**
	 * Sets the current value(s)
	 **/
	self.setNow = function (value) {

		self.set(Date.now(), value);
	};

	/**
	 * Computes the serie
	 * @param {number} start      Timestamp to start
	 * @param {number} end        Timestamp to end
	 * @param {number} resolution Length of every interval in milliseconds
	 * @param {number} fun        Function to compute
	 **/
	self.compute = function (start, end, resolution, fun) {

		if (!fun) {
			throw new Error('Unknown function to compute: ' + fun);
		}

		var groups = {}, result = {}, group = 0, i, key;
		for (i = start; i <= end; i++) {
			group = start + (Math.floor((i - start) / resolution)) * resolution;
			groups[group] = (groups[group] || []).concat(self.get(i));
		}

		switch (fun) {

			case self.FUNCTION_SUM:
			for (key in groups) {
				result[key] = math.sum(groups[key]);
			}
			break;

			case self.FUNCTION_MEAN:
			for (key in groups) {
				if (groups[key].length === 0) {
					result[key] = 0;
				} else {
					result[key] = math.sum(groups[key]) / groups[key].length;
				}
			}
			break;

			case self.FUNCTION_COUNT:
			for (key in groups) {
				result[key] = groups[key].length;
			}
			break;

			case self.FUNCTION_MAX:
			for (key in groups) {
				result[key] = math.max(groups[key]);
			}
			break;

			case self.FUNCTION_MIN:
			for (key in groups) {
				result[key] = math.min(groups[key]);
			}
			break;

			case self.FUNCTION_RANGE:
			for (key in groups) {
				var max = math.max(groups[key]);
				var min = math.min(groups[key]);
				result[key] = max - min;
			}
			break;
		}

		return result;
	};

	/**
	 * Cleans the database, removing all its items
	 **/
	self.clean = function () {

		storage.clean();
	};

	/**
	 * Gets all individual points that are in the whole timestamp points set
	 * @returns {number} How many temporal values there are in total
	 **/
	self.getValuesCount = function () {

		return storage.getValuesCount();
	};

	/**
	 * Gets all set values for a timestamp
	 * @param {number} ts Timestamp to inspect
	 **/
	self.get = function (ts) {

		return storage.getValues(ts);
	};

	/**
	 * Gets the data timestamps count
	 * @returns {number} How many timestamps have been set
	 **/
	self.getSize = function () {

		return storage.getSize();
	};

	/**
	 * Prints the database content
	 **/
	self.print = function () {

		storage.print();
	};

	/**
	 * Computes a string to represent this object
	 * @returns {string} String representation
	 **/
	self.toString = function () {

		var description = '[TimeDB] ' + self.name;
		return description;
	};
}

// Exports =====================================================================

module.exports = TimeDB;
