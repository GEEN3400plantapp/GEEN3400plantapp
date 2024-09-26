import React from 'react';
import { StyleSheet, View, Text,Image } from 'react-native';

export default function Home({navigation}){
return(
<View style= {styles.description}>
            <Text>{navigation.getParam('plantName')}</Text>
            <Text>{navigation.getParam('color')}</Text>
<Text>This is the text of a programmer</Text>

</View>
)


}

const styles = StyleSheet.create({
    description: {
        padding: 24,
        flex: 1,
        //justifyContent: 'center', 
        //alignItems: 'center',
    },
    titleText: {
        fontSize: 50,
    },
    buttonText: {
        color: 'white',
    }
});