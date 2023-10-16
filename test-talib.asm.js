var talib = require('./ta-lib.asm.js');
talib.onRuntimeInitialized = function() {
    var numElements = 16;
    var inReal = talib._malloc(8 * numElements);

    var outBegNdx = talib._malloc(4);

    var outNBElement = talib._malloc(4);
    var outReal = talib._malloc(8 * numElements);

    var inBuffer = new Float64Array(talib['HEAPF64'].buffer, inReal, numElements);

    
    for (let n = 0; n < numElements; n++) {
        inBuffer[n] = n + 0.5;
    }
    console.log(inBuffer);
    talib._TA_SMA(1, numElements - 1, inReal, 2, outBegNdx, outNBElement, outReal);

    var outBuffer = new Float64Array(talib['HEAPF64'].buffer, outReal, numElements - 1);
    console.log(outBuffer);
};