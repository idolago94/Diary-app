import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import StackNavigator from '../Navigators/StackNavigator';
import Routes from '../utils/Routes';
import Screen from '../Components/Screen/Screen';
import { inject, observer } from "mobx-react";
import CustomModal from '../Components/CustomModal/CustomModal';
import LoginScreen from './LoginScreen/LoginScreen';

@inject('NavigationStore', 'AppStore')
@observer
export default class MainRoot extends Component {

    _getCurrentRouteName(navState) {
        if (navState.hasOwnProperty('index')) {
            return this._getCurrentRouteName(navState.routes[navState.index])
        } else {
            return navState;
        }
    } 
    
    onNavigationStateChange = (oldState, newState, action) => {
        console.log('onNavigationStateChange -> ', this._getCurrentRouteName(newState))
        this.props.NavigationStore.updateCurrentScreen(this._getCurrentRouteName(newState));
    };

    render() {
        const { NavigationStore } = this.props;
        return (
            <Screen>
                {this.props.AppStore.getUserLogin ? (<SafeAreaView style={{flex: 1}}>
                    <StackNavigator 
                        stackRef={ref => {
                            NavigationStore.setMainNavigation(ref);
                            NavigationStore.updateCurrentScreen({routeName: Routes.Screens.MAIN.routeName});
                            NavigationStore.updatePrevPage(null);
                        }}
                        onNavigationStateChange={this.onNavigationStateChange}
                    />
                </SafeAreaView>) : <LoginScreen />}
                <CustomModal />
            </Screen>
        )
    }
}