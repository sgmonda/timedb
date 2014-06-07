'use strict';

// Globals =====================================================================



// Core ========================================================================

function sum (array) {

	if (!Array.isArray(array)) {
		return array;
	}
	var sum = array.reduce(function (prev, curr) {
		return prev + curr;
	}, 0);
	return sum;
}

function max (array) {

	if (!Array.isArray(array)) {
		return 0;
	}

	var max = array.reduce(function (max, value) {
		if (value > max) {
			return value;
		}
		return max;
	}, 0);

	return max;
}

function min (array) {

	if (!Array.isArray(array)) {
		return 0;
	}

	var min = array.reduce(function (min, value) {
		if (value < min) {
			return value;
		}
		return min;
	}, Infinity);
	if (min === Infinity) {
		min = 0;
	}

	return min;
}

// Exports =====================================================================

exports.sum = sum;
exports.min = min;
exports.max = max;
