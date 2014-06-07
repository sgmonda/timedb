'use strict';

// Globals =====================================================================

var data = [];

// Core ========================================================================

/**
 * Adds some values to an instant
 * @param {number} ts     Timestamp
 * @param {array}  values Numeric values to store
 **/
function setValues (ts, values) {

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

function getValuesCount () {

	var count = 0;
	Object.keys(data).forEach(function (i) {
		if (Array.isArray(data[i])) {
			count += data[i].length;
		}
	});
	return count;
}

function clean () {

	data = [];
}

function print () {

	var indexes = Object.keys(data);
	var str = '\nData content:\n';
	str += indexes.map(function (i) {
		return i + ' -> ' + data[i];
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
