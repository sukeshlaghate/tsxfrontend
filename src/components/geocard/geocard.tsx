import * as React from 'react';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Card, Image, Segment } from 'semantic-ui-react';
import GeoCardMenu from './geocardmenu';
import { If } from '../../common/utils';
import { IGeoCardProps, IGeoCard } from '../../interfaces/igeocardifaces';

@observer
export default class GeoCard extends React.Component<IGeoCardProps, any>{
    @observable isShowHeader: boolean = true;
    @observable isShowMenu: boolean = false;
    @observable isShowFilterPopup: boolean = false;
    @observable isShowChartPopup: boolean = false;
    @observable isShowCardConfigPopup: boolean = false;
    constructor(props: IGeoCardProps) {
        super(props);
        this.isShowHeader = true;
        this.isShowMenu = false;
        this.isShowCardConfigPopup = false;
        this.isShowChartPopup = false;
        this.isShowCardConfigPopup = false;
    }

    public handleItemClick = (e: React.MouseEvent<any>, data?: any) => {
        e.preventDefault();
        switch (data.icon) {
            case "reply":
                this.toggleMenu();
                break;
            case "trash":
                // close the menu as it is no longer required
                // and ask parent to dispose us off
                this.toggleMenu();
                console.log("Trashing card with id: " + this.props.compKey);
                //      this.cardModel.removebyId(data.cardId);
                this.props.onDestroy(this.props.compKey)
                break;
            case 'filter':
                this.toggleFilterPopup();
                break;
            default:
                console.log(data);
                break;
        }
    };

    @computed
    public get canShowHeader() {
        return this.isShowHeader;
    }

    @computed
    public get canShowMenu() {
        return this.isShowMenu;
    }

    @computed
    public get canShowFilterPopup() {
        return this.isShowFilterPopup;
    }

    @computed
    public get canShowChartPopup() {
        return this.isShowChartPopup;
    }

    @computed
    public get canShowCardConfigPopup() {
        return this.isShowCardConfigPopup;
    }

    @action
    public toggleMenu = () => {
        this.isShowMenu = !this.isShowMenu;
        this.isShowHeader = !this.isShowHeader;
    }

    @action
    public toggleFilterPopup = () => {
        return (this.isShowFilterPopup = !this.isShowFilterPopup);
    }

    @action
    public toggleChartPopup = () => {
        return (this.isShowChartPopup = !this.isShowChartPopup);
    }

    @action
    public toggleCardConfigPopup = () => {
        return (this.isShowCardConfigPopup = !this.isShowCardConfigPopup);
    }

    render(): JSX.Element {
        let geoCard: IGeoCard = this.props.geoCard;
        return (

            < div >
                <If cond={this.canShowFilterPopup}>
                    <Segment>
                        <Button icon='close' basic={true} floated={'right'} onClick={this.toggleFilterPopup} />
                    </Segment>
                </If>
                <If cond={this.canShowChartPopup}>
                </If>
                <Card key={geoCard.id}>
                    <If cond={geoCard.image} >
                        <Image src={geoCard.image} />
                    </If>

                    <If cond={(geoCard.header || geoCard.meta || geoCard.description)}>
                        <Card.Content>
                            <If cond={this.canShowHeader} >
                                <Card.Header onClick={this.toggleMenu}>
                                    {geoCard.header}
                                </Card.Header>
                            </If>

                            <If cond={this.canShowMenu}>
                                <Card.Header>
                                    <GeoCardMenu cardId={geoCard.id} onItemClick={this.handleItemClick} />
                                </Card.Header>
                            </If>


                            <Card.Meta>{geoCard.meta}</Card.Meta>
                            <Card.Description>{geoCard.description}</Card.Description>
                        </Card.Content>
                    </If>

                    <If cond={geoCard.extra}>
                        <Card.Content extra> {geoCard.extra} </Card.Content>
                    </If>
                </Card>
            </div >

        );
        {/*<Segment.Group horizontal padded={'very'}>*/ }
        {/*</Segment.Group>*/ }
    }
}
