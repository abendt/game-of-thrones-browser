// @flow

import {List} from "semantic-ui-react";
import React from "react";
import type {House} from "./App";

type Props = {
    house: House
}

const HouseDetails = (props: Props) => (
    <List>
        <List.Item>
            <List.Header>Name</List.Header>{props.house.name}</List.Item>
        <List.Item><List.Header>Region</List.Header>{props.house.region}</List.Item>
        <List.Item><List.Header>Coat of Arms</List.Header>{props.house.coatOfArms}</List.Item>
        <List.Item><List.Header>Words</List.Header>{props.house.words}</List.Item>
        <List.Item><List.Header>Titles</List.Header>
            <List.List as="ul">
                {props.house.titles.map(title => <List.Item key={title} as="li">{title}</List.Item>)}
            </List.List>
        </List.Item>
    </List>
);

export default HouseDetails;
