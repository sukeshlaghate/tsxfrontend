/// <reference path="../../index.d.ts" />
import * as React from "react";
import {
  Button,
  Card,
  Container,
  // Dropdown,
  Form,
  Grid,
  Label,
  List,
  Icon,
  Image,
  Input,
  Segment
} from "semantic-ui-react";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import * as _ from "lodash";

interface iTag {
  title: string;
  category: string;
}

type Colors = 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' |
'pink' | 'brown' | 'grey' | 'black';

@observer
export default class Tags extends React.Component<any, any> {
  @observable private selected_tags: iTag[] = new Array<iTag>();
  @observable
  private category_color_map: Map<string, string> = new Map<string, string>();
  //@observable private tagOptions: Map<string,string[]> = new Map<string, string[]>();
  @observable private tagOptions: any = observable.map();

  @observable showTagList: boolean = false;

  constructor(props: any) {
    super(props);
    this.onDeleteTag = this.onDeleteTag.bind(this);
    this.onTagSelection = this.onTagSelection.bind(this);
    this.onAddTag = this.onAddTag.bind(this);

    this.tagOptions = this.selected_tags = [
      { title: "Bootstrap 4", category: "css" },
      { title: "Java 8 SE", category: "language" },
      { title: "Java 8 SE", category: "language" },
      { title: ".Net C#", category: "language" },
      { title: "Qt 5.2", category: "language" },
      { title: "React js", category: "frontend frameworks" },
      { title: "Angular", category: "frontend frameworks" },
      { title: ".Net 4.6", category: "frameworks" }
    ];

    //console.log("Constructor ==========>");
    //console.log(this.selected_tags.length);
    this.category_color_map.set("css", "teal");
    this.category_color_map.set("language", "olive");
    this.category_color_map.set("frontend frameworks", "yellow");
    this.category_color_map.set("frameworks", "orange");
    this.category_color_map.set("database", "pink");
    this.sort_remove_dup_tags;
  }

  @action
  addTags(tags: iTag[]) {
    //console.log("<=========== addTags start ===========>");
    //console.log(this.selected_tags.length);
    this.selected_tags.concat(tags);
    // console.log(" after concat length " + this.selected_tags.length);
    // console.log(this.selected_tags);
    //console.log("<=========== addTags end ===========>");
  }

  @action
  addTag(tag: iTag) {
    // console.log("before merge");
    // console.log(this.selected_tags.length);
    this.selected_tags[this.selected_tags.length] = tag;

    // console.log("after merge");
    //  console.log(this.selected_tags.length);
  }

  @computed
  get sort_remove_dup_tags() {
    //console.log("<=========== Runing Computed ===========>");
    this.selected_tags = _.sortBy(this.selected_tags, (tag: iTag) => {
      return tag.category;
    });

    this.selected_tags = _.sortedUniqBy(this.selected_tags, (tag: iTag) => {
      return tag.title;
    });

    // index tags by "title + category"
    var lookup = _.keyBy(this.selected_tags, function(o) {
      return o.title + o.category;
    });
    // index tags by "title + category"
    this.tagOptions = _.filter(this.props.tagStore, function(u) {
      return lookup[u.value.title + u.value.category] === undefined;
    });
    return true;
  }

  /**
* Since SUR doesnt have a onClick event we implement a workaround where
* we leverage the HTML id element to store the tag title and act as unique 
* identifier ;)
*/
  public onDeleteTag(e: React.MouseEvent<HTMLLabelElement>) {
    console.log("delete tag =====>");
    console.log((e.target as HTMLLabelElement).id);
    _.remove(this.selected_tags, tag => {
      return tag.title === (e.target as HTMLLabelElement).id;
    });
  }

  public onTagSelection(
    event: React.MouseEvent<HTMLSelectElement>,
    data: any
  ) {
    //console.log("<========= OnTagSelection start============>");
    //console.log(data.value);
    // console.log("<========= OnTagSelection end============>");
    let tags = data.value.map((item:any) => {
      let tag = { title: item.title, category: item.category };
      return tag;
    });
    // console.log(tags);
    this.addTags(tags);
    //this.addTag(item.value);
    // this.addTag({
    //   title: data.value[0].title,
    //   category: data.value[0].category
    // });
  }

  public onAddTag(e: React.MouseEvent<HTMLButtonElement>, data: any) {
    this.showTagList = !this.showTagList;
  }

  public get getTagList(): JSX.Element {
    const headers = [];
    for (let [lbl_key, value] of this.category_color_map) {
      headers.push(<Label id={lbl_key} key={lbl_key} inverted={true} color={(value as Colors)} content={lbl_key}/>);
    }

    return (
    <Segment compact={true} size={"tiny"} basic={true} vertical={true} className={"bd-0"}>
        <List>
          <List.Item >
            {headers}
          </List.Item>
        </List>
      </Segment>
    );
  }
  public render(): JSX.Element {
    return (
      <Segment compact={true} size={"tiny"} basic={true} vertical={true} className={"bd-0"}>
        <Label className="content-left-label">
          <Icon name="tags" />
          {"Your Tags"}
        </Label>
        <Card className={" profile__card bg-gray-200 bd-0"}>
          <Card.Content textAlign="left">
            {this.selected_tags.map(tag => (
              <Grid.Column>
                <Label
                  key={tag.title}
                  tag
                  style={{
                    marginBottom: "2px"
                  }}
                  color={(this.category_color_map.get(tag.category) as Colors)}
                >
                  {tag.title}{" "}
                  <Icon
                    name="close"
                    key={tag.title}
                    id={tag.title}
                    onClick={this.onDeleteTag}
                  />
                </Label>
              </Grid.Column>
            ))}
          </Card.Content>
          <Card.Content extra={true}>
            {/*<Dropdown
              button
              className="icon"
              float="right"
              labeled
              multiple
              icon="add"
              search
              onChange={this.onTagSelection}
              text="Add Tag"
              options={this.tagOptions}
            />*/}
            <Button
              floated={"right"}
              size={"tiny"}
              icon={true}
              color={"olive"}
              labelPosition={"left"}
              onClick={this.onAddTag}
            >
              <Icon name={"add"} />
              Add Tags
            </Button>
          </Card.Content>
        </Card>
        {this.showTagList ? this.getTagList : null}
      </Segment>
    );
  }
}
