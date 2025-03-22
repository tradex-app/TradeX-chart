/**
 * The `MAType` enum to be passed to some of the functions
 */
export declare enum MAType {
    SMA = 0,
    EMA = 1,
    WMA = 2,
    DEMA = 3,
    TEMA = 4,
    TRIMA = 5,
    KAMA = 6,
    MAMA = 7,
    T3 = 8
}
/**
 * ## Initialize wasm module
 *
 * To use the lib, you must first call `init()` to load and compile the wasm binary file in the JS runtime.
 * Because of the async nature of wasm binary loading/compilation process,
 * you must wait until the compilation complete before calling any functions.
 *
 * `init()` is idempotent, that means calling it multiple times will NOT re-initialize
 * or create new instance of the wasm module.
 *
 * ### Usage
 *
 * Normally you would just want to be notified when ready:
 * ```
 * import { init, EMA } from 'talib-web';
 *
 * await init();
 * EMA(...);
 * ```
 *
 * In case you want to directly interact with the emscripten wasm [Module API](https://emscripten.org/docs/api_reference/module.html),
 * just obtain the `Module` object from the promise.
 * ```
 * const Module = await init()
 * Module.ccall(...)
 * Module._malloc(...)
 * Module.HEAPF64
 * ```
 *
 * @category Initialization
 * @param wasmBinaryFilePath - optional, a string that specifies the location of wasm binary file
 * @returns A promise that resolves to the emscripten runtime `Module` object. See {@link https://emscripten.org/docs/api_reference/module.html}.
 */
export declare function init(wasmBinaryFilePath?: string): Promise<any>;
/**
 * Acceleration Bands
 *
 * @alias accBands
 * @category Overlap Studies
 */
export declare function ACCBANDS(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 20
     */
    timePeriod?: number;
}): {
    upperBand: number[];
    middleBand: number[];
    lowerBand: number[];
};
/** @hidden */
export declare const accBands: typeof ACCBANDS;
/**
 * Vector Trigonometric ACos
 *
 * @alias acos
 * @category Math Transform
 */
