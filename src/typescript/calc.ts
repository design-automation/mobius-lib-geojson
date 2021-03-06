/**
 * Functions dealing with calculations done on geojson files.
 */

/**
 *
 */

import * as turf from "@turf/turf";

/**
 * Calculates all internal angles within a feature
 * @param feature Accepts Line or Polygon
 * @returns An array of internal angles in degrees
 * @example
 * var feat = feature.features[0];
 * var angle = anglesInternal(feat);
 */
export function anglesInternal(feature: turf.Feature<turf.LineString|turf.Polygon>): number[] {
    if (feature === undefined) {throw new Error("Invalid arg: feature must be defined.");}
    let lnChk: boolean = false;
    if (feature.geometry.type === "LineString") {lnChk = true;}
    let coordArr: any = feature.geometry.coordinates;
    while (coordArr.length === 1) {coordArr = coordArr[0];}

    const bearingArr: number[] = [];
    for(let i = 0; i <= coordArr.length - 2 ; i++) {
        let bearing: number = turf.bearing(coordArr[i], coordArr[i+1]);
        bearing = turf.bearingToAzimuth(bearing);
        bearingArr.push(bearing);
    }

    const angleArr: number[] = [];
    for(let i = 0; i <= bearingArr.length - 1; i++) {
        let b2: number = i + 1;
        if (b2 === bearingArr.length && lnChk === false) {b2 = 0;}
        let angle: number = bearingArr[b2] - bearingArr [i];
        if (angle < 0) {angle += 360;}
        if (lnChk === true && i === bearingArr.length - 1) {angle = 360;}
        angleArr.push(angle);
    }
    angleArr.unshift(angleArr[angleArr.length - 1]);
    return angleArr;
}
