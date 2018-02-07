
export const If = ({ cond, children }:{cond:any, children:any}) => {
  const result = cond ? children : null;
  return result;
};

export function isDefined(x: any) {
  return x !== null && x !== undefined;
}


// export const enum GeoCardSize {
//   mini = GeoCardSize.mini,
//   tiny = "xsmall",
//   small = "small",
//   large = "medium",
//   big = "large",
//   huge = "xlarge",
//   massive = "xxlarge"
// }

// export enum GeoCardType {
//   Spatial,
//   Chart,
//   Table
// }