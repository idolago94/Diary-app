import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Screen from '../../Components/Screen/Screen';
import { Input, Card, Button } from 'react-native-elements';
import { inject, observer } from "mobx-react";
import DateTimePicker from '@react-native-community/datetimepicker';

@inject('NavigationStore', 'AppStore')
@observer
export default class AddMeetingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            meeting: {}
        }
    }

    onSave() {
        // add: validate form
        this.props.AppStore.addMeeting(this.state.meeting);
        this.props.NavigationStore.goBack();
    }

    render() {
        return (
            <Screen>
                <Card>
                    <Input
                        containerStyle={s.input}
                        label='כותרת'
                        placeholder='הכנס כותרת ראשית לפגישה'
                        labelStyle={{alignSelf:'flex-end'}}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.errors.title}
                        value={this.state.title}
                        onChangeText={e => this.setState({ meeting: {...this.state.meeting, title: e} })}
                    />
                    <Input
                        containerStyle={s.input}
                        label='כתובת'
                        placeholder='הכנס את כתובת הפגישה'
                        labelStyle={{alignSelf:'flex-end'}}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.errors.adress}
                        value={this.state.adress}
                        onChangeText={e => this.setState({ meeting: {...this.state.meeting, adress: e} })}
                    />
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.meeting.date || new Date()}
                        minimumDate={new Date()}
                        locale="he-HE"
                        mode={'datetime'}
                        is24Hour={true}
                        display="default"
                        onChange={(e,date) => {this.setState({meeting: Object.assign(this.state.meeting, { date })})}}
                    />
                    <View style={s.input}>
                        <Text h4>פרטים נוספים</Text>
                        <TextInput 
                            style={s.details}
                            multiline = {true}
                            numberOfLines = {40} 
                            value={this.state.desc}
                            onChangeText={e => this.setState({ meeting: {...this.state.meeting, desc: e} })}
                        />
                        <Text style={s.detials_error}>{this.state.errors.desc}</Text>
                    </View>
                    <View style={s.row}>
                        <Button
                            buttonStyle={{backgroundColor: 'red'}}
                            icon={{name: "cancel",color: "white"}}
                            title='ביטול'
                            onPress={() => this.props.NavigationStore.goBack()}
                        />
                        <Button
                            icon={{name: "save",color: "white"}}
                            title="שמור פגישה"
                            onPress={() => this.onSave()}
                        />
                    </View>
                </Card>
            </Screen>
        )
    }
}

const s = StyleSheet.create({
    input: {
        marginVertical: 10,
        alignItems: 'flex-end'
    },
    details: {
        borderRadius: 10, 
        padding: 3, 
        backgroundColor: 'rgba(0,0,0,.1)', 
        margin: 10, 
        minHeight: '10%', 
        width: '95%'
    },
    detials_error: {
        fontSize: 12, 
        color: 'red'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})