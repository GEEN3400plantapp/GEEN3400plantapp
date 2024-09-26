import React from 'react';
import { StyleSheet, View, Text, Button, ImageBackground, SafeAreaView } from 'react-native';
import Card from '../shared/card';
import { Divider } from 'react-native-elements';
import BottomTabs from '../routes/bottomTabs';

export default function Home({ navigation}){ //pass function navigation
    

    const pressHandler = () => { //Function that handles button press
        //navigation.navigate('Plants') //same thing as below
        navigation.push('Plants'); //pushes next screen onto stack
    }
    const pressHandlerBT = () => { //Function that handles button press
        //navigation.navigate('Plants') //same thing as below
        navigation.push('Bluetooth'); //pushes next screen onto stack
    }
    // const pressHandlerBT = () => { //Function that handles button press
    //     //navigation.navigate('Plants') //same thing as below
    //     navigation.push('Description'); //pushes next screen onto stack
    // }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style = {styles.titleText}> Home Screen </Text>
                <Card>
                    <Button //handles 'go to plants' button
                        onPress={pressHandler}
                        title = "Go to Plants"
                        color = 'white'
                    />
                </Card>
                <Card>
                    <Button 
                        onPress={pressHandlerBT} 
                        title = "Set up Bluetooth"
                        color = 'white'
                        />
                </Card>
            </View>
            <Divider width={1}/>
            <BottomTabs />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
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