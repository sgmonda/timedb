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

// Exports =====================================================================

exports.sum = sum;
