import * as React from 'react';
import {
    Button,
    Container,
    Icon,
    Image,
    Menu,
    Search
} from "semantic-ui-react";
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { If } from "../../common/utils";

@inject('menuStore')
@observer
export default class FixedMenu extends React.Component<any, any>{
    @observable isUserLogged: boolean = false;
    @observable isLoading: boolean = false;
    @observable avatarurl: string = "";
    @observable username: string = "";

    @observable activeItem: string;
    constructor(props: any) {
        super(props);
        this.activeItem = 'Home';
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.toggleSideBar = this.toggleSideBar.bind(this);
        this.avatarurl =
            "https://react.semantic-ui.com/assets/images/avatar/large/matthew.png";
        this.username = "Matthew Robin";
    }

    public toggleSideBar(
        e: React.MouseEvent<HTMLAnchorElement>,
        data?: any
    ): void {
        e.preventDefault();
        this.props.menuStore.toggleMenu();
    }
    public signIn(e: React.MouseEvent<HTMLButtonElement>, data?: any): void {
        e.preventDefault();
        this.isUserLogged = true;
        this.props.menuStore.toggleSidebarVisibility();
    }

    public signOut(e: React.MouseEvent<HTMLButtonElement>, data?: any): void {
        e.preventDefault();
        this.isUserLogged = false;
        this.props.menuStore.toggleSidebarVisibility();
    }

    public render(): JSX.Element {
        return (
            <Menu attached="top" inverted color={'orange'} pointing secondary >
                <Container>
                    <Menu.Item>
                        <Image floated='left' size='tiny' src='/logo.png' />
                    </Menu.Item>
                    <If cond={!this.isUserLogged}>
                        <Menu.Item as='a' active={this.activeItem === 'Home' ? true : false}>Home</Menu.Item>
                        <Menu.Item as='a' active={this.activeItem === 'Work' ? true : false}>Work</Menu.Item>
                        <Menu.Item as='a' active={this.activeItem === 'Company' ? true : false}>Company</Menu.Item>
                        <Menu.Item as='a' active={this.activeItem === 'Careers' ? true : false}>Careers</Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item className='item'>
                                <Button as='a' onClick={this.signIn}>Log in</Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Button as='a' inverted primary>Sign Up</Button>
                            </Menu.Item>
                        </Menu.Menu>
                    </If>
                    <If cond={this.isUserLogged}>
                        <Menu.Item as="a" onClick={this.toggleSideBar}>
                            <Icon name="sidebar" />
                        </Menu.Item>

                        <Menu.Item>
                            <Search loading={this.isLoading} />
                        </Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item className="item">
                                <Image avatar size="tiny" src={this.avatarurl} />{" "}
                                <span> {this.username}</span>
                            </Menu.Item>
                            <Menu.Item>
                                <Button as="a" secondary onClick={this.signOut} content="Sign Out" />
                            </Menu.Item>
                        </Menu.Menu>
                    </If>
                </Container>
            </Menu>
        );
    }
} 
