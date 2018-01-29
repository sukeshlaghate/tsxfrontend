import * as React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Icon, Label, Menu, Sidebar } from 'semantic-ui-react';
import { If } from '../../common/utils';
// import StateNotifier from '../../services/statenotifier';

// const sidebarStyle ={
//     backgroundColor:'rgba(0,0,0,0.4)'
// }

const menuHeaderStyle = {
    float: "right"
};

@inject("menuStore")
@observer
export default class SidebarMenu extends React.Component<any, any> {
    
    @observable activeItem: string;

    constructor(props: any) {
        super(props);
        
        this.activeItem = 'enterprise';
        // this.stateNotifier.subscribe("isMenuExpanded",(isExpanded:boolean) => {
        //     isExpanded = isExpanded;

        //  });
        this.handleItemClick = this.handleItemClick.bind(this);

    }

    public handleItemClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        data: any
    ): void {
        e.preventDefault();
        console.log(data.name);
        this.setActive(data.name);
    }

    @action.bound
    public setActive(itemName: any) {
        this.activeItem = itemName;
    }

    public render(): JSX.Element {
        const isExpanded = this.props.menuStore.isMenuExpanded;
        const visibility = this.props.menuStore.isSidebarVisible;
        return (

            <Sidebar
                as={Menu}
                animation="uncover"
                visible={visibility}
                width={isExpanded ? "thin" : "very thin"}
                vertical
                icon={!isExpanded}
                inverted
                pointing
                color={this.props.color} >
                <Menu.Item>
                    <Menu.Header active={this.activeItem === "Dashboard"}>
                        {isExpanded ? "Dashboard" : " "}
                        {isExpanded ? (
                            <Icon name="dashboard" style={menuHeaderStyle} />
                        ) : (
                                <Icon name="dashboard" size="large" />
                            )}
                    </Menu.Header>
                    <If cond={isExpanded}>
                        <Menu.Menu>
                            <Menu.Item
                                name="enterprise"
                                active={this.activeItem === "enterprise"} />
                            <Menu.Item
                                name="consumer"
                                active={this.activeItem === "consumer"} />
                        </Menu.Menu>
                    </If>
                </Menu.Item>
                <Menu.Item>
                    {isExpanded ? (
                        <Icon name="block layout" />
                    ) : (
                            <Icon name="block layout" size="large" />
                        )}
                    {isExpanded ? "Topics" : " "}
                </Menu.Item>
                <Menu.Item>
                    {isExpanded ? (
                        <Icon name="smile" />
                    ) : (
                            <Icon name="smile" size="large" />
                        )}
                    {isExpanded ? "Friends" : " "}
                </Menu.Item>
                <Menu.Item>
                    {isExpanded ? (
                        <Icon name="calendar" />
                    ) : (
                            <Icon name="calendar" size="large" />
                        )}
                    {isExpanded ? "History" : " "}
                    {isExpanded ? (
                        <Label floated size="tiny" color="olive" content="New" />
                    ) : null}
                </Menu.Item>
            </Sidebar>
        );
    }
}