export declare function ACOS(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const acos: typeof ACOS;
/**
 * Chaikin A/D Line
 *
 * @alias ad
 * @category Volume Indicators
 */
export declare function AD(params: {
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const ad: typeof AD;
/**
 * Vector Arithmetic Add
 *
 * @alias add
 * @category Math Operators
 */
export declare function ADD(params: {
    inReal0: number[];
    inReal1: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const add: typeof ADD;
/**
 * Chaikin A/D Oscillator
 *
 * @alias adOsc
 * @category Volume Indicators
 */
export declare function ADOSC(params: {
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
    /**
     * Fast Period
     * Number of period for the fast MA. (Integer, min: 2, max: 100000)
     * @defaultValue 3
     */
    fastPeriod?: number;
    /**
     * Slow Period
     * Number of period for the slow MA. (Integer, min: 2, max: 100000)
     * @defaultValue 10
     */
    slowPeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const adOsc: typeof ADOSC;
/**
 * Average Directional Movement Index
 *
 * @alias adx
 * @category Momentum Indicators
 */
export declare function ADX(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const adx: typeof ADX;
/**
 * Average Directional Movement Index Rating
 *
 * @alias adxr
 * @category Momentum Indicators
 */
export declare function ADXR(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const adxr: typeof ADXR;
/**
 * Absolute Price Oscillator
 *
 * @alias apo
 * @category Momentum Indicators
 */
export declare function APO(params: {
    inReal: number[];
    /**
     * Fast Period
     * Number of period for the fast MA. (Integer, min: 2, max: 100000)
     * @defaultValue 12
     */
    fastPeriod?: number;
    /**
     * Slow Period
     * Number of period for the slow MA. (Integer, min: 2, max: 100000)
     * @defaultValue 26
     */
    slowPeriod?: number;
    /**
     * MA Type
     * Type of Moving Average. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    MAType?: MAType;
}): {
    output: number[];
};
/** @hidden */
export declare const apo: typeof APO;
/**
 * Aroon
 *
 * @alias aroon
 * @category Momentum Indicators
 */
export declare function AROON(params: {
    high: number[];
    low: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    aroonDown: number[];
    aroonUp: number[];
};
/** @hidden */
export declare const aroon: typeof AROON;
/**
 * Aroon Oscillator
 *
 * @alias aroonOsc
 * @category Momentum Indicators
 */
export declare function AROONOSC(params: {
    high: number[];
    low: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const aroonOsc: typeof AROONOSC;
/**
 * Vector Trigonometric ASin
 *
 * @alias asin
 * @category Math Transform
 */
export declare function ASIN(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const asin: typeof ASIN;
/**
 * Vector Trigonometric ATan
 *
 * @alias atan
 * @category Math Transform
 */
export declare function ATAN(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const atan: typeof ATAN;
/**
 * Average True Range
 *
 * @alias atr
 * @category Volatility Indicators
 */
export declare function ATR(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const atr: typeof ATR;
/**
 * Average Deviation
 *
 * @alias avgDev
 * @category Price Transform
 */
export declare function AVGDEV(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const avgDev: typeof AVGDEV;
/**
 * Average Price
 *
 * @alias avgPrice
 * @category Price Transform
 */
export declare function AVGPRICE(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const avgPrice: typeof AVGPRICE;
/**
 * Bollinger Bands
 *
 * @alias bbands
 * @category Overlap Studies
 */
export declare function BBANDS(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 5
     */
    timePeriod?: number;
    /**
     * Deviations up
     * Deviation multiplier for upper band. (Double, min: -3e+37, max: 3e+37)
     * @defaultValue 2
     */
    nbDevUp?: number;
    /**
     * Deviations down
     * Deviation multiplier for lower band. (Double, min: -3e+37, max: 3e+37)
     * @defaultValue 2
     */
    nbDevDn?: number;
    /**
     * MA Type
     * Type of Moving Average. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    MAType?: MAType;
}): {
    upperBand: number[];
    middleBand: number[];
    lowerBand: number[];
};
/** @hidden */
export declare const bbands: typeof BBANDS;
/**
 * Beta
 *
 * @alias beta
 * @category Statistic Functions
 */
export declare function BETA(params: {
    inReal0: number[];
    inReal1: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 5
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const beta: typeof BETA;
/**
 * Balance Of Power
 *
 * @alias bop
 * @category Momentum Indicators
 */
export declare function BOP(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const bop: typeof BOP;
/**
 * Commodity Channel Index
 *
 * @alias cci
 * @category Momentum Indicators
 */
export declare function CCI(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const cci: typeof CCI;
/**
 * Two Crows
 *
 * @alias cdl2Crows
 * @category Pattern Recognition
 */
export declare function CDL2CROWS(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdl2Crows: typeof CDL2CROWS;
/**
 * Three Black Crows
 *
 * @alias cdl3BlackCrows
 * @category Pattern Recognition
 */
export declare function CDL3BLACKCROWS(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdl3BlackCrows: typeof CDL3BLACKCROWS;
/**
 * Three Inside Up/Down
 *
 * @alias cdl3Inside
 * @category Pattern Recognition
 */
export declare function CDL3INSIDE(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdl3Inside: typeof CDL3INSIDE;
/**
 * Three-Line Strike
 *
 * @alias cdl3LineStrike
 * @category Pattern Recognition
 */
export declare function CDL3LINESTRIKE(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdl3LineStrike: typeof CDL3LINESTRIKE;
/**
 * Three Outside Up/Down
 *
 * @alias cdl3Outside
 * @category Pattern Recognition
 */
export declare function CDL3OUTSIDE(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdl3Outside: typeof CDL3OUTSIDE;
/**
 * Three Stars In The South
 *
 * @alias cdl3StarsInSouth
 * @category Pattern Recognition
 */
export declare function CDL3STARSINSOUTH(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdl3StarsInSouth: typeof CDL3STARSINSOUTH;
/**
 * Three Advancing White Soldiers
 *
 * @alias cdl3WhiteSoldiers
 * @category Pattern Recognition
 */
export declare function CDL3WHITESOLDIERS(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdl3WhiteSoldiers: typeof CDL3WHITESOLDIERS;
/**
 * Abandoned Baby
 *
 * @alias cdlAbandonedBaby
 * @category Pattern Recognition
 */
export declare function CDLABANDONEDBABY(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    /**
     * Penetration
     * Percentage of penetration of a candle within another candle. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.3
     */
    penetration?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const cdlAbandonedBaby: typeof CDLABANDONEDBABY;
/**
 * Advance Block
 *
 * @alias cdlAdvanceBlock
 * @category Pattern Recognition
 */
export declare function CDLADVANCEBLOCK(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlAdvanceBlock: typeof CDLADVANCEBLOCK;
/**
 * Belt-hold
 *
 * @alias cdlBeltHold
 * @category Pattern Recognition
 */
export declare function CDLBELTHOLD(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlBeltHold: typeof CDLBELTHOLD;
/**
 * Breakaway
 *
 * @alias cdlBreakaway
 * @category Pattern Recognition
 */
export declare function CDLBREAKAWAY(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlBreakaway: typeof CDLBREAKAWAY;
/**
 * Closing Marubozu
 *
 * @alias cdlClosingMarubozu
 * @category Pattern Recognition
 */
export declare function CDLCLOSINGMARUBOZU(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlClosingMarubozu: typeof CDLCLOSINGMARUBOZU;
/**
 * Concealing Baby Swallow
 *
 * @alias cdlConcealBabysWall
 * @category Pattern Recognition
 */
export declare function CDLCONCEALBABYSWALL(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlConcealBabysWall: typeof CDLCONCEALBABYSWALL;
/**
 * Counterattack
 *
 * @alias cdlCounterAttack
 * @category Pattern Recognition
 */
export declare function CDLCOUNTERATTACK(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlCounterAttack: typeof CDLCOUNTERATTACK;
/**
 * Dark Cloud Cover
 *
 * @alias cdlDarkCloudCover
 * @category Pattern Recognition
 */
export declare function CDLDARKCLOUDCOVER(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    /**
     * Penetration
     * Percentage of penetration of a candle within another candle. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.5
     */
    penetration?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const cdlDarkCloudCover: typeof CDLDARKCLOUDCOVER;
/**
 * Doji
 *
 * @alias cdlDoji
 * @category Pattern Recognition
 */
export declare function CDLDOJI(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlDoji: typeof CDLDOJI;
/**
 * Doji Star
 *
 * @alias cdlDojiStar
 * @category Pattern Recognition
 */
export declare function CDLDOJISTAR(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlDojiStar: typeof CDLDOJISTAR;
/**
 * Dragonfly Doji
 *
 * @alias cdlDragonflyDoji
 * @category Pattern Recognition
 */
export declare function CDLDRAGONFLYDOJI(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlDragonflyDoji: typeof CDLDRAGONFLYDOJI;
/**
 * Engulfing Pattern
 *
 * @alias cdlEngulfing
 * @category Pattern Recognition
 */
export declare function CDLENGULFING(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlEngulfing: typeof CDLENGULFING;
/**
 * Evening Doji Star
 *
 * @alias cdlEveningDojiStar
 * @category Pattern Recognition
 */
export declare function CDLEVENINGDOJISTAR(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    /**
     * Penetration
     * Percentage of penetration of a candle within another candle. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.3
     */
    penetration?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const cdlEveningDojiStar: typeof CDLEVENINGDOJISTAR;
/**
 * Evening Star
 *
 * @alias cdlEveningStar
 * @category Pattern Recognition
 */
export declare function CDLEVENINGSTAR(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    /**
     * Penetration
     * Percentage of penetration of a candle within another candle. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.3
     */
    penetration?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const cdlEveningStar: typeof CDLEVENINGSTAR;
/**
 * Up/Down-gap side-by-side white lines
 *
 * @alias cdlGapSideSideWhite
 * @category Pattern Recognition
 */
export declare function CDLGAPSIDESIDEWHITE(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlGapSideSideWhite: typeof CDLGAPSIDESIDEWHITE;
/**
 * Gravestone Doji
 *
 * @alias cdlGravestoneDoji
 * @category Pattern Recognition
 */
export declare function CDLGRAVESTONEDOJI(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlGravestoneDoji: typeof CDLGRAVESTONEDOJI;
/**
 * Hammer
 *
 * @alias cdlHammer
 * @category Pattern Recognition
 */
export declare function CDLHAMMER(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlHammer: typeof CDLHAMMER;
/**
 * Hanging Man
 *
 * @alias cdlHangingMan
 * @category Pattern Recognition
 */
export declare function CDLHANGINGMAN(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlHangingMan: typeof CDLHANGINGMAN;
/**
 * Harami Pattern
 *
 * @alias cdlHarami
 * @category Pattern Recognition
 */
export declare function CDLHARAMI(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlHarami: typeof CDLHARAMI;
/**
 * Harami Cross Pattern
 *
 * @alias cdlHaramiCross
 * @category Pattern Recognition
 */
export declare function CDLHARAMICROSS(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlHaramiCross: typeof CDLHARAMICROSS;
/**
 * High-Wave Candle
 *
 * @alias cdlHignWave
 * @category Pattern Recognition
 */
export declare function CDLHIGHWAVE(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlHignWave: typeof CDLHIGHWAVE;
/**
 * Hikkake Pattern
 *
 * @alias cdlHikkake
 * @category Pattern Recognition
 */
export declare function CDLHIKKAKE(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlHikkake: typeof CDLHIKKAKE;
/**
 * Modified Hikkake Pattern
 *
 * @alias cdlHikkakeMod
 * @category Pattern Recognition
 */
export declare function CDLHIKKAKEMOD(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlHikkakeMod: typeof CDLHIKKAKEMOD;
/**
 * Homing Pigeon
 *
 * @alias cdlHomingPigeon
 * @category Pattern Recognition
 */
export declare function CDLHOMINGPIGEON(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlHomingPigeon: typeof CDLHOMINGPIGEON;
/**
 * Identical Three Crows
 *
 * @alias cdlIdentical3Crows
 * @category Pattern Recognition
 */
export declare function CDLIDENTICAL3CROWS(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlIdentical3Crows: typeof CDLIDENTICAL3CROWS;
/**
 * In-Neck Pattern
 *
 * @alias cdlInNeck
 * @category Pattern Recognition
 */
export declare function CDLINNECK(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlInNeck: typeof CDLINNECK;
/**
 * Inverted Hammer
 *
 * @alias cdlInvertedHammer
 * @category Pattern Recognition
 */
export declare function CDLINVERTEDHAMMER(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlInvertedHammer: typeof CDLINVERTEDHAMMER;
/**
 * Kicking
 *
 * @alias cdlKicking
 * @category Pattern Recognition
 */
export declare function CDLKICKING(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlKicking: typeof CDLKICKING;
/**
 * Kicking - bull/bear determined by the longer marubozu
 *
 * @alias cdlKickingByLength
 * @category Pattern Recognition
 */
export declare function CDLKICKINGBYLENGTH(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlKickingByLength: typeof CDLKICKINGBYLENGTH;
/**
 * Ladder Bottom
 *
 * @alias cdlLadderBottom
 * @category Pattern Recognition
 */
export declare function CDLLADDERBOTTOM(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlLadderBottom: typeof CDLLADDERBOTTOM;
/**
 * Long Legged Doji
 *
 * @alias cdlLongLeggedDoji
 * @category Pattern Recognition
 */
export declare function CDLLONGLEGGEDDOJI(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlLongLeggedDoji: typeof CDLLONGLEGGEDDOJI;
/**
 * Long Line Candle
 *
 * @alias cdlLongLine
 * @category Pattern Recognition
 */
export declare function CDLLONGLINE(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlLongLine: typeof CDLLONGLINE;
/**
 * Marubozu
 *
 * @alias cdlMarubozu
 * @category Pattern Recognition
 */
export declare function CDLMARUBOZU(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlMarubozu: typeof CDLMARUBOZU;
/**
 * Matching Low
 *
 * @alias cdlMatchingLow
 * @category Pattern Recognition
 */
export declare function CDLMATCHINGLOW(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlMatchingLow: typeof CDLMATCHINGLOW;
/**
 * Mat Hold
 *
 * @alias cdlMatHold
 * @category Pattern Recognition
 */
export declare function CDLMATHOLD(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    /**
     * Penetration
     * Percentage of penetration of a candle within another candle. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.5
     */
    penetration?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const cdlMatHold: typeof CDLMATHOLD;
/**
 * Morning Doji Star
 *
 * @alias cdlMorningDojiStar
 * @category Pattern Recognition
 */
export declare function CDLMORNINGDOJISTAR(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    /**
     * Penetration
     * Percentage of penetration of a candle within another candle. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.3
     */
    penetration?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const cdlMorningDojiStar: typeof CDLMORNINGDOJISTAR;
/**
 * Morning Star
 *
 * @alias cdlMorningStar
 * @category Pattern Recognition
 */
export declare function CDLMORNINGSTAR(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
    /**
     * Penetration
     * Percentage of penetration of a candle within another candle. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.3
     */
    penetration?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const cdlMorningStar: typeof CDLMORNINGSTAR;
/**
 * On-Neck Pattern
 *
 * @alias cdlOnNeck
 * @category Pattern Recognition
 */
export declare function CDLONNECK(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlOnNeck: typeof CDLONNECK;
/**
 * Piercing Pattern
 *
 * @alias cdlPiercing
 * @category Pattern Recognition
 */
export declare function CDLPIERCING(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlPiercing: typeof CDLPIERCING;
/**
 * Rickshaw Man
 *
 * @alias cdlRickshawMan
 * @category Pattern Recognition
 */
export declare function CDLRICKSHAWMAN(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlRickshawMan: typeof CDLRICKSHAWMAN;
/**
 * Rising/Falling Three Methods
 *
 * @alias cdlRiseFall3Methods
 * @category Pattern Recognition
 */
export declare function CDLRISEFALL3METHODS(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlRiseFall3Methods: typeof CDLRISEFALL3METHODS;
/**
 * Separating Lines
 *
 * @alias cdlSeperatingLines
 * @category Pattern Recognition
 */
export declare function CDLSEPARATINGLINES(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlSeperatingLines: typeof CDLSEPARATINGLINES;
/**
 * Shooting Star
 *
 * @alias cdlShootingStar
 * @category Pattern Recognition
 */
export declare function CDLSHOOTINGSTAR(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlShootingStar: typeof CDLSHOOTINGSTAR;
/**
 * Short Line Candle
 *
 * @alias cdlShortLine
 * @category Pattern Recognition
 */
export declare function CDLSHORTLINE(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlShortLine: typeof CDLSHORTLINE;
/**
 * Spinning Top
 *
 * @alias cdlSpinningTop
 * @category Pattern Recognition
 */
export declare function CDLSPINNINGTOP(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlSpinningTop: typeof CDLSPINNINGTOP;
/**
 * Stalled Pattern
 *
 * @alias cdlStalledPattern
 * @category Pattern Recognition
 */
export declare function CDLSTALLEDPATTERN(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlStalledPattern: typeof CDLSTALLEDPATTERN;
/**
 * Stick Sandwich
 *
 * @alias cdlStickSandwhich
 * @category Pattern Recognition
 */
export declare function CDLSTICKSANDWICH(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlStickSandwhich: typeof CDLSTICKSANDWICH;
/**
 * Takuri (Dragonfly Doji with very long lower shadow)
 *
 * @alias cdlTakuri
 * @category Pattern Recognition
 */
export declare function CDLTAKURI(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlTakuri: typeof CDLTAKURI;
/**
 * Tasuki Gap
 *
 * @alias cdlTasukiGap
 * @category Pattern Recognition
 */
export declare function CDLTASUKIGAP(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlTasukiGap: typeof CDLTASUKIGAP;
/**
 * Thrusting Pattern
 *
 * @alias cdlThrusting
 * @category Pattern Recognition
 */
export declare function CDLTHRUSTING(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlThrusting: typeof CDLTHRUSTING;
/**
 * Tristar Pattern
 *
 * @alias cdlTristar
 * @category Pattern Recognition
 */
export declare function CDLTRISTAR(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlTristar: typeof CDLTRISTAR;
/**
 * Unique 3 River
 *
 * @alias cdlUnique3River
 * @category Pattern Recognition
 */
export declare function CDLUNIQUE3RIVER(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlUnique3River: typeof CDLUNIQUE3RIVER;
/**
 * Upside Gap Two Crows
 *
 * @alias cdlUpsideGap2Crows
 * @category Pattern Recognition
 */
export declare function CDLUPSIDEGAP2CROWS(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlUpsideGap2Crows: typeof CDLUPSIDEGAP2CROWS;
/**
 * Upside/Downside Gap Three Methods
 *
 * @alias cdlXSideGap3Methods
 * @category Pattern Recognition
 */
export declare function CDLXSIDEGAP3METHODS(params: {
    open: number[];
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cdlXSideGap3Methods: typeof CDLXSIDEGAP3METHODS;
/**
 * Vector Ceil
 *
 * @alias ceil
 * @category Math Transform
 */
export declare function CEIL(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const ceil: typeof CEIL;
/**
 * Chande Momentum Oscillator
 *
 * @alias cmo
 * @category Momentum Indicators
 */
export declare function CMO(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const cmo: typeof CMO;
/**
 * Pearson's Correlation Coefficient (r)
 *
 * @alias correl
 * @category Statistic Functions
 */
export declare function CORREL(params: {
    inReal0: number[];
    inReal1: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const correl: typeof CORREL;
/**
 * Vector Trigonometric Cos
 *
 * @alias cos
 * @category Math Transform
 */
export declare function COS(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cos: typeof COS;
/**
 * Vector Trigonometric Cosh
 *
 * @alias cosh
 * @category Math Transform
 */
export declare function COSH(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const cosh: typeof COSH;
/**
 * Double Exponential Moving Average
 *
 * @alias dema
 * @category Overlap Studies
 */
export declare function DEMA(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const dema: typeof DEMA;
/**
 * Vector Arithmetic Div
 *
 * @alias div
 * @category Math Operators
 */
export declare function DIV(params: {
    inReal0: number[];
    inReal1: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const div: typeof DIV;
/**
 * Directional Movement Index
 *
 * @alias dx
 * @category Momentum Indicators
 */
export declare function DX(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const dx: typeof DX;
/**
 * Exponential Moving Average
 *
 * @alias ema
 * @category Overlap Studies
 */
export declare function EMA(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const ema: typeof EMA;
/**
 * Vector Arithmetic Exp
 *
 * @alias exp
 * @category Math Transform
 */
export declare function EXP(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const exp: typeof EXP;
/**
 * Vector Floor
 *
 * @alias floor
 * @category Math Transform
 */
export declare function FLOOR(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const floor: typeof FLOOR;
/**
 * Hilbert Transform - Dominant Cycle Period
 *
 * @alias htDcPeriod
 * @category Cycle Indicators
 */
export declare function HT_DCPERIOD(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const htDcPeriod: typeof HT_DCPERIOD;
/**
 * Hilbert Transform - Dominant Cycle Phase
 *
 * @alias htDcPhase
 * @category Cycle Indicators
 */
export declare function HT_DCPHASE(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const htDcPhase: typeof HT_DCPHASE;
/**
 * Hilbert Transform - Phasor Components
 *
 * @alias htPhasor
 * @category Cycle Indicators
 */
export declare function HT_PHASOR(params: {
    inReal: number[];
}): {
    inPhase: number[];
    quadrature: number[];
};
/** @hidden */
export declare const htPhasor: typeof HT_PHASOR;
/**
 * Hilbert Transform - SineWave
 *
 * @alias htSine
 * @category Cycle Indicators
 */
export declare function HT_SINE(params: {
    inReal: number[];
}): {
    sine: number[];
    leadSine: number[];
};
/** @hidden */
export declare const htSine: typeof HT_SINE;
/**
 * Hilbert Transform - Instantaneous Trendline
 *
 * @alias htTrendline
 * @category Overlap Studies
 */
export declare function HT_TRENDLINE(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const htTrendline: typeof HT_TRENDLINE;
/**
 * Hilbert Transform - Trend vs Cycle Mode
 *
 * @alias htTrendMode
 * @category Cycle Indicators
 */
export declare function HT_TRENDMODE(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const htTrendMode: typeof HT_TRENDMODE;
/**
 * Intraday Momentum Index
 *
 * @alias imi
 * @category Momentum Indicators
 */
export declare function IMI(params: {
    open: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const imi: typeof IMI;
/**
 * Kaufman Adaptive Moving Average
 *
 * @alias kama
 * @category Overlap Studies
 */
export declare function KAMA(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const kama: typeof KAMA;
/**
 * Linear Regression
 *
 * @alias linearReg
 * @category Statistic Functions
 */
export declare function LINEARREG(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const linearReg: typeof LINEARREG;
/**
 * Linear Regression Angle
 *
 * @alias linearRegAngle
 * @category Statistic Functions
 */
export declare function LINEARREG_ANGLE(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const linearRegAngle: typeof LINEARREG_ANGLE;
/**
 * Linear Regression Intercept
 *
 * @alias linearRegIntercept
 * @category Statistic Functions
 */
export declare function LINEARREG_INTERCEPT(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const linearRegIntercept: typeof LINEARREG_INTERCEPT;
/**
 * Linear Regression Slope
 *
 * @alias linearRegSlope
 * @category Statistic Functions
 */
export declare function LINEARREG_SLOPE(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const linearRegSlope: typeof LINEARREG_SLOPE;
/**
 * Vector Log Natural
 *
 * @alias ln
 * @category Math Transform
 */
export declare function LN(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const ln: typeof LN;
/**
 * Vector Log10
 *
 * @alias log10
 * @category Math Transform
 */
export declare function LOG10(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const log10: typeof LOG10;
/**
 * Moving average
 *
 * @alias movingAverage
 * @category Overlap Studies
 */
export declare function MA(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
    /**
     * MA Type
     * Type of Moving Average. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    MAType?: MAType;
}): {
    output: number[];
};
/** @hidden */
export declare const movingAverage: typeof MA;
/**
 * Moving Average Convergence/Divergence
 *
 * @alias macd
 * @category Momentum Indicators
 */
export declare function MACD(params: {
    inReal: number[];
    /**
     * Fast Period
     * Number of period for the fast MA. (Integer, min: 2, max: 100000)
     * @defaultValue 12
     */
    fastPeriod?: number;
    /**
     * Slow Period
     * Number of period for the slow MA. (Integer, min: 2, max: 100000)
     * @defaultValue 26
     */
    slowPeriod?: number;
    /**
     * Signal Period
     * Smoothing for the signal line (nb of period). (Integer, min: 1, max: 100000)
     * @defaultValue 9
     */
    signalPeriod?: number;
}): {
    MACD: number[];
    MACDSignal: number[];
    MACDHist: number[];
};
/** @hidden */
export declare const macd: typeof MACD;
/**
 * MACD with controllable MA type
 *
 * @alias macdExt
 * @category Momentum Indicators
 */
export declare function MACDEXT(params: {
    inReal: number[];
    /**
     * Fast Period
     * Number of period for the fast MA. (Integer, min: 2, max: 100000)
     * @defaultValue 12
     */
    fastPeriod?: number;
    /**
     * Fast MA
     * Type of Moving Average for fast MA. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    fastMAType?: MAType;
    /**
     * Slow Period
     * Number of period for the slow MA. (Integer, min: 2, max: 100000)
     * @defaultValue 26
     */
    slowPeriod?: number;
    /**
     * Slow MA
     * Type of Moving Average for slow MA. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    slowMAType?: MAType;
    /**
     * Signal Period
     * Smoothing for the signal line (nb of period). (Integer, min: 1, max: 100000)
     * @defaultValue 9
     */
    signalPeriod?: number;
    /**
     * Signal MA
     * Type of Moving Average for signal line. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    signalMAType?: MAType;
}): {
    MACD: number[];
    MACDSignal: number[];
    MACDHist: number[];
};
/** @hidden */
export declare const macdExt: typeof MACDEXT;
/**
 * Moving Average Convergence/Divergence Fix 12/26
 *
 * @alias macdFix
 * @category Momentum Indicators
 */
export declare function MACDFIX(params: {
    inReal: number[];
    /**
     * Signal Period
     * Smoothing for the signal line (nb of period). (Integer, min: 1, max: 100000)
     * @defaultValue 9
     */
    signalPeriod?: number;
}): {
    MACD: number[];
    MACDSignal: number[];
    MACDHist: number[];
};
/** @hidden */
export declare const macdFix: typeof MACDFIX;
/**
 * MESA Adaptive Moving Average
 *
 * @alias mama
 * @category Overlap Studies
 */
export declare function MAMA(params: {
    inReal: number[];
    /**
     * Fast Limit
     * Upper limit use in the adaptive algorithm. (Double, min: 0.01, max: 0.99)
     * @defaultValue 0.5
     */
    fastLimit?: number;
    /**
     * Slow Limit
     * Lower limit use in the adaptive algorithm. (Double, min: 0.01, max: 0.99)
     * @defaultValue 0.05
     */
    slowLimit?: number;
}): {
    MAMA: number[];
    FAMA: number[];
};
/** @hidden */
export declare const mama: typeof MAMA;
/**
 * Moving average with variable period
 *
 * @alias movingAverageVariablePeriod
 * @category Overlap Studies
 */
export declare function MAVP(params: {
    inReal: number[];
    inPeriods: number[];
    /**
     * Minimum Period
     * Value less than minimum will be changed to Minimum period. (Integer, min: 2, max: 100000)
     * @defaultValue 2
     */
    minPeriod?: number;
    /**
     * Maximum Period
     * Value higher than maximum will be changed to Maximum period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    maxPeriod?: number;
    /**
     * MA Type
     * Type of Moving Average. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    MAType?: MAType;
}): {
    output: number[];
};
/** @hidden */
export declare const movingAverageVariablePeriod: typeof MAVP;
/**
 * Highest value over a specified period
 *
 * @alias max
 * @category Math Operators
 */
export declare function MAX(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const max: typeof MAX;
/**
 * Index of highest value over a specified period
 *
 * @alias maxIndex
 * @category Math Operators
 */
export declare function MAXINDEX(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const maxIndex: typeof MAXINDEX;
/**
 * Median Price
 *
 * @alias medPrice
 * @category Price Transform
 */
export declare function MEDPRICE(params: {
    high: number[];
    low: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const medPrice: typeof MEDPRICE;
/**
 * Money Flow Index
 *
 * @alias mfi
 * @category Momentum Indicators
 */
export declare function MFI(params: {
    high: number[];
    low: number[];
    close: number[];
    volume: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const mfi: typeof MFI;
/**
 * MidPoint over period
 *
 * @alias midPoint
 * @category Overlap Studies
 */
export declare function MIDPOINT(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const midPoint: typeof MIDPOINT;
/**
 * Midpoint Price over period
 *
 * @alias midPrice
 * @category Overlap Studies
 */
export declare function MIDPRICE(params: {
    high: number[];
    low: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const midPrice: typeof MIDPRICE;
/**
 * Lowest value over a specified period
 *
 * @alias min
 * @category Math Operators
 */
export declare function MIN(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const min: typeof MIN;
/**
 * Index of lowest value over a specified period
 *
 * @alias minIndex
 * @category Math Operators
 */
export declare function MININDEX(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const minIndex: typeof MININDEX;
/**
 * Lowest and highest values over a specified period
 *
 * @alias minMax
 * @category Math Operators
 */
export declare function MINMAX(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    min: number[];
    max: number[];
};
/** @hidden */
export declare const minMax: typeof MINMAX;
/**
 * Indexes of lowest and highest values over a specified period
 *
 * @alias minMaxIndex
 * @category Math Operators
 */
export declare function MINMAXINDEX(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    minIdx: number[];
    maxIdx: number[];
};
/** @hidden */
export declare const minMaxIndex: typeof MINMAXINDEX;
/**
 * Minus Directional Indicator
 *
 * @alias minusDI
 * @category Momentum Indicators
 */
export declare function MINUS_DI(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const minusDI: typeof MINUS_DI;
/**
 * Minus Directional Movement
 *
 * @alias minusDM
 * @category Momentum Indicators
 */
export declare function MINUS_DM(params: {
    high: number[];
    low: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const minusDM: typeof MINUS_DM;
/**
 * Momentum
 *
 * @alias mom
 * @category Momentum Indicators
 */
export declare function MOM(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 10
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const mom: typeof MOM;
/**
 * Vector Arithmetic Mult
 *
 * @alias mult
 * @category Math Operators
 */
export declare function MULT(params: {
    inReal0: number[];
    inReal1: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const mult: typeof MULT;
/**
 * Normalized Average True Range
 *
 * @alias natr
 * @category Volatility Indicators
 */
export declare function NATR(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const natr: typeof NATR;
/**
 * On Balance Volume
 *
 * @alias obv
 * @category Volume Indicators
 */
export declare function OBV(params: {
    inReal: number[];
    volume: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const obv: typeof OBV;
/**
 * Plus Directional Indicator
 *
 * @alias plusDI
 * @category Momentum Indicators
 */
export declare function PLUS_DI(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const plusDI: typeof PLUS_DI;
/**
 * Plus Directional Movement
 *
 * @alias plusDM
 * @category Momentum Indicators
 */
export declare function PLUS_DM(params: {
    high: number[];
    low: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const plusDM: typeof PLUS_DM;
/**
 * Percentage Price Oscillator
 *
 * @alias ppo
 * @category Momentum Indicators
 */
export declare function PPO(params: {
    inReal: number[];
    /**
     * Fast Period
     * Number of period for the fast MA. (Integer, min: 2, max: 100000)
     * @defaultValue 12
     */
    fastPeriod?: number;
    /**
     * Slow Period
     * Number of period for the slow MA. (Integer, min: 2, max: 100000)
     * @defaultValue 26
     */
    slowPeriod?: number;
    /**
     * MA Type
     * Type of Moving Average. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    MAType?: MAType;
}): {
    output: number[];
};
/** @hidden */
export declare const ppo: typeof PPO;
/**
 * Rate of change : ((price/prevPrice)-1)*100
 *
 * @alias roc
 * @category Momentum Indicators
 */
export declare function ROC(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 10
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const roc: typeof ROC;
/**
 * Rate of change Percentage: (price-prevPrice)/prevPrice
 *
 * @alias rocP
 * @category Momentum Indicators
 */
export declare function ROCP(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 10
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const rocP: typeof ROCP;
/**
 * Rate of change ratio: (price/prevPrice)
 *
 * @alias rocR
 * @category Momentum Indicators
 */
export declare function ROCR(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 10
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const rocR: typeof ROCR;
/**
 * Rate of change ratio 100 scale: (price/prevPrice)*100
 *
 * @alias rocR100
 * @category Momentum Indicators
 */
export declare function ROCR100(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 10
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const rocR100: typeof ROCR100;
/**
 * Relative Strength Index
 *
 * @alias rsi
 * @category Momentum Indicators
 */
export declare function RSI(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const rsi: typeof RSI;
/**
 * Parabolic SAR
 *
 * @alias sar
 * @category Overlap Studies
 */
export declare function SAR(params: {
    high: number[];
    low: number[];
    /**
     * Acceleration Factor
     * Acceleration Factor used up to the Maximum value. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.02
     */
    acceleration?: number;
    /**
     * AF Maximum
     * Acceleration Factor Maximum value. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.2
     */
    maximum?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const sar: typeof SAR;
/**
 * Parabolic SAR - Extended
 *
 * @alias sarExt
 * @category Overlap Studies
 */
export declare function SAREXT(params: {
    high: number[];
    low: number[];
    /**
     * Start Value
     * Start value and direction. 0 for Auto, >0 for Long, <0 for Short. (Double, min: -3e+37, max: 3e+37)
     * @defaultValue 0
     */
    startValue?: number;
    /**
     * Offset on Reverse
     * Percent offset added/removed to initial stop on short/long reversal. (Double, min: 0, max: 3e+37)
     * @defaultValue 0
     */
    offsetOnReverse?: number;
    /**
     * AF Init Long
     * Acceleration Factor initial value for the Long direction. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.02
     */
    accelerationInitLong?: number;
    /**
     * AF Long
     * Acceleration Factor for the Long direction. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.02
     */
    accelerationLong?: number;
    /**
     * AF Max Long
     * Acceleration Factor maximum value for the Long direction. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.2
     */
    accelerationMaxLong?: number;
    /**
     * AF Init Short
     * Acceleration Factor initial value for the Short direction. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.02
     */
    accelerationInitShort?: number;
    /**
     * AF Short
     * Acceleration Factor for the Short direction. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.02
     */
    accelerationShort?: number;
    /**
     * AF Max Short
     * Acceleration Factor maximum value for the Short direction. (Double, min: 0, max: 3e+37)
     * @defaultValue 0.2
     */
    accelerationMaxShort?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const sarExt: typeof SAREXT;
/**
 * Vector Trigonometric Sin
 *
 * @alias sin
 * @category Math Transform
 */
export declare function SIN(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const sin: typeof SIN;
/**
 * Vector Trigonometric Sinh
 *
 * @alias sinh
 * @category Math Transform
 */
export declare function SINH(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const sinh: typeof SINH;
/**
 * Simple Moving Average
 *
 * @alias sma
 * @category Overlap Studies
 */
export declare function SMA(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const sma: typeof SMA;
/**
 * Vector Square Root
 *
 * @alias sqrt
 * @category Math Transform
 */
export declare function SQRT(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const sqrt: typeof SQRT;
/**
 * Standard Deviation
 *
 * @alias stdDev
 * @category Statistic Functions
 */
export declare function STDDEV(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 5
     */
    timePeriod?: number;
    /**
     * Deviations
     * Nb of deviations. (Double, min: -3e+37, max: 3e+37)
     * @defaultValue 1
     */
    nbDev?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const stdDev: typeof STDDEV;
/**
 * Stochastic
 *
 * @alias stoch
 * @category Momentum Indicators
 */
export declare function STOCH(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Fast-K Period
     * Time period for building the Fast-K line. (Integer, min: 1, max: 100000)
     * @defaultValue 5
     */
    fastK_Period?: number;
    /**
     * Slow-K Period
     * Smoothing for making the Slow-K line. Usually set to 3. (Integer, min: 1, max: 100000)
     * @defaultValue 3
     */
    slowK_Period?: number;
    /**
     * Slow-K MA
     * Type of Moving Average for Slow-K. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    slowK_MAType?: MAType;
    /**
     * Slow-D Period
     * Smoothing for making the Slow-D line. (Integer, min: 1, max: 100000)
     * @defaultValue 3
     */
    slowD_Period?: number;
    /**
     * Slow-D MA
     * Type of Moving Average for Slow-D. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    slowD_MAType?: MAType;
}): {
    slowK: number[];
    slowD: number[];
};
/** @hidden */
export declare const stoch: typeof STOCH;
/**
 * Stochastic Fast
 *
 * @alias stochF
 * @category Momentum Indicators
 */
export declare function STOCHF(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Fast-K Period
     * Time period for building the Fast-K line. (Integer, min: 1, max: 100000)
     * @defaultValue 5
     */
    fastK_Period?: number;
    /**
     * Fast-D Period
     * Smoothing for making the Fast-D line. Usually set to 3. (Integer, min: 1, max: 100000)
     * @defaultValue 3
     */
    fastD_Period?: number;
    /**
     * Fast-D MA
     * Type of Moving Average for Fast-D. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    fastD_MAType?: MAType;
}): {
    fastK: number[];
    fastD: number[];
};
/** @hidden */
export declare const stochF: typeof STOCHF;
/**
 * Stochastic Relative Strength Index
 *
 * @alias stochRsi
 * @category Momentum Indicators
 */
export declare function STOCHRSI(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
    /**
     * Fast-K Period
     * Time period for building the Fast-K line. (Integer, min: 1, max: 100000)
     * @defaultValue 5
     */
    fastK_Period?: number;
    /**
     * Fast-D Period
     * Smoothing for making the Fast-D line. Usually set to 3. (Integer, min: 1, max: 100000)
     * @defaultValue 3
     */
    fastD_Period?: number;
    /**
     * Fast-D MA
     * Type of Moving Average for Fast-D. (MAType)
     * @defaultValue `MAType.SMA`=0
     */
    fastD_MAType?: MAType;
}): {
    fastK: number[];
    fastD: number[];
};
/** @hidden */
export declare const stochRsi: typeof STOCHRSI;
/**
 * Vector Arithmetic Substraction
 *
 * @alias sub
 * @category Math Operators
 */
export declare function SUB(params: {
    inReal0: number[];
    inReal1: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const sub: typeof SUB;
/**
 * Summation
 *
 * @alias sum
 * @category Math Operators
 */
export declare function SUM(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const sum: typeof SUM;
/**
 * Triple Exponential Moving Average (T3)
 *
 * @alias t3
 * @category Overlap Studies
 */
export declare function T3(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 5
     */
    timePeriod?: number;
    /**
     * Volume Factor
     * Volume Factor. (Double, min: 0, max: 1)
     * @defaultValue 0.7
     */
    VFactor?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const t3: typeof T3;
/**
 * Vector Trigonometric Tan
 *
 * @alias tan
 * @category Math Transform
 */
export declare function TAN(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const tan: typeof TAN;
/**
 * Vector Trigonometric Tanh
 *
 * @alias tanh
 * @category Math Transform
 */
export declare function TANH(params: {
    inReal: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const tanh: typeof TANH;
/**
 * Triple Exponential Moving Average
 *
 * @alias tema
 * @category Overlap Studies
 */
export declare function TEMA(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const tema: typeof TEMA;
/**
 * True Range
 *
 * @alias trueRange
 * @category Volatility Indicators
 */
export declare function TRANGE(params: {
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const trueRange: typeof TRANGE;
/**
 * Triangular Moving Average
 *
 * @alias trima
 * @category Overlap Studies
 */
export declare function TRIMA(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const trima: typeof TRIMA;
/**
 * 1-day Rate-Of-Change (ROC) of a Triple Smooth EMA
 *
 * @alias trix
 * @category Momentum Indicators
 */
export declare function TRIX(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const trix: typeof TRIX;
/**
 * Time Series Forecast
 *
 * @alias tsf
 * @category Statistic Functions
 */
export declare function TSF(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const tsf: typeof TSF;
/**
 * Typical Price
 *
 * @alias typPrice
 * @category Price Transform
 */
export declare function TYPPRICE(params: {
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const typPrice: typeof TYPPRICE;
/**
 * Ultimate Oscillator
 *
 * @alias ultOsc
 * @category Momentum Indicators
 */
export declare function ULTOSC(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * First Period
     * Number of bars for 1st period.. (Integer, min: 1, max: 100000)
     * @defaultValue 7
     */
    timePeriod1?: number;
    /**
     * Second Period
     * Number of bars fro 2nd period. (Integer, min: 1, max: 100000)
     * @defaultValue 14
     */
    timePeriod2?: number;
    /**
     * Third Period
     * Number of bars for 3rd period. (Integer, min: 1, max: 100000)
     * @defaultValue 28
     */
    timePeriod3?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const ultOsc: typeof ULTOSC;
/**
 * Variance
 *
 * @alias variance
 * @category Statistic Functions
 */
export declare function VAR(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 1, max: 100000)
     * @defaultValue 5
     */
    timePeriod?: number;
    /**
     * Deviations
     * Nb of deviations. (Double, min: -3e+37, max: 3e+37)
     * @defaultValue 1
     */
    nbDev?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const variance: typeof VAR;
/**
 * Weighted Close Price
 *
 * @alias wclPrice
 * @category Price Transform
 */
export declare function WCLPRICE(params: {
    high: number[];
    low: number[];
    close: number[];
}): {
    output: number[];
};
/** @hidden */
export declare const wclPrice: typeof WCLPRICE;
/**
 * Williams' %R
 *
 * @alias willR
 * @category Momentum Indicators
 */
export declare function WILLR(params: {
    high: number[];
    low: number[];
    close: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 14
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const willR: typeof WILLR;
/**
 * Weighted Moving Average
 *
 * @alias wma
 * @category Overlap Studies
 */
export declare function WMA(params: {
    inReal: number[];
    /**
     * Time Period
     * Number of period. (Integer, min: 2, max: 100000)
     * @defaultValue 30
     */
    timePeriod?: number;
}): {
    output: number[];
};
/** @hidden */
export declare const wma: typeof WMA;
/**
 * TAFuncs object is a collection of all functions.
 * It is very easy to call functions dynamically without additional import statements.
 */
export declare const TAFuncs: {
    ACCBANDS: typeof ACCBANDS;
    ACOS: typeof ACOS;
    AD: typeof AD;
    ADD: typeof ADD;
    ADOSC: typeof ADOSC;
    ADX: typeof ADX;
    ADXR: typeof ADXR;
    APO: typeof APO;
    AROON: typeof AROON;
    AROONOSC: typeof AROONOSC;
    ASIN: typeof ASIN;
    ATAN: typeof ATAN;
    ATR: typeof ATR;
    AVGDEV: typeof AVGDEV;
    AVGPRICE: typeof AVGPRICE;
    BBANDS: typeof BBANDS;
    BETA: typeof BETA;
    BOP: typeof BOP;
    CCI: typeof CCI;
    CDL2CROWS: typeof CDL2CROWS;
    CDL3BLACKCROWS: typeof CDL3BLACKCROWS;
    CDL3INSIDE: typeof CDL3INSIDE;
    CDL3LINESTRIKE: typeof CDL3LINESTRIKE;
    CDL3OUTSIDE: typeof CDL3OUTSIDE;
    CDL3STARSINSOUTH: typeof CDL3STARSINSOUTH;
    CDL3WHITESOLDIERS: typeof CDL3WHITESOLDIERS;
    CDLABANDONEDBABY: typeof CDLABANDONEDBABY;
    CDLADVANCEBLOCK: typeof CDLADVANCEBLOCK;
    CDLBELTHOLD: typeof CDLBELTHOLD;
    CDLBREAKAWAY: typeof CDLBREAKAWAY;
    CDLCLOSINGMARUBOZU: typeof CDLCLOSINGMARUBOZU;
    CDLCONCEALBABYSWALL: typeof CDLCONCEALBABYSWALL;
    CDLCOUNTERATTACK: typeof CDLCOUNTERATTACK;
    CDLDARKCLOUDCOVER: typeof CDLDARKCLOUDCOVER;
    CDLDOJI: typeof CDLDOJI;
    CDLDOJISTAR: typeof CDLDOJISTAR;
    CDLDRAGONFLYDOJI: typeof CDLDRAGONFLYDOJI;
    CDLENGULFING: typeof CDLENGULFING;
    CDLEVENINGDOJISTAR: typeof CDLEVENINGDOJISTAR;
    CDLEVENINGSTAR: typeof CDLEVENINGSTAR;
    CDLGAPSIDESIDEWHITE: typeof CDLGAPSIDESIDEWHITE;
    CDLGRAVESTONEDOJI: typeof CDLGRAVESTONEDOJI;
    CDLHAMMER: typeof CDLHAMMER;
    CDLHANGINGMAN: typeof CDLHANGINGMAN;
    CDLHARAMI: typeof CDLHARAMI;
    CDLHARAMICROSS: typeof CDLHARAMICROSS;
    CDLHIGHWAVE: typeof CDLHIGHWAVE;
    CDLHIKKAKE: typeof CDLHIKKAKE;
    CDLHIKKAKEMOD: typeof CDLHIKKAKEMOD;
    CDLHOMINGPIGEON: typeof CDLHOMINGPIGEON;
    CDLIDENTICAL3CROWS: typeof CDLIDENTICAL3CROWS;
    CDLINNECK: typeof CDLINNECK;
    CDLINVERTEDHAMMER: typeof CDLINVERTEDHAMMER;
    CDLKICKING: typeof CDLKICKING;
    CDLKICKINGBYLENGTH: typeof CDLKICKINGBYLENGTH;
    CDLLADDERBOTTOM: typeof CDLLADDERBOTTOM;
    CDLLONGLEGGEDDOJI: typeof CDLLONGLEGGEDDOJI;
    CDLLONGLINE: typeof CDLLONGLINE;
    CDLMARUBOZU: typeof CDLMARUBOZU;
    CDLMATCHINGLOW: typeof CDLMATCHINGLOW;
    CDLMATHOLD: typeof CDLMATHOLD;
    CDLMORNINGDOJISTAR: typeof CDLMORNINGDOJISTAR;
    CDLMORNINGSTAR: typeof CDLMORNINGSTAR;
    CDLONNECK: typeof CDLONNECK;
    CDLPIERCING: typeof CDLPIERCING;
    CDLRICKSHAWMAN: typeof CDLRICKSHAWMAN;
    CDLRISEFALL3METHODS: typeof CDLRISEFALL3METHODS;
    CDLSEPARATINGLINES: typeof CDLSEPARATINGLINES;
    CDLSHOOTINGSTAR: typeof CDLSHOOTINGSTAR;
    CDLSHORTLINE: typeof CDLSHORTLINE;
    CDLSPINNINGTOP: typeof CDLSPINNINGTOP;
    CDLSTALLEDPATTERN: typeof CDLSTALLEDPATTERN;
    CDLSTICKSANDWICH: typeof CDLSTICKSANDWICH;
    CDLTAKURI: typeof CDLTAKURI;
    CDLTASUKIGAP: typeof CDLTASUKIGAP;
    CDLTHRUSTING: typeof CDLTHRUSTING;
    CDLTRISTAR: typeof CDLTRISTAR;
    CDLUNIQUE3RIVER: typeof CDLUNIQUE3RIVER;
    CDLUPSIDEGAP2CROWS: typeof CDLUPSIDEGAP2CROWS;
    CDLXSIDEGAP3METHODS: typeof CDLXSIDEGAP3METHODS;
    CEIL: typeof CEIL;
    CMO: typeof CMO;
    CORREL: typeof CORREL;
    COS: typeof COS;
    COSH: typeof COSH;
    DEMA: typeof DEMA;
    DIV: typeof DIV;
    DX: typeof DX;
    EMA: typeof EMA;
    EXP: typeof EXP;
    FLOOR: typeof FLOOR;
    HT_DCPERIOD: typeof HT_DCPERIOD;
    HT_DCPHASE: typeof HT_DCPHASE;
    HT_PHASOR: typeof HT_PHASOR;
    HT_SINE: typeof HT_SINE;
    HT_TRENDLINE: typeof HT_TRENDLINE;
    HT_TRENDMODE: typeof HT_TRENDMODE;
    IMI: typeof IMI;
    KAMA: typeof KAMA;
    LINEARREG: typeof LINEARREG;
    LINEARREG_ANGLE: typeof LINEARREG_ANGLE;
    LINEARREG_INTERCEPT: typeof LINEARREG_INTERCEPT;
    LINEARREG_SLOPE: typeof LINEARREG_SLOPE;
    LN: typeof LN;
    LOG10: typeof LOG10;
    MA: typeof MA;
    MACD: typeof MACD;
    MACDEXT: typeof MACDEXT;
    MACDFIX: typeof MACDFIX;
    MAMA: typeof MAMA;
    MAVP: typeof MAVP;
    MAX: typeof MAX;
    MAXINDEX: typeof MAXINDEX;
    MEDPRICE: typeof MEDPRICE;
    MFI: typeof MFI;
    MIDPOINT: typeof MIDPOINT;
    MIDPRICE: typeof MIDPRICE;
    MIN: typeof MIN;
    MININDEX: typeof MININDEX;
    MINMAX: typeof MINMAX;
    MINMAXINDEX: typeof MINMAXINDEX;
    MINUS_DI: typeof MINUS_DI;
    MINUS_DM: typeof MINUS_DM;
    MOM: typeof MOM;
    MULT: typeof MULT;
    NATR: typeof NATR;
    OBV: typeof OBV;
    PLUS_DI: typeof PLUS_DI;
    PLUS_DM: typeof PLUS_DM;
    PPO: typeof PPO;
    ROC: typeof ROC;
    ROCP: typeof ROCP;
    ROCR: typeof ROCR;
    ROCR100: typeof ROCR100;
    RSI: typeof RSI;
    SAR: typeof SAR;
    SAREXT: typeof SAREXT;
    SIN: typeof SIN;
    SINH: typeof SINH;
    SMA: typeof SMA;
    SQRT: typeof SQRT;
    STDDEV: typeof STDDEV;
    STOCH: typeof STOCH;
    STOCHF: typeof STOCHF;
    STOCHRSI: typeof STOCHRSI;
    SUB: typeof SUB;
    SUM: typeof SUM;
    T3: typeof T3;
    TAN: typeof TAN;
    TANH: typeof TANH;
    TEMA: typeof TEMA;
    TRANGE: typeof TRANGE;
    TRIMA: typeof TRIMA;
    TRIX: typeof TRIX;
    TSF: typeof TSF;
    TYPPRICE: typeof TYPPRICE;
    ULTOSC: typeof ULTOSC;
    VAR: typeof VAR;
    WCLPRICE: typeof WCLPRICE;
    WILLR: typeof WILLR;
    WMA: typeof WMA;
};
