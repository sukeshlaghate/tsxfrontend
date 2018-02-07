import * as React from "react";
import {
  Card,
  Form,
  Flag,
  Grid,
  Label,
  Icon,
  Input,
  Popup,
  Segment,
  Select
} from "semantic-ui-react";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import * as _ from "lodash";

const errorPopup ={
  borderRadius: '5',
opacity: '0.7',
padding: "0.86em",
color: '#ff6961'
};

@observer
export default class UserDetails extends React.Component<any, any> {
  private options = [
    { key: "Dr", text: "Dr", value: "Dr" },
    { key: "Mr", text: "Mr", value: "Mr" },
    { key: "Ms", text: "Miss", value: "Ms" },
    { key: "Mrs", text: "Mrs", value: "Mrs" },
    { key: "prof", text: "Prof", value: "Prof" }
  ];

  constructor(props: any) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <Segment compact basic vertical className="bd-0">
        <Label
          content="Personal Information"
          className="content-left-label"
          icon="address book"
        />
        <Card raised className=" profile__card bg-gray-200 bd-0">
          <Card.Content>
            <Form>
              <Grid columns={2}>
                {/* Title*/}
                <Grid.Row>
                  <Grid.Column textAlign="left" width={4}>
                    <Form.Field>
                      <label>Title:</label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field
                      control={Select}
                      options={this.options}
                      placeholder="Title"
                      value={this.props.title}
                      onChange={this.props.onTitleChanged}
                    />
                  </Grid.Column>
                </Grid.Row>
                {/* First name*/}
                <Grid.Row>
                  <Grid.Column textAlign="left" width={4}>
                    <Form.Field required error={!this.props.first_name}>
                      <label>First Name:</label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field required error={!this.props.first_name}>  
                      <Popup
                        trigger={<Input
                          placeholder="First name"
                          label={{ icon: 'asterisk' color: 'red' size:'mini' }}
                          labelPosition='left corner'
                          value={this.props.first_name}
                          onChange={this.props.onFirstnameChanged}
                        />}
                        open={!this.props.first_name}
                        
                        position='bottom center'
                        size='large'
                        style={errorPopup}
                        inverted>
                         <Popup.Content>
                          <Icon name='exclamation triangle' />{'First name is required'}
                         </Popup.Content>
                      </Popup>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="left" width={4}>
                    <Form.Field required error={!this.props.last_name}>
                      <label>Last Name:</label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field required error={!this.props.last_name}>
                      <Popup
                        trigger={<Input
                        placeholder="Last Name"
                        label={{ icon: 'asterisk' color: 'red' size: 'mini' }}
                        labelPosition='left corner'
                        value={this.props.last_name}
                        onChange={this.props.onLastnameChanged}
                        />}
                        open={!this.props.last_name}
                        
                        position='bottom center'
                        size='large'
                        style={errorPopup}
                        inverted>
                        <Popup.Content>
                          <Icon name='exclamation triangle' />{'Last name is required'}
                        </Popup.Content>
                      </Popup>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="left" width={4}>
                    <Form.Field>
                      <label>
                        {"Location"} <Icon name="point" /> {":"}{" "}
                      </label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Input
                        placeholder="City , Country e.g Mumbai, IN"
                        value={this.props.location}
                        label={
                          <Flag name={_.toLower(this.props.nationality)} />
                        }
                        labelPosition="right"
                      />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="left" width={4}>
                    <Form.Field>
                      <label>
                        {"Portfolio URL"} <Icon name="linkify" /> {":"}{" "}
                      </label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Input placeholder="http://myawesome.portfolio.com" />
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="left" width={4}>
                    <Form.Field>
                      <label>
                        {"Linkein URL"} <Icon name="linkedin square" /> {":"}{" "}
                      </label>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form.Field>
                      <Input placeholder="http://linkedin.com/profile/" />
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
