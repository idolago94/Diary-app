import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../../Components/Screen/Screen';
import { inject, observer } from "mobx-react";
import { Card } from 'react-native-elements';
import { Input, Button } from 'react-native-elements';
import { window_width } from '../../utils/Style';

@inject('NavigationStore', 'AppStore')
@observer
export default class LoginScreen extends Component {
    render() {
        return (<Screen background='diary' style={s.center}>
            <Card containerStyle={s.form_box}>
                <Input
                    placeholder='שם משתמש\מייל'
                    rightIconContainerStyle={s.inputIcon}
                    inputStyle={s.input}
                    rightIcon={{ type: 'font-awesome-5', name: 'user-tie' }}
                    errorStyle={{ color: 'red' }}
                    // errorMessage='ENTER A VALID ERROR HERE'
                />
                <Input 
                    placeholder='סיסמא'
                    rightIconContainerStyle={s.inputIcon}
                    inputStyle={s.input}
                    rightIcon={{ type: 'font-awesome-5', name: 'key' }}
                    errorStyle={{ color: 'red' }}
                    // errorMessage='ENTER A VALID ERROR HERE'
                    secureTextEntry={true} 
                />
                <Button title="התחבר" />
            </Card>
        </Screen>)
    }
}

const s = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    form_box: {
        width: window_width*.8,
        borderRadius: 20,
    },
    input: {
        textAlign: 'right'
    },
    inputIcon: {
        marginLeft: 5
    }
})