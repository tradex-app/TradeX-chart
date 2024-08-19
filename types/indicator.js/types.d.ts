/**
 * Base class for on and off chart indicators
 */
declare class indicator {
    /**
     * validate indicator inputs and outputs against expected types and values
     * @param s - indicator inputs
     * @param api - predefined parameters
     */
    static defineIndicator(s: any, api: any): void;
    /**
     * return index from cursor position and colours
     */
    static legendInputs(pos?: any[]): any;
    /**
     * calculate back history if missing
     */
    static calcIndicatorHistory(): void;
    /**
     * process stream and create new indicator data entry
     * @param value - current stream candle
     */
    static newValue(value: any[]): void;
    /**
     * process stream and update current (last) indicator data entry
     * @param value - current stream candle
     */
    static updateValue(value: any[]): void;
}

/**
 * process candle value
 */
declare var value: number[];

/**
 * process candle value
 */
declare var value: number[];

/**
 * specify Legend name
 */
declare function setLegendName(name: string): void;

/**
 * build synthetic indicator data from sources other than TALib
 * @param fn - function to fill target with data
 */
declare function dataProxy(fn: (...params: any[]) => any, target: any[]): void;

/**
 * set or get indicator visibility
 * @param [v] - visible
 */
declare function visible(v?: boolean): boolean;

/**
 * set or get indicator settings
 * @param [s] - settings
 */
declare function settings(s?: any): void;

/**
 * process new candle stream value
 * @param candle - [timestamp, open, high, low, close, volume]
 */
declare function onStreamUpdate(candle: any[]): void;

/**
 * execute legend action
 * @param e - event
 */
declare function onLegendAction(e: any): void;

/**
 * toggle indicator visibility
 * @param action - -
 */
declare function onVisibility(action: any): void;

/**
 * invoke indicator settings callback, user defined or default
 * @param c - {fn: function, own: boolean}, own flag will bypass default action
 * @returns - success or failuer
 */
declare function invokeSettings(c: any): boolean;

/**
 * Updates indicator meta output value with dialogue value
 */
declare function fieldEventChange(): any;

/**
 * if definition output is empty build it from api
 * ensure all output are arrays
 */
declare function validateOutputs(d: any, api: any, oo: any[]): void;

/**
 * meta output render order
 * merge output keys with output order
 * remove redundant keys and preserve order
 * @param dm - this.definition.meta
 * @param oo - output order derived from API output definition
 */
declare function buildOutputOrder(dm: any, oo: any[]): void;

/**
 * Outputs Tab add any missing requirements
 * @param dm - this.definition.meta
 */
declare function buildConfigOutputTab(dm: any): void;

/**
 * @param o - style object
 * @param x - style entry (field) number
 * @param style - style entry object
 */
declare function defaultMetaStyleLine(o: any, x: number, style: any): any;

/**
 * Calculate indicator values for chart history - partial or entire
 * @param indicator - the TALib function to call
 * @param params - parameters for the TALib function
 * @param range - range instance or definition
 * @param output - output definition
 * @returns - success or failure
 */
declare function calcIndicator(indicator: string | ((...params: any[]) => any), params: any, range: any, output: any): any[] | boolean;

/**
 * Calculate indicator value for current stream candle
 * @param indicator - the TALib function to call
 * @param params - parameters for the TALib function
 * @param range - Range instance
 * @returns - indicator data entry
 */
declare function calcIndicatorStream(indicator: string | ((...params: any[]) => any), params: any, range: any): any[] | boolean;

/**
 * plot
 * @param plots - array of inputs, eg. x y coords [{x:x, y:y}, ...]
 */
declare function plot(plots: any[], type: string, opts: any): void;

/**
 * @param j - range length
 * @param k - range index start
 * @param p - plot index, the output to plot
 * @param r - render action
 * @param s - plot styling
 */
declare function plotIt(j: number, k: number, p: number, r: string, s: any): void;

