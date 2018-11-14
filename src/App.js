// @flow

import React, {Component} from "react";
import {Dimmer, Grid, Header, Image, Loader} from "semantic-ui-react";
import HouseBrowser from "./components/HouseBrowser";
import HouseDetails from "./components/HouseDetails";
import type {House} from "./types";
import * as actions from "./store/actions";
import connect from "react-redux/es/connect/connect";
import type {State} from "./store/state";

type Props = {
    currentPage: number,
    houses: Array<House>,
    isRequestActive: boolean,
    loadPage: () => any
};

const SplashScreen = () => (
    <Grid.Row>
        <Grid.Column>
            <Image src="logo.png"/>
        </Grid.Column>
    </Grid.Row>
);

const Loading = () => (
    <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
    </Dimmer>
);

class App extends Component<Props> {

    componentDidMount() {
        setTimeout(() => this.props.loadPage(), 1000);
    }

    render() {
        if (this.props.houses.length === 0) {
            return <SplashScreen/>;
        }

        return (
            <Grid container style={{padding: "5em 0em"}}>

                <Grid.Row>
                    <Grid.Column>
                        <Header as="h1" dividing>
                            browse Game of Throne Houses (page
                            {this.props.currentPage})
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column floated="right">
                        {this.props.isRequestActive && <Loading/>}
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <HouseBrowser/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <HouseDetails/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStoreToProps = (store: State) => ({
    currentPage: store.currentPage,
    houses: store.houses,
    isRequestActive: store.activeRequest
});

const mapDispatchToProps = (dispatch) => ({
    loadPage: () => dispatch(actions.requestLoadHouses(1))
});

const ConnectedApp = connect(
    mapStoreToProps,
    mapDispatchToProps
)(App);

export default ConnectedApp;
