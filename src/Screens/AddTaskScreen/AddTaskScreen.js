import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Screen from '../../Components/Screen/Screen';
import { Input, Card, Button } from 'react-native-elements';
import { inject, observer } from "mobx-react";
import DateTimePicker from '@react-native-community/datetimepicker';


@inject('NavigationStore', 'AppStore')
@observer
export default class AddTaskScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            task: {}
        }
    }

    onSave() {
        // add: validate form
        this.props.AppStore.addTask(this.state.task);
        this.props.NavigationStore.goBack();
    }

    render() {
        return (
            <Screen>
                <Card>
                    <Input
                        containerStyle={s.input}
                        label='כותרת'
                        placeholder='הכנס כותרת ראשית למשימה'
                        labelStyle={{alignSelf:'flex-end'}}
                        errorStyle={{ color: 'red' }}
                        errorMessage={this.state.errors.title}
                        value={this.state.title}
                        onChangeText={e => this.setState({ task: {...this.state.task, title: e} })}
                    />
                    <View style={s.input}>
                        <Text h4>פרטים נוספים</Text>
                        <TextInput 
                            style={s.details}
                            multiline = {true}
                            numberOfLines = {40} 
                            value={this.state.desc}
                            onChangeText={e => this.setState({ task: {...this.state.task, desc: e} })}
                        />
                        <Text style={s.detials_error}>{this.state.errors.desc}</Text>
                    </View>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.task.expiry_date || new Date()}
                        minimumDate={new Date()}
                        locale="he"
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={(e,expiry_date) => {this.setState({task: Object.assign(this.state.task, { expiry_date })})}}
                    />
                    <View style={s.row}>
                        <Button
                            buttonStyle={{backgroundColor: 'red'}}
                            icon={{name: "cancel",color: "white"}}
                            title='ביטול'
                            onPress={() => this.props.NavigationStore.goBack()}
                        />
                        <Button
                            icon={{name: "save",color: "white"}}
                            title="שמור משימה"
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