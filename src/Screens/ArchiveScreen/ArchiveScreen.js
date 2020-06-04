import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Screen from '../../Components/Screen/Screen';
import { inject, observer } from "mobx-react";
import Task from '../../Components/Task/Task';

@inject('AppStore')
@observer
export default class ArchiveScreen extends Component {
    render() {
        let allTasks = this.props.AppStore.getAllTasks.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        return (
            <Screen>
                <FlatList 
                    keyExtractor={(item, index) => index.toString()}
                    data={allTasks}
                    renderItem={({item, index}) => <Task onDelete={() => this.props.AppStore.deleteTask(item)} data={item} />}			
                />
            </Screen>
        )
    }
}

const s = StyleSheet.create({
})