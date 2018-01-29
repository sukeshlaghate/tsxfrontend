import * as React from 'react';
import * as _ from 'lodash';
import { Button, Container, Label, Segment, Sidebar } from 'semantic-ui-react';
import {observable} from 'mobx';
import { observer, inject, Provider } from 'mobx-react';
import Hello from './Hello';
import './theme/semantic.min.css';
import GeoCardDTO from './dto/geocarddto';
import GeoCardModel from './models/geocardmodel';
import GeoCardView from './views/geocardview';
import FixedMenu from './components/menu/fixedmenu';
import SidebarMenu from './components/menu/sidebarmenu';
import { GeoCardType } from './interfaces/igeocardifaces';
// import StateNotifier from './services/statenotifier';

//Todo: refactor to move the card generation and id generation to another component
import * as uuid from 'uuid/v1';

const styles = {
  fontFamily: '"Montserrat", Lato, "oxygen Mono" ',
  marginLeft: '10px',
  marginTop: '20px',
  paddingTop: '20px'
};

//image={'https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'
//add any injectable stores as comma seperated names of the stores
@inject('cardModel')
@observer
export default class App extends React.Component<any, any> {
  @observable cardModel: GeoCardModel 
  
  
  constructor(props: any) {
    super(props);
    this.cardModel = this.props.cardModel;
    this.addCard = this.addCard.bind(this);   
  }


  public render(): JSX.Element {
    const cardModel = this.cardModel;

    return (
      <div >
        <FixedMenu />
        <Sidebar.Pushable
          as={Segment}
          attached='bottom'
          style={{ height: '100vh' }}>
          <SidebarMenu color={'orange'} />
          <Sidebar.Pusher>
            <Container fluid style={styles}>
              <div >
                <Hello name={'CodeSandbox'} />
                <h2>Start editing to see some magic happen {'\u2728'}</h2>
              </div>
            </Container>
            <Provider cardModel={cardModel}>
              <Container>
                <Button as='div' labelPosition='right' onClick={this.addCard} floated={'right'}>
                  <Button icon='add' color='teal' />
                  <Label as='a' basic color='teal' pointing='left'>
                    Add card
                    </Label>
                </Button>
                <Container >
                  {cardModel.count > 0 ? <GeoCardView /> : null}
                </Container>
              </Container>
            </Provider>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }

  /**
   *  <Button as='div' labelPosition='right' onClick={this.toggleMenu} floated={'right'}>
                  <Button icon='bars' color='green' />
                  <Label as='a' basic color='green' pointing='left'>
                    Toggle Menu
                    </Label>
                </Button>
   */

  /**
   * 
   * @param e 
   * @param data 
   */
 private addCard(e: React.MouseEvent<HTMLButtonElement>, data: any): void {
    const extra = (
      <Button.Group>
        <Button primary>Approve</Button>
        <Button.Or />
        <Button secondary>Reject</Button>
      </Button.Group>
    );
    const num: number = _.random(2);

    let card: GeoCardDTO = new GeoCardDTO();
    const id = uuid().toString();
    //alert(id ? 'nonempty' : 'empty');

    switch (num) {
      case 0:
        card = this.createSpatialCard(id, extra);
        break;
      case 1:
        card = this.createChartCard(id, extra);
        break;
      case 2:
        card = this.createTableCard(id, extra);
        break;
    }
    this.cardModel.addGeocard(card);
  }

  private createSpatialCard(id: string, extra: any): GeoCardDTO {
    //alert('Create SpatialCard ' + id);

    const idx = _.random(4);
    const names = ['Varanasi', 'Mumbai', 'Bangalore', 'Patna', 'World'];

    const idx2 = _.random(5);
    const metaInfo = [
      'Routing',
      'Heatmap',
      'Accident-Hotspot',
      'traffic-congestion',
      'physical map',
      'Street map'
    ];
    const cardType: GeoCardType = GeoCardType.Spatial;
    //const data ?: any,
    const header = 'Card - Map: ' + names[idx];
    const meta: string = metaInfo[idx2];

    const Card = new GeoCardDTO(
      id,
      cardType,
      undefined,
      undefined,
      header,
      meta,
      'someDescription',
      extra,
      undefined
    );
    return Card;
  }

  private createChartCard(id: string, extra: any): GeoCardDTO {
    //alert('Create ChartCard ' + id);
    const idx = _.random(4);
    const names = ['Varanasi', 'Mumbai', 'Bangalore', 'Patna', 'World'];

    const idx2 = _.random(5);
    const metaInfo = ['Pie', 'Bar', 'Bullet', 'Scatter', 'sparkline', 'Bubble'];
    const cardType: GeoCardType = GeoCardType.Chart;
    //const data ?: any,
    const header = 'Card - Chart: ' + names[idx];
    const meta: string = metaInfo[idx2];

    const Card = new GeoCardDTO(
      id,
      cardType,
      undefined,
      undefined,
      header,
      meta,
      'someDescription',
      extra,
      undefined
    );
    return Card;
  }

  private createTableCard(id: string, extra: any): GeoCardDTO {
    //alert('Create TableCard ' + id);
    const idx = _.random(4);
    const names = ['Varanasi', 'Mumbai', 'Bangalore', 'Patna', 'World'];

    const idx2 = _.random(5);
    const metaInfo = [
      'DemoGraphics',
      'Income',
      'Medical Expenses',
      'School report',
      'Random data',
      'Data for chart'
    ];
    const cardType: GeoCardType = GeoCardType.Table;
    //const data ?: any,
    const header = 'Card - Table: ' + names[idx];
    const meta: string = metaInfo[idx2];

    const Card = new GeoCardDTO(
      id,
      cardType,
      undefined,
      undefined,
      header,
      meta,
      'someDescription',
      extra,
      undefined
    );
    return Card;
  }
}
