/**
 * New typescript file
 */

export const enum GeoCardSize {
  mini = "xxsmall",
  tiny = "xsmall",
  small = "small",
  large = "medium",
  big = "large",
  huge = "xlarge",
  massive = "xxlarge"
}

export const enum GeoCardType {
  Spatial,
  Chart,
  Table
}
// Define the GeoCard interface
export interface IGeoCard {
  id: string|undefined;
  card_type: GeoCardType;
  data: any;
  image?: React.Component | {} | string;
  header?: React.Component | {} | string;
  meta?: React.Component | {} | string;
  description?: React.Component | {} | string;
  extra?: React.Component | {} | string;
  size?: GeoCardSize;
}

// Defines the GeoCardModel interface for storing the GeoCards

export interface IGeoCardModel {
  key: number | string;
  GeoCards: Array<IGeoCard>;
  addGeocard(geoCard: IGeoCard): boolean;
  remove(GeoCard: IGeoCard): void;
  removeById(cardId: string): void;
  save(): boolean;
  count(): number;
  getAllCards():any;
  getCard(index: number): IGeoCard;
  getCardById(cardId:string):IGeoCard;
  getCardWithHeader(header: React.Component | {} | string): IGeoCard;
}

export interface IGeoCardProps {
  compKey: number | {} | string| undefined;
  geoCard: IGeoCard;
  onDestroy(key: any, e?: any, data?: any): void;
  // onSave(value: any): void;
}

export type Colors = 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' |
'pink' | 'brown' | 'grey' | 'black'

export interface ISidebarProps{
  visible:boolean;
  color?: Colors
}