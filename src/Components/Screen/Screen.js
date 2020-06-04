import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default Screen = props => {
    return (
        <View style={[s.root, props.style]}>
            {props.background && <Image style={s.background} source={{ uri: `https://source.unsplash.com/featured/?${props.background}` }} />}
            {props.background && <View style={[s.background, { backgroundColor: 'rgba(0,0,0,.7)' }]} />}
            {props.children}
        </View>
    );
}

const s = StyleSheet.create({
    root: {
        flex: 1,
        // backgroundColor: '#424242',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
})