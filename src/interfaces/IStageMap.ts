import { IDimensions } from "./IDimensions";
import { IPosition } from "./IPosition";

export interface IStageMap extends IPosition, IDimensions {
  image: HTMLImageElement;
}
