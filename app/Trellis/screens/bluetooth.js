import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


export default function Bluetooth({ navigation}){
    

    const pressHandler = () => { //Function that handles button press
        //navigation.navigate('Plants') //same thing as below
        navigation.push('Plants'); //pushes next screen onto stack
    }

    return(
        <View style={styles.container}>
            <Text style = {styles.titleText}> Bluetooth Setup </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});