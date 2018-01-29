///<reference path="../index.d.ts" />
import { identifier, serializable } from "serializr";

import { IGeoCard, GeoCardType, GeoCardSize }from '../interfaces/igeocardifaces';

export default class GeoCardDTO implements IGeoCard {
  @serializable(identifier())
  public id: string;

  @serializable public card_type: GeoCardType;

  @serializable public data: any;

  @serializable public image?: React.Component | {} | string;

  @serializable public header?: React.Component | {} | string;

  @serializable public meta?: React.Component | {} | string;

  @serializable public description?: React.Component | {} | string;

  @serializable public extra?: React.Component | {} | string;

  @serializable public size?: GeoCardSize;

  constructor(
    _id?: string,
    _cardType?: GeoCardType,
    _data?: any,
    _image?: React.Component | {} | string,
    _header?: React.Component | {} | string,
    _meta?: React.Component | {} | string,
    _description?: React.Component | {} | string,
    _extra?: React.Component | {} | string,
    _size?: GeoCardSize
  ) {
    this.id = _id ? _id : "";
    this.card_type = _cardType ? _cardType : GeoCardType.Spatial;
    this.data = _data ? _data : {};
    this.image = _image ? _image : "";
    this.header = _header ? _header : "";
    this.meta = _meta ? _meta : "";
    this.description = _description ? _description : "";
    this.extra = _extra ? _extra : {};
    this.size = _size ? _size : GeoCardSize.large;
  }
}