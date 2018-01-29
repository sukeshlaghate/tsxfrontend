import * as React from 'react';
import { Button } from 'semantic-ui-react';
import * as _ from 'lodash';

export default class GeoCardMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeItem: "",
      cardId: this.props.cardId
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  public handleItemClick(e: React.MouseEvent<HTMLButtonElement>, data?: any): void {
    if (data) this.setState({ activeItem: data.name });
    data = _.extendWith(data, this.state);
    if (this.props.onItemClick) this.props.onItemClick(e, data);
    e.stopPropagation();
  }

  public render(): JSX.Element {
    return (
      <div>
        <Button.Group>
          <Button basic icon='pie chart' onClick={this.handleItemClick} />
          <Button basic icon='filter' onClick={this.handleItemClick} />
          <Button basic icon='send' onClick={this.handleItemClick} />
        </Button.Group>
        
        <Button.Group floated="right">
          <Button basic icon='trash' onClick={this.handleItemClick} />
          <Button basic icon='reply' onClick={this.handleItemClick} />
        </Button.Group>
      </div>
    );
  }
}


