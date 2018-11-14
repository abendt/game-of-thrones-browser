// @flow

import React, {Component} from 'react';
import {Grid, Header, Image} from 'semantic-ui-react'
import HouseBrowser from "./components/HouseBrowser";
import loadHouses, {isLastPage} from "./api-client";
import HouseDetails from "./components/HouseDetails";
import type {House} from "./types";
import {isHouseEqualTo} from "./types";

type Props = {}

type State = {
    page: number,
    houses: Array<House>,
    selectedHouse: ?House
}

const Loading = () => (<Grid.Row>
    <Grid.Column>
        <Image src="logo.png"/>
    </Grid.Column>
</Grid.Row>);

class App extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            page: 1,
            houses: [],
            selectedHouse: null
        };
    }

    navivateForward = () => {
        const currentPage = this.state.page;

        if (!isLastPage(this.state.houses)) {
            this.loadPage(currentPage + 1);
        }
    };

    navigateBackward = () => {
        const currentPage = this.state.page;

        if (currentPage > 1) {
            this.loadPage(currentPage - 1);
        }
    };

    loadPage = (page: number) => loadHouses(page).then(houses => this.setState({page, houses}));

    selectHouse = (house: House) => {
        const currentSelection = this.state.selectedHouse;

        if (isHouseEqualTo(house, currentSelection)) {
            this.setState({selectedHouse: null});
        } else {
            this.setState({selectedHouse: house});
        }
    };

    componentDidMount() {
        this.loadPage(1);
    }

    render() {
        if (this.state.houses.length === 0) {
            return <Loading/>
        }

        const selectedHouse = this.state.selectedHouse;

        return (
            <Grid container style={{padding: '5em 0em'}}>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h1' dividing>
                            browse Game of Throne Houses (page {this.state.page})</Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <HouseBrowser houses={this.state.houses}
                                      selectedHouse={this.state.selectedHouse}
                                      onForward={this.navivateForward}
                                      onBack={this.navigateBackward}
                                      onSelectHouse={this.selectHouse}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        {selectedHouse != null && <HouseDetails house={selectedHouse}/>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default App;
