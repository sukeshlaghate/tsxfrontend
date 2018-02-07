import * as React from "react";
import {
  Card,
  Form,
  Grid,
  Label,
  Icon,
  Input,
  Popup,
  Segment
} from "semantic-ui-react";
// import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import * as _ from "lodash";

const errorPopup = {
  borderRadius: "5",
  opacity: "0.7",
  padding: "0.86em",
  color: "#ff6961"
};




@observer
export default class AccountDetails extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Segment compact basic vertical className="bd-0">
        <Label
          content="Login Information"
          className="content-left-label"
          icon="id card"
        />
        <Card raised className=" profile__card bg-gray-200 bd-0">
          <Card.Content>
            <Form>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column textAlign="left" width={4}>
                    <Form.Field required error={!this.props.user_name}>
                      <label>
                        {"User Name"}
                        <Icon name="user" />
                        {":"}
                      </label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field required error={!this.props.user_name}>
                      <Popup
                        trigger={
                          <Input
                            placeholder="User name"
                            label={{ icon: 'asterisk' color: 'red' size: 'mini' }}
                            labelPosition='left corner'
                            value={this.props.user_name}
                            onChange={this.props.onUsernameChanged}
                          />
                        }
                        open={!this.props.user_name}

                        position="bottom center"
                        size="small"
                        style={errorPopup}
                        inverted>
                        <Popup.Content>
                          <Icon name='exclamation triangle' />{'User name is required'}
                        </Popup.Content>
                      </Popup>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="left" width={4}>
                    <Form.Field required error={!this.props.email}>
                      <label>
                        {"E-mail "}
                        <Icon name="mail" />
                        {":"} {" "}
                      </label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field required error={!this.props.email}>
                      <Popup
                        trigger={
                          <Input placeholder="email" 
                          label={{ icon: 'asterisk' color: 'red' size: 'mini' }}
                          labelPosition='left corner' value={this.props.email} 
                          onChange={this.props.onEmailChanged} />
                        }
                        open={!this.props.email}
                        position="bottom center"
                        size="small"
                        style={errorPopup}
                        inverted>
                        <Popup.Content>
                          <Icon name='exclamation triangle' />{'Email is required'}
                        </Popup.Content>
                      </Popup>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="left" width={4}>
                    <Form.Field>
                      <label>
                        {"Password "}
                        <Icon name="privacy" />
                        {":"}
                      </label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Label
                        basic
                        as="a"
                        textAlign="left"
                        content="Change Password"
                        className=" bg-gray-200 bd-0"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Card.Content>
        </Card>
      </Segment>
    );
  }
}
