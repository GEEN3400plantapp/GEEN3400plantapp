import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Card from '../shared/card';

export default function Home({navigation}){

    const pressHandler = () => {
        navigation.push('About')
    }
    const [plantName, plantInformation] = useState([
        { plantName: 'Snake Plant', color: 'Green', key: '1'},
        { plantName: 'Fern', color: 'Dark Green', key: '2'},
        { plantName: 'Algae', color: 'Orange', key: '3'}

    ]);

    return(
        <View style={styles.container}>
            
            <FlatList
                data={plantName}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('About', item)}>
                        <Card>
                            <Text style={styles.plantText}>{ item.plantName }</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
            <Button title='Go to about plants' onPress={pressHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 0.5,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    titleText: {
        fontSize: 50,
    },
    plantText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});