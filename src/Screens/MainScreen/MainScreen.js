import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Screen from '../../Components/Screen/Screen';
import Task from '../../Components/Task/Task';
import { inject, observer } from "mobx-react";
import SlidingUp from '../../Components/SlidingUp/SlidingUp';

@inject('NavigationStore', 'AppStore')
@observer
export default class MainScreen extends Component {
    render() {
        let nonDoneTasks = this.props.AppStore.getNonDoneTasks;
        let tasksWithExpiryDate = nonDoneTasks.filter(t => !!t.expiry_date).sort((a,b) => new Date(a.expiry_date) - new Date(b.expiry_date));
        let tasks = nonDoneTasks.filter(t => !t.expiry_date);
        nonDoneTasks = tasksWithExpiryDate.concat(tasks);
        return (
            <Screen>
                <FlatList 
                    keyExtractor={(item, index) => index.toString()}
                    data={nonDoneTasks}
                    renderItem={({item, index}) => <Task onDelete={() => this.props.AppStore.deleteTask(item)} onDone={() => this.props.AppStore.doneTask(item)} data={item} />}			
                />
                {this.props.AppStore.getFutureMeetings.length > 0 && <SlidingUp />}
            </Screen>
        )
    }
}

const s = StyleSheet.create({
})