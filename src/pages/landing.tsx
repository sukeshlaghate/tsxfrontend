import * as React from 'react';
import {
    Button,
    Container,
    
    Grid,
    Header,
    
    Image,
    
    Menu,
    Segment,
    Visibility,
} from 'semantic-ui-react';

const FixedMenu = ():JSX.Element =>{
    return(
     <Menu fixed='top' size='large'>
        <Container>
            <Menu.Item as='a' active>Home</Menu.Item>
            <Menu.Item as='a'>Work</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item className='item'>
                    <Button as='a'>Log in</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button as='a' inverted primary>Sign Up</Button>
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
    );
}

export default class Landing extends React.Component<any,any>{
    constructor(props:any){
        super(props);
        this.state = {};

    }

    hideFixedMenu = () => this.setState({ visible: false });
    showFixedMenu = () => this.setState({ visible: true });
    handleLoginClick = () =>  window.location.href = "/login";

    handleLoginKeyPress = (e:KeyboardEvent) => {
        if (e.charCode === 32 || e.charCode === 13) {
            // Prevent the default action to stop scrolling when space is pressed
            e.preventDefault();
            window.location.href = "/login";
        }
    };
    handleSignupClick = () =>  window.location.href = "/signup";

    handleSignupKeyPress = (e:KeyboardEvent) => {
        if (e.charCode === 32 || e.charCode === 13) {
            // Prevent the default action to stop scrolling when space is pressed
            e.preventDefault();
            window.location.href = "/signup";
        }
    };

    public render():JSX.Element {
        const {visible} = this.state;

        return(
          <div>
              { visible ? <FixedMenu /> : null }
              <Visibility onBottomPassed={this.showFixedMenu}
                onBottomVisible={this.hideFixedMenu} once={false}>
                  <Segment inverted textAlign={'center'}
                           style={{minHeight:700, padding:'1em 0em'}} vertical >
                      <Container>
                          <Menu inverted pointing primary size={'large'}>
                              <Menu.Item as='a' active> Home </Menu.Item>
                              <Menu.Item as={'a'}>Company </Menu.Item>
                              <Menu.Item as={'a'}>Careers</Menu.Item>
                              <Menu.Item position={'right'}>
                                  <Button as={'a'}  inverted primary onClick={this.handleLoginClick}
                                          onKeyPress={this.handleLoginKeyPress}> Log in </Button>
                                  <Button as={'a'}  inverted style={{marginLeft:'0.5em'}}
                                          onClick={this.handleSignupClick}
                                          onKeyPress={this.handleSignupKeyPress}>
                                      Sign Up
                                  </Button>
                              </Menu.Item>
                          </Menu>
                      </Container>
                      <Container text>
                          <Image  src='/mandala.jpg' size={'big'} centered rounded inline />
                              <Header as={'h1'}
                                     inverted
                                     style={{ fontSize: '4.5em', fontFamily: '\'Lato\', "Helvetica", Arial, sans-serif !important'}}>
                                  Great-Company
                              </Header>
                          <Header
                              as='h2'
                              content='Company Tag Line!'
                              inverted
                              style={{fontSize: '1.7em', fontWeight: 'normal' }}
                          />
                      </Container>
                  </Segment>
              </Visibility>

              <Segment style={{ padding: '8em 0em' }} vertical>
                  <Grid container stackable verticalAlign='middle'>
                      <Grid.Row>
                          <Grid.Column width={8}>
                          </Grid.Column>
                      </Grid.Row>
                  </Grid>
              </Segment>
          </div>
        )
    }
}