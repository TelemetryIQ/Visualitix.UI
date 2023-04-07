import {Unit} from "./Unit";
import {MeasurementType} from "./MeasurementType";


export interface SeriesInfoSummary {
    id: string;
    partitionKey: string;
    seriesName: string;
    measurementType: MeasurementType;
    unit: Unit;
}


