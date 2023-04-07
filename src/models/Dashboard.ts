import {Widget} from "./Widget";

export interface Dashboard {
    id: number;
    name: string;
    partitionKey: string;
    widgets: Array<Widget>;

}



