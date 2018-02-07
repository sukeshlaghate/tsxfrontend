import * as React from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { Button, Card, Icon, Image, Label, Segment } from "semantic-ui-react";

@observer
export default class Avatar extends React.Component<any, any> {
  @observable userAvatar: any;
  @observable upload: any;

  constructor(props: any) {
    super(props);
    this.onEditAvatar = this.onEditAvatar.bind(this);
  }

  @action
  public onEditAvatar(event: React.MouseEvent<HTMLInputElement>) {
    this.upload.click();
  }

  public render(): JSX.Element {
    return (
      <Segment compact size="tiny" basic vertical className="bd-0">
        <Label
          content="Your profile photo"
          className="content-left-label"
          icon="id badge"
        />
        <Card
          style={{ padding: "5px 5px 5px 5px" }}
          className=" profile__card bg-gray-200 bd-0"
        >
          <Image
            src={this.props.image}
            size="small"
            className="profile__avatar"
          />
          <Card.Content extra>
            <Button
              floated="right"
              size="tiny"
              icon
              color="olive"
              labelPosition="left"
              onClick={this.onEditAvatar}
            >
              <Icon name="edit" />
              Edit
            </Button>
            <input
              id="myInput"
              type="file"
              ref={ref => (this.upload = ref)}
              style={{ display: "none" }}
              onChange={this.props.onEditingAvatar}
            />
          </Card.Content>
        </Card>
      </Segment>
    );
  }
}
