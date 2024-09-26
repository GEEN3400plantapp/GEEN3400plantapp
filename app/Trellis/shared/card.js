import React from 'react';
import { StyleSheet, View  } from 'react-native';

export default function Card(props){
    return(
        <View style={styles.card}>
        <View style = {styles.cardContent}>
            {props.children}
        </View>
        </View>
    )
}
/*

card.js handles everything having to do with our cards, or rather, the stuff
that we see behind the button to make it look better.

*/
const styles = StyleSheet.create({
    card: {
        borderRadius: 30,
        elevation: 3,
        shadowOffset: {width: 5, height: 5}, //offset of shadow
        shadowColor: '#333',
        shadowOpacity: 0.3, //opacity of shadow below button
        shadowRadius: 1, //shadow radius
        marginHorizontal: 4, //distance bewteen next object horizontally
        marginVertical: 6, //distance between next object vertically
        backgroundColor: '#58d68d', //background color of card
    },
    cardContent: {
        marginHorizontal: 10, //width of card
        marginVertical: 10 //height of card
    }
})
 