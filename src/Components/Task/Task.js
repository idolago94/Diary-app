import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { Text } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { window_width, colors } from '../../utils/Style';
import { getShortDate } from '../../utils/Tools';
import InfoPop from '../InfoPop/InfoPop';

export default Task = props => {
    const { data } = props;

    const leftContent = <View style={[s.sideContainer, {alignItems: 'flex-end', backgroundColor: 'lightgreen'}]}>
        <Icon name='check-circle' color='white' size={30} containerStyle={{padding: 10}} />
    </View>;

    const rightButtons = [
        <TouchableOpacity onPress={() => props.onDelete()} style={[s.sideContainer, {backgroundColor: 'red', aspectRatio: 1}]}>
            <Icon name='trash' type='font-awesome' color='white' size={30} />
        </TouchableOpacity>
    ];

    return (
        <Swipeable 
            rightButtons={props.onDelete && rightButtons} 
            leftContent={props.onDone && leftContent} 
            leftActionActivationDistance={window_width*0.6} 
            onLeftActionRelease={() => props.onDone && props.onDone()}
        >
            <Card containerStyle={{marginHorizontal: 0}}>
                <View style={[s.root, props.style]}>
                    {data.expiry_date && <Avatar 
                        size="medium"
                        title={getShortDate(data.expiry_date)} 
                        containerStyle={{backgroundColor: colors.primary, marginLeft: 10}} 
                        rounded 
                    />}
                    <View>
                        <Text style={s.title}>{data.title}</Text>
                        <Text style={s.desc}>{data.desc}</Text>
                    </View>
                </View>
            </Card>
        </Swipeable>
    );
}

const s = StyleSheet.create({
    root: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    desc: {
        color: 'gray'
    },
    sideContainer: {
        flex: 1,
        // height: '81%', 
        justifyContent: 'center', 
        // transform: [{translateY: 15}]
    }
})