
import * as React from "react";
import {
  Button,
  Container,
  Dimmer,
  Grid,
  Icon,
  Loader,
  Popup,
  Segment
} from "semantic-ui-react";
import {observable, action, computed} from "mobx";
import {observer} from "mobx-react";
import * as _ from "lodash";
import axios from "axios";
import * as AvatarEditor from "react-avatar-editor";
// - Import app API import * as FileAPI from "FileAPI";

import {If} from "../../common/utils";
import Avatar from "./avatar";
import AccountDetails from "./accountdetails";
import UserDetails from "./userdetails";
import Tags from "./tags";
import './profile.css';

import tagStore from "./tagstore";

@observer
export default class Profile extends React.Component < any,
any > {
  @observable private isProfileLoaded : boolean = false;
  @observable private isEditingAvatar : boolean = false;
  @observable private title : string;
  @observable private first_name : string;
  @observable private last_name : string;
  @observable private designation : string;
  @observable private location : string;
  @observable private linkedin : string;
  @observable private portfolio_url : string;
  @observable private image_src : string;
  @observable private user_name : string;
  @observable private email : string;
  @observable private nationality : string;
  @observable private editing_img_src : string;

  //ToDo: refactor avtar editing Avatar editing specific observable
  @observable private zoom : number = 1.0;
  @observable private rotate : number;

  private editor : any;

  constructor(props : any) {
    super(props);
    this.onSubmit = this
      .onSubmit
      .bind(this);
    this.onFetchProfile = this
      .onFetchProfile
      .bind(this);
    this.onTitleChange = this
      .onTitleChange
      .bind(this);
    this.onFirstNameChange = this
      .onFirstNameChange
      .bind(this);
    this.onLastNameChange = this
      .onLastNameChange
      .bind(this);
    this.onEmailChange = this
      .onEmailChange
      .bind(this);
    this.onUsernameChange = this
      .onUsernameChange
      .bind(this);
    this.onEditAvatar = this
      .onEditAvatar
      .bind(this);

    axios
      .get("https://randomuser.me/api/")
      .then((response : any) => {
        //console.log("recieved randomuser"); console.log(response);
        this.onFetchProfile(response);
      });

    //Avatar editing specific need refactoring
    this.editor = this
      .setEditorRef
      .bind(this);
    this.onChangeZoom = this
      .onChangeZoom
      .bind(this);
    this.onChangeRotate = this
      .onChangeRotate
      .bind(this);
    this.onCloseEditor = this
      .onCloseEditor
      .bind(this);
    this.onSave = this
      .onSave
      .bind(this);
  }

  componentWillmount() {
    console.log("Component mounting");
  }

  setEditorRef = (editor : any) => {
    this.editor = editor;
  }

  @action
  public onTitleChange(event : React.MouseEvent < HTMLSelectElement >, data : any) {
    this.title = data.value;
  }

  @action
  public onFirstNameChange(event : React.MouseEvent < HTMLInputElement >, data : any) {
    this.first_name = data.value;
    event.preventDefault();
  }

  @action
  public onLastNameChange(event : React.FormEvent < HTMLInputElement >, data : any) {
    //this.props.last_name = data.value;
    this.last_name = data.value;
    event.preventDefault();
  }

  @action
  public onEmailChange(event : React.FormEvent < HTMLInputElement >, data : any) {
    this.email = data.value;
    event.preventDefault();
  }

  @action
  public onUsernameChange(event : React.FormEvent < HTMLInputElement >, data : any) {
    this.user_name = data.value;
    event.preventDefault();
  }

  @action
  public onEditAvatar(event : React.MouseEvent < HTMLInputElement >) {
    this.isEditingAvatar = true;
    this.editing_img_src = event.target.files[0];

    console.log("In onEditAvatar isEditing" + this.isEditingAvatar);
    event.preventDefault();
  }

  public onSubmit(e : React.MouseEvent < HTMLButtonElement >, data : any) {
    // ToDo: post changes to the backend
    console.log(this.user_name);
    console.log(this.email);
  }

  /**
 * randomuser.me returns the following result
 * {
  "results": [
    {
      "gender": "male",
      "name": {
        "title": "mr",
        "first": "romain",
        "last": "hoogmoed"
      },
      "location": {
        "street": "1861 jan pieterszoon coenstraat",
        "city": "maasdriel",
        "state": "zeeland",
        "postcode": 69217
      },
      "email": "romain.hoogmoed@example.com",
      "login": {
        "username": "lazyduck408",
        "password": "jokers",
        "salt": "UGtRFz4N",
        "md5": "6d83a8c084731ee73eb5f9398b923183",
        "sha1": "cb21097d8c430f2716538e365447910d90476f6e",
        "sha256": "5a9b09c86195b8d8b01ee219d7d9794e2abb6641a2351850c49c309f1fc204a0"
      },
      "dob": "1983-07-14 07:29:45",
      "registered": "2010-09-24 02:10:42",
      "phone": "(656)-976-4980",
      "cell": "(065)-247-9303",
      "id": {
        "name": "BSN",
        "value": "04242023"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/83.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/83.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/83.jpg"
      },
      "nat": "NL"
    }
  ],
  "info": {
    "seed": "2da87e9305069f1d",
    "results": 1,
    "page": 1,
    "version": "1.1"
  }
}
 */
  @action
  public onFetchProfile(response : any) {
    this.isProfileLoaded = true;
    // user details
    this.title = _.upperFirst(response.data.results[0].name.title);
    this.first_name = response.data.results[0].name.first;
    this.last_name = response.data.results[0].name.last;
    this.image_src = response.data.results[0].picture.large;
    const location = response.data.results[0].location;
    this.nationality = response.data.results[0].nat;

    this.location = location.city + ", " + location.state + ", " + this.nationality;

    // users account details
    this.user_name = response.data.results[0].login.username;
    this.email = response.data.results[0].email;
  }

  //Avatar editing specific needs refactoring
  @action
  public onChangeZoom(event : React.MouseEvent < HTMLInputElement >) {
    this.zoom = event.target.value;
  }

  @action
  public onChangeRotate(event : React.MouseEvent < HTMLInputElement >) {
    this.rotate = event.target.value;
  }

  @action
  public onSave(event : React.MouseEvent < HTMLInputElement >) {}

  @action
  public onCloseEditor(event : React.MouseEvent < HTMLInputElement >) {
    this.isEditingAvatar = false;
  }

  render() : JSX.Element {
    //this.tagOptions.keys.map(key => console.log(key));
    return(
      <Container basic className="bd-0">
        <Dimmer active={!this.isProfileLoaded}>
          <Loader content={"Getting profile"} size="medium"/>
        </Dimmer>

        <If cond={this.isEditingAvatar}>
          <Dimmer active={this.isEditingAvatar}>
            <Segment.Group compact vertical>
              <AvatarEditor ref={this.setEditorRef} image={this.editing_img_src} width={250} height={250} border={10} color={[255, 255, 255, 0.6]} // RGBA
                scale={this.zoom} rotate={this.rotate}/>

              <Segment compact>
                <Icon name="zoom" circular color={this.props.iconColor || "olive"} inverted/>
                <input
                  type={"range"}
                  min={1}
                  max={10}
                  step={0.15}
                  value={this.zoom}
                  onChange={this.onChangeZoom}
                  className={" ui slider"}/>
              </Segment>
              <Segment compact>
                <Icon name="refresh" circular color={this.props.iconColor || "olive"} inverted/>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={this.rotate}
                  onChange={this.onChangeRotate}/>
              </Segment>
              <Segment compact>
                <Popup
                  trigger={< Button circular icon = "save" as = "div" color = "olive" onClick = {
                  this.onSave
                } />}
                  content="SAVE"
                  position="left center"
                  size="tiny"/>
                <Popup
                  trigger={< Button circular icon = "cancel" as = "div" onClick = {
                  this.onCloseEditor
                } />}
                  content="CANCEL"
                  position="right center"
                  size="tiny"/>
              </Segment>
            </Segment.Group>
          </Dimmer>
        </If>

        {/* Entire Profile form */}
        <Grid columns="equal">
          {/* Auth info section*/}
          <Grid.Row>
            <Grid.Column>
              <Avatar image={this.image_src} onEditingAvatar={this.onEditAvatar}/>
            </Grid.Column>
            <Grid.Column width={12}>
              <AccountDetails
                user_name={this.user_name}
                email={this.email}
                onUsernameChanged={this.onUsernameChange}
                onEmailChanged={this.onEmailChange}/>
            </Grid.Column>
          </Grid.Row>
          {/* Personal info section*/}
          <Grid.Row>
            <Grid.Column>{/* <Tag tagstore = {tagStore}/> */}</Grid.Column>
            <Grid.Column width={12}>
              <UserDetails
                title={this.title}
                first_name={this.first_name}
                last_name={this.last_name}
                location={this.location}
                nationality={this.nationality}
                onTitleChanged={this.onTitleChange}
                onFirstnameChanged={this.onFirstNameChange}
                onLastnameChanged={this.onLastNameChange}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Button
          floated="right"
          size="tiny"
          color="olive"
          icon
          labelPosition="left"
          onClick={this.onSubmit}>
          <Icon name="send"/>
          Submit
        </Button>
        <Button floated="right" size="tiny" color="red" icon labelPosition="left">
          <Icon name="remove"/>
          Cancel
        </Button>
      </Container>
    );
  }
}

/*
<Button
                      floated="right"
                      size="tiny"
                      color="olive"
                      icon
                      labelPosition="left"
                      onClick={this.addTagClick}
                    >
                      <Icon name="add" />
                      Add Tag
                    </Button>
*/
