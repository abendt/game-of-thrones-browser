// @flow

import {List} from "semantic-ui-react";
import React from "react";
import type {House} from "../types";
import type {State} from "../store/state";
import {connect} from "react-redux";

type Props = {
    house: ?House
};

const HouseDetails = (props: Props) => {
    const house = props.house;

    if (house != null) {

        return (<List>
            <List.Item>
                <List.Header>Name</List.Header>
                {house.name}
            </List.Item>
            <List.Item>
                <List.Header>Region</List.Header>
                {house.region}
            </List.Item>
            <List.Item>
                <List.Header>Coat of Arms</List.Header>
                {house.coatOfArms}
            </List.Item>
            <List.Item>
                <List.Header>Words</List.Header>
                {house.words}
            </List.Item>
            <List.Item>
                <List.Header>Titles</List.Header>
                <List.List as="ul">
                    {house.titles.map((title) => (
                        <List.Item key={title} as="li">
                            {title}
                        </List.Item>
                    ))}
                </List.List>
            </List.Item>
        </List>);
    }

    return null;
};

const mapStoreToProps = (store: State) => ({
    house: store.selectedHouse
});

const ConnectedDetails = connect(
    mapStoreToProps
)(HouseDetails);

export default ConnectedDetails;
