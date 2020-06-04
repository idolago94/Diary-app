import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

export default CustomButton = (props) => {
    const buttonRef = useRef(null);
    return (
        <TouchableWithoutFeedback 
            ref={buttonRef} 
            onPress={() => props.onPress ? props.onPress(buttonRef.current):console.log('press function not defined!')} 
            style={[props.style]}
        >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {props.icon && <Icon 
                        style={{paddingRight: props.title ? 3:0}} 
                        name={props.icon} 
                        size={props.iconSize || props.size || 20} 
                        color={props.iconColor || props.color || 'black'} 
                    />}
                    
                {props.title && <Text 
                        style={props.textStyle ? props.textStyle:{
                            color: props.textColor || props.color || 'black', 
                            fontSize: props.fontSize || props.size || 18
                        }}
                    >
                        {props.title}
                    </Text>}
            </View>
        </TouchableWithoutFeedback>
    )
}