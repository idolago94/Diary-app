import React from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { Avatar, colors, Icon } from 'react-native-elements';
import { getShortDate, timeLeft, getFullDate } from '../../utils/Tools';
import { window_width } from '../../utils/Style';
import Swipeable from 'react-native-swipeable';
import { Tooltip } from 'react-native-elements';
import InfoPop from '../InfoPop/InfoPop';

export default Meeting = props => {
    const{ data } = props;
    
    if(props.onPress) {
        return(<TouchableWithoutFeedback onPress={() => props.onPress ? props.onPress():console.log('meeting press')}>
            <View style={[s.root, props.style]}>
                <Avatar 
                    size="medium"
                    title={getShortDate(data.date)} 
                    containerStyle={{backgroundColor: colors.primary, marginLeft: 10}} 
                    rounded 
                />
                <View>
                    <Text style={s.title}>{data.title}</Text>
                    <Text style={s.adress}>{data.adress}</Text>
                </View>
                <InfoPop data={data} />
                <Text style={s.date}>{timeLeft(data.date)}</Text>
            </View>
        </TouchableWithoutFeedback>)
    }
    const rightButtons = [
        <TouchableOpacity onPress={() => props.onDelete()} style={{flex: 1, aspectRatio: 1, backgroundColor: 'red', justifyContent: 'center'}}>
            <Icon name='trash' type='font-awesome' color='white' size={30} />
        </TouchableOpacity>
    ];
    return(<Swipeable style={{width: window_width}} rightButtons={rightButtons}>
        <View style={[s.root, props.style]}>
            <Avatar 
                size="medium"
                title={getShortDate(data.date)} 
                containerStyle={{backgroundColor: colors.primary, marginLeft: 10}} 
                rounded 
            />
            <View>
                <Text style={s.title}>{data.title}</Text>
                <Text style={s.adress}>{data.adress}</Text>
            </View>
            <InfoPop data={data} />
            <Text style={s.date}>{timeLeft(data.date)}</Text>
        </View>
    </Swipeable>)
}

const s = StyleSheet.create({
    root: {
        flexDirection: 'row-reverse',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        width: window_width,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'right'
    },
    adress: {
        color: 'gray',
        textAlign: 'right'
    },
    date: {
        color: 'gray',
        position: 'absolute',
        bottom: 3,
        right: 3
    }
})