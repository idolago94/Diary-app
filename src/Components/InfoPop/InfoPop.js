import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';
import { getFullDate } from '../../utils/Tools';
import { Tooltip } from 'react-native-elements';

export default InfoPop = props => {
    const { data } = props;
    return <View style={[s.info_icon, props.style]}>
        <Tooltip popover={<View>
            {data.date && <Text style={{fontWeight: 'bold'}}>{getFullDate(props.data.date)}</Text>}
            {data.desc && <Text>{data.desc}</Text>}
        </View>}>
            <Icon name='info' size={20} />
        </Tooltip>
    </View>
}

const s = StyleSheet.create({
    info_icon: {
        position: 'absolute',
        top: 5,
        right: 3,
        opacity: 0.6
    }
})