const talib = require('./ta-lib.asm.js');
talib.onRuntimeInitialized = () => {
    const numElements = 16;
    const inReal = talib._malloc(8 * numElements);

    const outBegNdx = talib._malloc(4);

    const outNBElement = talib._malloc(4);
    const outReal = talib._malloc(8 * numElements);

    const inBuffer = new Float64Array(talib['HEAPF64'].buffer, inReal, numElements);

    for (let n = 0; n < numElements; n++) {
        inBuffer[n] = n + 0.5;
    }

    /*
    TA_LIB_API TA_RetCode TA_SMA(
                   int    startIdx,
                   int    endIdx,
                   const double inReal[],
                   int           optInTimePeriod, // From 2 to 100000
                   int          *outBegIdx,
                   int          *outNBElement,
                   double        outReal[] );
    */
    talib._TA_SMA(1, numElements - 1, inReal, 2, outBegNdx, outNBElement, outReal);

    const outBuffer = new Float64Array(talib['HEAPF64'].buffer, outReal, numElements);
    console.log(outBuffer);

};