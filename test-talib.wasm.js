var fs = require('fs');
WebAssembly.instantiate(fs.readFileSync('./ta-lib.wasm'),
    {
        env: {
            emscripten_resize_heap: function () { }
        }
    }).then(function (mod) {

        var talib = mod.instance.exports;

        var numElements = 16;
        var inReal = talib.malloc(8 * numElements);

        var outBegNdx = talib.malloc(4);

        var outNBElement = talib.malloc(4);
        var outReal = talib.malloc(8 * numElements);

        var inBuffer = new Float64Array(talib.memory.buffer, inReal, numElements);

        for (let n = 0; n < numElements; n++) {
            inBuffer[n] = n + 0.5;
        }

        talib.TA_SMA(1, numElements - 1, inReal, 2, outBegNdx, outNBElement, outReal);
        var outBuffer = new Float64Array(talib.memory.buffer, outReal, numElements - 1);
        console.log(outBuffer);
    });