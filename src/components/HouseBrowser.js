// @flow

import {Icon, Menu, Table} from "semantic-ui-react";
import React from "react";
import type {House} from "../types";
import {isHouseEqualTo} from "../types";

const HouseRow = ({house, onSelectHouse, isSelected}) => (
    <Table.Row onClick={onSelectHouse} active={isSelected}>
        <Table.Cell>{house.name}</Table.Cell>
        <Table.Cell>{house.region}</Table.Cell>
    </Table.Row>
);

const isHouseSelected = (currentHouse, selectedHouse) => isHouseEqualTo(currentHouse, selectedHouse);

type Props = {
    houses: Array<House>,
    selectedHouse: ?House,
    onBack: () => any,
    onForward: () => any,
    onSelectHouse: (house: House) => any
}

const HouseBrowser = (props: Props) => (
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Region</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {props.houses.map(house => <HouseRow key={house.url}
                                                 house={house}
                                                 isSelected={isHouseSelected(house, props.selectedHouse)}
                                                 onSelectHouse={() => props.onSelectHouse(house)}/>)}
        </Table.Body>

        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='3'>
                    <Menu floated='right' pagination>
                        <Menu.Item as='a' icon onClick={props.onBack}>
                            <Icon name='chevron left'/>
                        </Menu.Item>

                        <Menu.Item as='a' icon onClick={props.onForward}>
                            <Icon name='chevron right'/>
                        </Menu.Item>
                    </Menu>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
);

export default HouseBrowser;
