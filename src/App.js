// @flow

import React, {Component} from 'react';
import {Grid, Header, Image} from 'semantic-ui-react'
import HouseTable from "./HouseTable";
import loadHouses, {isLastPage} from "./api-client";
import HouseDetails from "./HouseDetails";

export type House = {
    url: string,
    name: string,
    region: string,
    coatOfArms: string,
    words: string,
    titles: Array<string>
}

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

    componentDidMount() {
        this.loadPage(1);
    }

    selectHouse = (house: House) => {
        const currentSelection = this.state.selectedHouse;

        if (currentSelection != null && currentSelection.url === house.url) {
            this.setState({selectedHouse: null});
        } else {
            this.setState({selectedHouse: house});
        }
    };

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
                        <HouseTable houses={this.state.houses}
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
