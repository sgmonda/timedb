'use strict';

// Globals =====================================================================

var data = {};

// Core ========================================================================

/**
 * Adds some values to an instant
 * @param {number} ts       Timestamp
 * @param {array}  values   Numeric values to store
 * @param {number} duration Oldest allowed timestamp antiquity
 **/
function setValues (ts, values, duration) {

	if (duration) {

		var durationMs = parseInt(duration);
		if (typeof durationMs !== 'number') {
			throw new Error('Wrong duration format: ' + durationMs);
		}

		if (ts < Date.now() - durationMs) {
			return;
		}
		setTimeout(function () {
			delete data[ts];
		}, durationMs);
	}
	data[ts] = (data[ts] || []).concat(values);
}

/**
 * Get the values associated with a timestamp
 * @param {number} ts Timestamp
 **/
function getValues (ts) {

	return data[ts] || [];
}

/**
 * Computes the size of all data
 **/
function getSize () {

	// Note: This may cause problems if Array prototype is modified
	return Object.keys(data).length;
}

/**
 * Computes the count of total data points stored
 **/
function getValuesCount () {

	var count = 0;
	Object.keys(data).forEach(function (i) {
		if (Array.isArray(data[i])) {
			count += data[i].length;
		}
	});
	return count;
}

/**
 * Removes all data points from the database
 **/
function clean () {

	data = [];
}

/**
 * Prints the database content
 **/
function print () {

	var indexes = Object.keys(data);
	var str = '\nData content:\n';
	str += indexes.map(function (i) {
		var ts = parseInt(i);
		return new Date(ts).toISOString() + ' -> [' + data[i].join(', ') + ']';
	}).join('\n');
	console.log(str);
}

// Exports =====================================================================

exports.setValues = setValues;
exports.getValues = getValues;
exports.getSize = getSize;
exports.clean = clean;
exports.getValuesCount = getValuesCount;
exports.print = print;
