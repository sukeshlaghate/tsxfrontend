///<reference path="../index.d.ts" />
import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Card } from 'semantic-ui-react';
import GeoCard from '../components/geocard/geocard';
import { IGeoCardModel, IGeoCard } from '../interfaces/igeocardifaces';

@inject("cardModel")
@observer
export default class GeoCardView extends React.Component<any, any> {

  @observable cardModel: IGeoCardModel;

  constructor(props: any) {
    super(props);
    this.cardModel = this.props.cardModel;
    this.destroyCard = this.destroyCard.bind(this);
  }

  public render(): JSX.Element {

    return (
      <Card.Group itemsPerRow={4}>
        {this.cardModel.GeoCards.map((geoCard: IGeoCard) => (
          <GeoCard compKey={geoCard.id} geoCard={geoCard} onDestroy={this.destroyCard} />
        ))}
      </Card.Group>

    );

  }

  private destroyCard(key: any) {
    console.log("In CardView got card id: " + key);
    this.cardModel.removeById(key);
    console.log(" after removal cards model length is " + this.cardModel.count);
  }
}

