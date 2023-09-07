import { MapData } from "../components/searchResultsMap/types";
import { INSPECTION_DATA } from "../database/aus-addresses";

export const SYDNEY_CENTRE = { lat: -33.867, lng: 151.207 };
export const DEFAULT_ZOOM = 12;
export const MAP_CONTAINER_CLASS_NAME = ".map-container";

export const SAMPLE_DATA: MapData[] = INSPECTION_DATA.slice(200, 250);
