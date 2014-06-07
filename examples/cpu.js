var os = require('os');
var TimeDB = require('../main.js');
var Canvas = require('term-canvas')

// Real time chart =============================================================

var size = process.stdout.getWindowSize();
var canvas = new Canvas(size[0], size[1]);
var ctx = canvas.getContext('2d');
ctx.hideCursor();

process.on('SIGINT', function(){
	ctx.reset();
	process.nextTick(function(){
		process.exit();
	});
});

function draw(data) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	data.forEach(function (value, index) {
		var columnWidth = Math.ceil((canvas.width) / data.length);
		var columnHeight = Math.ceil((canvas.height) * value);
		ctx.fillStyle = 'white';
		ctx.fillRect(columnWidth * index, canvas.height - columnHeight, columnWidth, columnHeight);
	});
}

// Time series database ========================================================

var cpuDB = new TimeDB('cpu', 1000 * 10);
var startMeasure = null;

function cpuAverage() {

	var totalIdle = 0, totalTick = 0;
	var cpus = os.cpus();

	for (var i = 0, len = cpus.length; i < len; i++) {
		var cpu = cpus[i];
		for(type in cpu.times) {
			totalTick += cpu.times[type];
		}     
		totalIdle += cpu.times.idle;
	}
	
	return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
}

startMeasure = cpuAverage();
setInterval(function() { 
	
	var endMeasure = cpuAverage(); 
	var idleDifference = endMeasure.idle - startMeasure.idle;
	var totalDifference = endMeasure.total - startMeasure.total;
	var percentageCPU = (100 - ~~(100 * idleDifference / totalDifference)) / 100;

	cpuDB.setNow(percentageCPU);
}, 50);

setInterval(function () {

	var raw = cpuDB.compute(Date.now() - 1000 * 10, Date.now(), 100, cpuDB.FUNCTION_MEAN);
	var dataAsArray = [];
	for (var ts in raw) {
		dataAsArray.push(raw[ts]);
	}
	//console.log(dataAsArray);
	draw(dataAsArray);

}, 100);


