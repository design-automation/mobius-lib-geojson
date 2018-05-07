/**
 * Functions for adding UI components to Cesium.

/**
 *
 */

import * as turf from "@turf/turf";

interface CesiumExtrudeAttrib {
    name: string;
    min: number;
    max: number;
    invert: boolean;
    scale: number;
    line: boolean;
}

interface CesiumColourAttrib {
    name: string;
    min: number;
    max: number;
    invert: boolean;
}


interface CesiumFilter {
    descr: string;
    name: string;
    relation: number;
    value: (string|number);
}

interface CesiumFeatureCollection extends turf.FeatureCollection {
    cesium?: {
        select?: Array<string>;
        extrude?: {
            descr: string;
            attribs: Array<CesiumExtrudeAttrib>;
        };
        colour?: {
            descr: string;
            attribs: Array<CesiumColourAttrib>;
        };
        filters?: Array<CesiumFilter>;
    }
}

/**
 * Add an attribute display option.
 * @param name The name of the attribute to display.
 * @returns
 */
export function addAttribDisplay(featureColl: CesiumFeatureCollection, namw:string):
                           CesiumFeatureCollection {
    if (!featureColl.hasOwnProperty("cesium")) {
        featureColl.cesium = {};
    }
    if (!featureColl.cesium.hasOwnProperty("select")) {
        featureColl.cesium.select = [];
    }
    featureColl.cesium.select.push(name);
    return featureColl;
}

/**
 * Add an extrude dropdown to the Cesium Viewer.
 * @param descr A description.
 * @returns
 */
export function addExtrude(featureColl: CesiumFeatureCollection, descr:string):
                           CesiumFeatureCollection {
    if (!featureColl.hasOwnProperty("cesium")) {
        featureColl.cesium = {};
    }
    featureColl.cesium.extrude = {descr, attribs: []};
    return featureColl;
}

/**
 * Add an entry to the extrude dropdown in the Cesium Viewer.
 * @param
 * @returns
 */
export function addExtrudeEntry(featureColl: CesiumFeatureCollection,
                                name: string, min: number, max: number, invert: boolean,
                                scale: number, line: boolean):
                                CesiumFeatureCollection {

    if (!featureColl.hasOwnProperty("cesium")) {
        featureColl.cesium = {};
    }
    if (!featureColl.cesium.hasOwnProperty("extrude")) {
        featureColl.cesium.extrude = {descr: "", attribs: []};
    }
    featureColl.cesium.extrude.attribs.push({name, min, max, invert, scale, line});
    return featureColl;
}


/**
 * Add a colour dropdown to the Cesium Viewer.
 * @param descr A description.
 * @returns
 */
export function addColour(featureColl: CesiumFeatureCollection, descr:string):
                          CesiumFeatureCollection {
    if (!featureColl.hasOwnProperty("cesium")) {
        featureColl.cesium = {};
    }
    featureColl.cesium.colour = {descr, attribs: []};
    return featureColl;
}

/**
 * Add an entry to the colour dropdown in the Cesium Viewer.
 * @param
 * @returns
 */
export function addColourEntry(featureColl: CesiumFeatureCollection,
                               name: string, min: number, max: number, invert: boolean):
                               CesiumFeatureCollection {

    if (!featureColl.hasOwnProperty("cesium")) {
        featureColl.cesium = {};
    }
    if (!featureColl.cesium.hasOwnProperty("extrude")) {
        featureColl.cesium.colour = {descr: "", attribs: []};
    }
    featureColl.cesium.colour.attribs.push({name, min, max, invert});
    return featureColl;
}

/**
 * Add a category filter to the Cesium Viewer.
 * @param
 * @returns
 */
export function addFilterCat(featureColl: CesiumFeatureCollection,
                             descr: string, name: string, relation: string, value: string):
                             CesiumFeatureCollection {
    if (!featureColl.hasOwnProperty("cesium")) {
        featureColl.cesium = {};
    }
    if (!featureColl.cesium.hasOwnProperty("filters")) {
        featureColl.cesium.filters = [];
    }
    const relations_cat: Map<string, number> = new Map([["none", 0], ["==", 1], ["!=", 2]]);
    const relation_id: number = relations_cat.get(relation);
    featureColl.cesium.filters.push({descr, name, relation: relation_id, value});
    return featureColl;
}



/**
 * Add a numeric filter.
 * @param
 * @returns
 */
export function addFilterNum(featureColl: CesiumFeatureCollection,
                             descr: string, name: string, relation: string, value: number):
                             CesiumFeatureCollection {
    if (!featureColl.hasOwnProperty("cesium")) {
        featureColl.cesium = {};
    }
    if (!featureColl.cesium.hasOwnProperty("filters")) {
        featureColl.cesium.filters = [];
    }
    const relations_num: Map<string, number> = new Map([[">", 0], ["<", 1], ["==", 2]]);
    const relation_id: number = relations_num.get(relation);
    featureColl.cesium.filters.push({descr, name, relation: relation_id, value});
    return featureColl;
}