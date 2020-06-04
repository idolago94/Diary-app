import React, { Component } from 'react';
import Modal, { ModalContent } from 'react-native-modals';
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native';
import { inject, observer } from "mobx-react";
import { Icon } from 'react-native-elements'
import { colors, window_width, window_height } from '../../utils/Style';
import Routes from '../../utils/Routes';

export const modal_types = {
    MEETINGS: 'meetings',
    SELECT_ADD: 'select_add'
}

const s = StyleSheet.create({
    select_root: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },  
    select_btn: {
        borderRadius: 10,
        margin: 10,
        width: window_width*0.3,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtn: {
        fontSize: 20,
        color: 'white',
        marginTop: 10
    }
})

@inject('NavigationStore')
@observer
export default class CustomModal extends Component {

    onNavigate(routeName) {
        this.props.NavigationStore.navigate(routeName);
        this.props.NavigationStore.setModal(null)
    }

    renderContent() {
        let modalType = this.props.NavigationStore.isModal;
        switch(modalType) {
            case modal_types.MEETINGS:
                return (
                    <Text>Meetings Modal</Text>
                );
                break;
                case modal_types.SELECT_ADD:
                return (<SelectAddModal onNavigate={this.onNavigate.bind(this)} />);
                break;
        }
    }

    render() {
        return (
            <Modal.BottomModal
                visible={!!this.props.NavigationStore.isModal}
                onTouchOutside={() => this.props.NavigationStore.setModal(null)}
            >
            <ModalContent>
              {this.renderContent()}
            </ModalContent>
          </Modal.BottomModal>
        )
    }
}

const SelectAddModal = props => {
    return (<View>
        <Text style={s.title}>מה תרצה להוסיף</Text>
        <View style={s.select_root}>
            <TouchableHighlight 
                onPress={() => props.onNavigate(Routes.Screens.ADD_TASK.routeName)} 
                style={[s.select_btn, {backgroundColor: 'red'}]}
            >
                <>
                    <Icon size={window_width*.1} color='white' name='tasks' type='font-awesome-5' />
                    <Text style={s.textBtn}>משימה</Text>
                </>
            </TouchableHighlight>
            <TouchableHighlight 
                onPress={() => props.onNavigate(Routes.Screens.ADD_MEETING.routeName)}
                style={[s.select_btn, {backgroundColor: colors.primary}]}
            >
                <>
                    <Icon size={window_width*.1} color='white' name='handshake' type='font-awesome-5' />
                    <Text style={s.textBtn}>פגישה</Text>
                </>
            </TouchableHighlight>
        </View>
    </View>);
}