// @flow

import { Icon, Menu, Table } from "semantic-ui-react";
import React from "react";
import type { House } from "../types";
import { isHouseEqualTo } from "../types";
import type { State } from "../store/state";
import * as actions from "../store/actions";
import { connect } from "react-redux";

const HouseRow = ({ house, onSelectHouse, isSelected }) => (
    <Table.Row onClick={onSelectHouse} active={isSelected} data-it-id="house-row">
        <Table.Cell>{house.name}</Table.Cell>
        <Table.Cell>{house.region}</Table.Cell>
    </Table.Row>
);

const isHouseSelected = (currentHouse, selectedHouse) =>
    isHouseEqualTo(currentHouse, selectedHouse);

type Props = {
    houses: Array<House>,
    selectedHouse: ?House,
    onBack: () => any,
    onForward: () => any,
    onSelectHouse: (house: House) => any
};

const HouseBrowser = (props: Props) => (
    <Table celled data-it-id="house-browser">
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Region</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {props.houses.map((house) => (
                <HouseRow
                    key={house.url}
                    house={house}
                    isSelected={isHouseSelected(house, props.selectedHouse)}
                    onSelectHouse={() => props.onSelectHouse(house)}
                />
            ))}
        </Table.Body>

        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan="3">
                    <Menu floated="right" pagination>
                        <Menu.Item as="a" icon onClick={props.onBack}>
                            <Icon name="chevron left" />
                        </Menu.Item>

                        <Menu.Item as="a" icon onClick={props.onForward}>
                            <Icon name="chevron right" />
                        </Menu.Item>
                    </Menu>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
);

const mapStoreToProps = (store: State) => ({
    houses: store.houses,
    selectedHouse: store.selectedHouse
});

const mapDispatchToProps = (dispatch) => ({
    onBack: () => dispatch(actions.requestPageBackward()),
    onForward: () => dispatch(actions.requestPageForward()),
    onSelectHouse: (house: House) => dispatch(actions.requestSelectHouse(house))
});

const ConnectedBrowser = connect(
    mapStoreToProps,
    mapDispatchToProps
)(HouseBrowser);

export default ConnectedBrowser;
