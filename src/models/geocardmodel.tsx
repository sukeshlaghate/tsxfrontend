///<reference path='../index.d.ts'/>
import { observable, computed, action } from "mobx";
import { list, object, identifier, serializable } from "serializr";

import * as _ from "lodash";

import GeoCardDTO from "../dto/geocarddto";
import { IGeoCardModel, IGeoCard } from '../interfaces/igeocardifaces';

class GeoCardModel implements IGeoCardModel {
  @serializable(identifier())
  public key: number | string;

  @serializable(list(object(GeoCardDTO)))
  @observable
  public GeoCards: Array<IGeoCard> ;

  constructor(key: number | string) {
    this.key = key;
    this.GeoCards = [];
  }

  @action
  public addGeocard(geoCard: IGeoCard): boolean {
    const index = _.indexOf(this.GeoCards, geoCard);
    if (index === -1) this.GeoCards.push(geoCard);
    else console.error("GeoCard " + geoCard.id + " exists");

    return index !== -1;
  }

  @action
  public remove(GeoCard: IGeoCard) {
    //this.GeoCards = _.without(this.GeoCards, GeoCard);
    _.remove(this.GeoCards, GeoCard);
  }

  @action
  public removeById(cardId: string) {
    _.remove(this.GeoCards, {id:cardId});
  }

  public save(): boolean {
    return true;
  }

  @computed
  public get count(): any {
    return this.GeoCards.length;
  }

  /**
   * returns a shallow clone of cards contained.
   */
  @computed
  public get getAllCards():any {
    return _.clone(this.GeoCards);
  }

  public getCard(index: number): IGeoCard {
    let card: IGeoCard = new GeoCardDTO();

    if (index > 0 && index < this.GeoCards.length) card = this.GeoCards[index];

    return card;
  }
  public getCardById(id:string):IGeoCard{
      let card:IGeoCard = _.filter(this.GeoCards, (card:IGeoCard)=>{return card.id === id})[0];
      return card;
  }

  public getCardWithHeader(header: React.Component | {} | string): IGeoCard {
    return (_.filter(this.GeoCards, function(card: IGeoCard) {
      return card.header == header;
    })[0]);
  }
}

export default GeoCardModel;
