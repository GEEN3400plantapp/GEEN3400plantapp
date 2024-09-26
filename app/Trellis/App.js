import React from 'react';
import {useState} from 'react';
import { FlatList, View, Text, Image, StyleSheet, Animated, Dimensions, SafeAreaView, Button, TouchableOpacity, TextInput, onChangeText, ImageBackground, Alert} from 'react-native';
// import Navigator from './routes/homeStack';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
// import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
// import { createAppContainer, StackRouter } from "react-navigation";
import About from './screens/about'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Input } from 'react-native-elements';
import CircularProgress, { CircularProgressWithChild } from 'react-native-circular-progress-indicator';
import Card from './shared/card';
import MeetTeamCard from './shared/meetTeamCard';

const Tab = createBottomTabNavigator();

/* 
This new method works by having each screen as a 'function' (you'll see 
at the bottom), where when we click each icon at the bottom it will 'call'
that funtion which will then display the corresponding screen.
*/

const App = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return(
    <NavigationContainer>
            <Tab.Navigator screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle:{
                    backgroundColor: '#e6e6e6',
                    position: 'absolute',
                    bottom: 20,
                    marginHorizontal: 20,
                    height: 50,
                    borderRadius: 10,
                    borderColor: 'gray',
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: {
                        width: 10,
                        height: 10
                    }
                },
                
                headerStyle: {
                    backgroundColor: '#58d68d',
                }
            }}>
                <Tab.Screen name={"Login"} component={LoginStack}
                
                options={{
                  headerShown: false,
                  headerStatusBarHeight: 47,
                  headerTitleAlign: 'center',
                  headerTitleStyle:{
                    color: 'white',
                    fontFamily: 'HelveticaNeue',
                    fontWeight: '300',
                    fontSize: 20
                  
                  },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            position: "absolute",
                            top: '40%'
                        }}>
                            <FontAwesome5
                                name="address-card"
                                size={20}
                                color={focused ? '#58d68d' : 'gray'}
                            ></FontAwesome5>

                        </View>
                    )
                }} listeners={({navigation, route}) => ({
                    tabPress: e =>{
                        Animated.spring(tabOffsetValue,{
                            toValue:0,
                            useNativeDriver: true
                        }).start();
                    }
                })} ></Tab.Screen>
                <Tab.Screen name={"Search"} component={Search} 
                options={{
                  headerTitleStyle:{
                    color: 'white',
                    fontFamily: 'HelveticaNeue',
                    fontWeight: '300'
                  },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            position: "absolute",
                            top: '40%'
                        }}>
                            <FontAwesome5
                                name="search"
                                size={20}
                                color={focused ? '#58d68d' : 'gray'}
                            ></FontAwesome5>

                        </View>
                    )
                }} listeners={({navigation, route}) => ({
                    tabPress: e =>{
                        Animated.spring(tabOffsetValue,{
                            toValue:getWdith(),
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>

                <Tab.Screen name='Your Plants' component={PlantStack} 
                options={{
                  headerShown: false,
                  headerTitleStyle:{
                    color: 'white',
                    fontFamily: 'HelveticaNeue',
                    fontWeight: '300'
                  },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            position: "absolute",
                            top: '10%',
                            
                        }}>
                            <FontAwesome5
                                name="tree"
                                size={30}
                                color={focused ? '#58d68d' : 'gray'}
                            ></FontAwesome5>

                        </View>
                    )
                }} listeners={({navigation, route}) => ({
                    tabPress: e =>{
                        Animated.spring(tabOffsetValue,{
                            toValue:getWdith() *2 + 10 ,
                            useNativeDriver: true
                        }).start();
                    }
                })}>
 
                </Tab.Screen>
                

                <Tab.Screen name={"Notifications"} component={NotificationScreen} 
                options={{
                  headerTitleStyle:{
                    color: 'white',
                    fontFamily: 'HelveticaNeue',
                    fontWeight: '300'
                  },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            position: "absolute",
                            top: '40%'
                        }}>
                            <FontAwesome5
                                name="bell"
                                size={20}
                                color={focused ? '#58d68d' : 'gray'}
                            ></FontAwesome5>

                        </View>
                    )
                }} listeners={({navigation, route}) => ({
                    tabPress: e =>{
                        Animated.spring(tabOffsetValue,{
                            toValue:getWdith() * 3 + 15,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>
                <Tab.Screen name={"Profile"} component={ProfileScreen} 
                options={{
                  headerTitleStyle:{
                    color: 'white',
                    fontFamily: 'HelveticaNeue',
                    fontWeight: '300'
                  },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            position: "absolute",
                            top: '40%'
                        }}>
                            <FontAwesome5
                                name="user-alt"
                                size={20}
                                color={focused ? '#58d68d' : 'gray'}
                            ></FontAwesome5>

                        </View>
                    )
                }} listeners={({navigation, route}) => ({
                    tabPress: e =>{
                        Animated.spring(tabOffsetValue,{
                            toValue:getWdith() *4 + 20,
                            useNativeDriver: true
                        }).start();
                    }
                })}></Tab.Screen>
            </Tab.Navigator>
            {/* below is the animated little green slider*/}
            <Animated.View style={{
                width: getWdith()-20,
                height: 2,
                backgroundColor: '#58d68d',
                position: 'absolute',
                bottom: 65,
                left: 30,
                //borderRadius: '.50',
                transform: [
                    {translateX: tabOffsetValue}
                ]
            }}>
            </Animated.View>
        </NavigationContainer>
    );
}
//function for getting total width of bottom tab window, dividing it into little slice
function getWdith(){
  let width = Dimensions.get('window').width
  width = width-60
  return width/5
}

//Profile Screen
function ProfileScreen() {
  return (
    <SafeAreaView style={styles.profContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style = {styles.titleBar}>
          <FontAwesome5 name="ellipsis-v" size={24} color='#52575d'></FontAwesome5>
          <FontAwesome5 name="edit" size={24} color='#52575d'></FontAwesome5>
        </View>

        <View style={{alignSelf: 'center'}}>
          <View style = {styles.profileImage}>
            <Image source={require('./images/MauiProfilePic.png')} style = {styles.profileImage} resizeMode='contain'></Image>
          </View>
        </View>

        <View style = {styles.infoContainer}>
          <Text style = {[styles.profileText, {fontWeight: '200', fontSize: 36, backgroundColor: '#fffef2'}]}>Maui</Text>
          <Text style = {[styles.profileText, {color: '#AEB5BC', fontSize: 14, backgroundColor: '#fffef2'}]}>Plant-Enthusiast</Text>
        </View>

        <View style = {styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style = {[styles.profileText, {fontWeight: '200',fontSize: 24}]}>293</Text>
            <Text style = {[styles.profileText, styles.subText]}>Friends</Text>
          </View>
          <View style={[styles.statsBox, {borderColor: '#DFD8CD', borderLeftWidth: 1, borderRightWidth: 1}]}>
            <Text style = {[styles.profileText, {fontWeight: '200',fontSize: 24}]}>400</Text>
            <Text style = {[styles.profileText, styles.subText]}>Plants</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style = {[styles.profileText, {fontWeight: '200',fontSize: 24}]}>12</Text>
            <Text style = {[styles.profileText, styles.subText]}>Mr. Pots</Text>
          </View>
        </View>

        <View style = {{marginTop: 32}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style = {styles.mediaImageContainer}>
              <Image source={require('./images/PlantPic1.jpg')} style={styles.Pictures} resizeMode='cover'></Image>
            </View>
            <View style = {styles.mediaImageContainer}>
              <Image source={require('./images/PlantPic2.jpg')} style={styles.Pictures} resizeMode='cover'></Image>
            </View>
            <View style = {styles.mediaImageContainer}>
              <Image source={require('./images/PlantPic3.jpg')} style={styles.Pictures} resizeMode='cover'></Image>
            </View>
            <View style = {styles.mediaImageContainer}>
              <Image source={require('./images/PlantPic4.jpg')} style={styles.Pictures} resizeMode='cover'></Image>
            </View>
          </ScrollView>
        </View>

        <Text style = {[styles.subText, styles.recent]}>Recent Activity</Text>

        <View style= {{alignItems: 'center', marginBottom: 100}}>
          <View style = {styles.recentItem}>
            <View styles = {styles.recentItemIndicator}></View>
            <View styles = {{width: 250}}>
              <Text styles={styles.profileText}>
                Started following <Text style = {{fontWeight: '400',}}> Dwyane 'the Rock' Johson</Text> 
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//Plant Screen
/* 
- add pots on top of shelves
- change shelf colors
- make pots clickable, take to new screen
- overall just make look good

- Soil Moisture Sensor
- Temperature Sensor
- Sunlight Sensor
*/
function PlantScreen({navigation}) {

  const [plantNameRow1, plantInformationRow1] = useState([
    { plantName: 'Snake Plant', color: 'Green', key: '1', moisture: 95, sunlight: 85, idealMoisture: '90%', image: require('./images/SnakeScaled2.png'), 
    description: 
    'Snake plants originate in the rocky and dry regions of Central Africa. There are a multitude of snake plant varieties however the most common are the: Sansevieria Trifasciata, Sansevieria Cylindrica, and Sansevieria Futura  Robusta. All of these plants belong to the same family and can grow to be several feet tall. They are very firm plants and act very similar to succulents because they are succulents.',
    care:
    'Although this is a succulent it is recommended that it does not get direct sunlight because that can lead to brown burned spots on the leaves. The Snake plant will let you know when it has too much water.',
    careBullets:
    '\u25cf Water: Thoroughly water once the pot is dry \n \n \u25cf Soil: Use succulent soil or a mix of quick drying soil \n \n \u25cf Sunlight: Bright indirect light for most of the day \n \n \u25cf Fungus Problems: Limit the amount of water that you are using and acquire some fungicide',
    moreCare:
    'This plant is very prone to overwatering and root rot. If you have this plant selected the app will notify you if it senses that the soil has been too wet for too long. If this occurs than it suggested to use a succulent mix or to repot the soil and to use rocks on the base of your pot for better drainage',
    propagation:
    "The most common and successful method of propagating this species is to take angled cuts of the plant and put it in distilled water. It is best to do this during the summer months, however if you're able to keep the water at a uniform warm temperature than any time during the year is sufficient for propagating",
    numPics: 2,
    problemImage1: require('./images/snakePlantFungalDisease.png'),
    problemImage1Descrip: 'Fungal Disease',
    problemImage2: require('./images/snakePlantOverWatered.png'),
    problemImage2Descrip: 'Over Watering',

  },

    { plantName: 'Spider Plant', color: 'Dark Green', key: '2', moisture: 45, sunlight: 35, idealMoisture: '40%', image: require('./images/SpiderScaled2.png'),
    description: 
    'This plant originates from the African Tropical Rainforest. However, despite its vast number of variants that arose from here it is very prone to being overwatered. This species is called the Chlorophytum Comosum and is one of the most common indoor houseplants. It got this way because of its remarkable ability to reproduce. It will grow vines that have smaller baby plants on it. This plant has several different types of variegation and',
    care:
    'Although this is indiginous to the tropical rainforests, these plants need to have their soil thoroughly dry before watering it again',
    careBullets:
    "\u25cf Water: Thoroughly water once the pot is dry \n \n \u25cf Soil: Use succulent soil or a mix of quick drying soil \n \n \u25cf Sunlight: Bright indirect light for most of the day",
    moreCare:
    "This plant is very prone to overwatering and root rot. If you have this plant selected the app will notify you if it senses that the soil has been too wet for too long. If this occurs than it suggested to use a succulent mix or to repot the soil and to use rocks on the base of your pot for better drainage. Brown tips signal that the plant is getting too much or too little water. Please refer to the app's historical tracking of how wet the soil is to determine how to proceed.",
    propagation:
    "When you see these baby spider plants on a vine, mist them every day so that they can grow roots. Once the roots form and have grown about an inch long they are ready to be planted into succulent soil. This is the most common way to propagate, however there are several more ways that can yield similar success rates",
    problemImage1: require('./images/SpiderOverWatering.png'),
    problemImage1Descrip: 'Over Watering',
    problemImage2: require('./images/SpiderUnderWatering.png'),
    problemImage2Descrip: 'Under / Over Watering',
  },

    { plantName: 'Pothos', color: 'Orange', key: '3', moisture: 75, sunlight: 65, idealMoisture: '70%', image: require('./images/PothosScaled2.png'),
    description: 
    'Pothos is one of the most common houseplants that originates from the asian main continent as well as on many pacific islands. These plants are a vine that is part of the Araceae family. These are a vine that are used to climbing up trees and cliff sides and are limited to the size of the surface that they are climbing. There are several different species of these and have unique different variegation options. If your plant has a lot of variegation it will need more sunlight. It is recommended that you get a climbing pole for these plants to climb up on.',
    care:
    'These plants are used to getting a lot of water. They like to have their soil very moist.',
    careBullets:
    '\u25cf Water: Thoroughly when the top inch of soil has become dry \n \n \u25cf Soil: Use a tropical or flower based pot mix. Include wood chips for best results. This will retain more moisture. \n \n \u25cf Sunlight: Bright indirect light for most of the day. If you have a highly variegated species be sure that it gets a few hours of direct sunlight every day',
    propagation:
    "These propagate in nature with flowers, however for a plant enthusiast the most common way is to take cuttings of the plant around the node area. "},

  ]);
  const [plantNameRow2, plantInformationRow2] = useState([
    { plantName: 'Monsterra', color: 'Green', key: '4', moisture: 95, sunlight: 85, idealMoisture: '90%', image: require('./images/MonsterraScaled2.png')},
    { plantName: 'Aglaonema', color: 'Dark Green', key: '5', moisture: 45, sunlight: 35, idealMoisture: '40%', image: require('./images/AglanemaScaled.png')},
    { plantName: 'Croton', color: 'Orange', key: '6', moisture: 75, sunlight: 65, idealMoisture: '70%', image: require('./images/CrotonScaled.png')},

  ]);
  const [plantNameRow3, plantInformationRow3] = useState([
    { plantName: 'Weeping Fig', color: 'null', key: '7', moisture: 0, sunlight: 0, idealMoisture: 'null', image: require('./images/WeepingFigScaled.png')},
    { plantName: 'Bunny Ear Cactus', color: 'null', key: '8', moisture: 0, sunlight: 0, idealMoisture: 'null', image: require('./images/BunnyEarScaled.png')},
    { plantName: 'Empty Pot 9', color: 'null', key: '9', moisture: 0, sunlight: 0, idealMoisture: 'null', image: require('./images/CurrentEmptyPotScaled.png')},

  ]);
  const [plantNameRow4, plantInformationRow4] = useState([
    { plantName: 'Empty Pot 10', color: 'Green', key: '10', moisture: 0, sunlight: 0, idealMoisture: 'null', image: require('./images/CurrentEmptyPotScaled.png')},
    { plantName: 'Empty Pot 11', color: 'Dark Green', key: '11', moisture: 0, sunlight: 0, idealMoisture: 'null', image: require('./images/CurrentEmptyPotScaled.png')},
    { plantName: 'Empty Pot 12', color: 'Orange', key: '12', moisture: 0, sunlight: 0, idealMoisture: 'null', image: require('./images/CurrentEmptyPotScaled.png')},

  ]);
  const [plantNameRow5, plantInformationRow5] = useState([
    { plantName: 'Empty Pot 13', color: 'Green', key: '13', moisture: 0, sunlight: 0, idealMoisture: 'null', image: require('./images/CurrentEmptyPotScaled.png')},
    { plantName: 'Empty Pot 14', color: 'Dark Green', key: '14', moisture: 0, sunlight: 0, idealMoisture: 'null', image: require('./images/CurrentEmptyPotScaled.png')},
    { plantName: 'Empty Pot 15', color: 'Orange', key: '15', moisture: 0, sunlight: 0, idealMoisture: 'null', image: require('./images/CurrentEmptyPotScaled.png')},

  ]);
  //Should probably be changed (eventually) to safeAreaView
  return(
    <ScrollView>
      <View style={styles.container}>
          <View style= {styles.statsContainer}>
            <FlatList 
                horizontal = {true}
                data={plantNameRow1}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('AboutPlants', item)}>
                      <View style = {styles.testPic}>
                        <Image source={(item.image)}></Image>
                      </View>
                    </TouchableOpacity>
                )}
            />
          </View>
          <View style = {styles.shelfPic}>
            <Image source={require('./images/ScaledShelf.png')}></Image>
          </View>


          <View style= {styles.statsContainer}>
          <FlatList 
                horizontal = {true}
                data={plantNameRow2}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('AboutPlants', item)}>
                      <View style = {styles.testPic}>
                      <Image source={(item.image)}></Image>
                      </View>
                    </TouchableOpacity>
                )}
            />
          </View>
          <View style = {styles.shelfPic}>
            <Image source={require('./images/ScaledShelf.png')}></Image>
          </View>

          <View style= {styles.statsContainer}>
            <FlatList 
                horizontal = {true}
                data={plantNameRow3}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('AboutPlants', item)}>
                      <View style = {styles.testPic}>
                        <Image source={(item.image)}></Image>
                      </View>
                    </TouchableOpacity>
                )}
            />
          </View>
          <View style = {styles.shelfPic}>
            <Image source={require('./images/ScaledShelf.png')}></Image>
          </View>

          <View style= {styles.statsContainer}>
            <FlatList 
                horizontal = {true}
                data={plantNameRow4}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('AboutPlants', item)}>
                      <View style = {styles.testPic}>
                        <Image source={(item.image)}></Image>
                      </View>
                    </TouchableOpacity>
                )}
            />
          </View>
          <View style = {styles.shelfPic}>
            <Image source={require('./images/ScaledShelf.png')}></Image>
          </View>

          <View style= {styles.statsContainer}>
            <FlatList 
                horizontal = {true}
                data={plantNameRow5}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('AboutPlants', item)}>
                      <View style = {styles.testPic}>
                        <Image source={(item.image)}></Image>
                      </View>
                    </TouchableOpacity>
                )}
            />
          </View>
          <View style = {[styles.shelfPic, {marginBottom: 100}]}>
            <Image source={require('./images/ScaledShelf.png')}></Image>
          </View>

      </View> 
    </ScrollView>
  );
}

function AddPlants({navigation}) {
  <View>

  </View>

}


//-------------------------------------------------------------------
//Plant Stack is used to navigate to the respective plant about screen - in the works
const Stack = createNativeStackNavigator(PlantStack);
const PlantStack = ({navigation}) => {
  return(
    <Stack.Navigator >
      <Stack.Screen name='PlantScreen' component={PlantScreen} options={{
        title: 'My Garden', //title of page
        headerRight: () => (
          <TouchableOpacity >
            <FontAwesome5 
            name = 'plus'
            color = 'white'
            size={20}
            />
          </TouchableOpacity>
        ),
        headerStyle:{
          backgroundColor: '#58d68d' //background color of header
        },
        headerTitleStyle: { //Text options
            color: 'white',
            fontFamily: 'HelveticaNeue', 
            fontWeight: '300',
            fontSize: 20
        },

      }}/>
      <Stack.Screen name='AboutPlants' component={AboutPlants} options={{
        title: 'About your Plant',
        headerRight: () => (
          <TouchableOpacity >
            <FontAwesome5 
            name = 'pen'
            color = 'white'
            size={20}
            />
          </TouchableOpacity>
        ),
        backgroundColor: 'black',
        headerStyle:{
          backgroundColor: '#58d68d'
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue',
          fontWeight: '300',
          fontSize: 20
      },
        headerTintColor: 'white' //for back button color
        }}/>
    </Stack.Navigator>
  );
}
//-------------------------------------------------------------------
//-------------------------------------------------------------------
//Plant Stack is used to navigate to the respective plant about screen - in the works
const TheLoginStack = createNativeStackNavigator(LoginStack);
const LoginStack = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen name='Login Screen' component={LoginScreen} options={{
        title: 'Login', //title of page
        headerStyle:{
          backgroundColor: '#58d68d' //background color of header
        },
        headerTitleStyle: { //Text options
            color: 'white',
            fontFamily: 'HelveticaNeue',
            fontWeight: '300',
            fontSize: 20
        },
      }}/>
      <Stack.Screen name='AboutTheTeam' component={AboutTheTeam} options={{
        title: 'About the Team',
        backgroundColor: 'black',
        headerStyle:{
          backgroundColor: '#58d68d'
        },
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'HelveticaNeue',
          fontWeight: '300',
          fontSize: 20
      },
        headerTintColor: 'white' //for back button color
        }}/>
    </Stack.Navigator>
  );
}
//-------------------------------------------------------------------
function AboutTheTeam({navigation}) {
  return (
    <ScrollView backgroundColor='#fffef2'>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[styles.profileText, {fontWeight: '200', fontSize: 36}]}> Meet the Team </Text>
      <View style = {styles.container}>
        <Text style = {styles.subText}>
          <Image source={require('./images/Groot.png')} style = {styles.AboutTeamImage} resizeMode='contain'></Image>
          Emily
        </Text>
      </View>
      <Text style = {styles.subText}>
        About Emily
      </Text>


      <View style = {styles.container}>
        <Text style = {styles.subText}>
          <Image source={require('./images/Hulk.png')} style = {styles.AboutTeamImage} resizeMode='contain'></Image>
          Troy
        </Text>
      </View>
      <Text style = {styles.subText}>
        About Troy
      </Text>

      <View style = {styles.container}>
        <Text style = {styles.subText}>
          <Image source={require('./images/BlackWidow.png')} style = {styles.AboutTeamImage} resizeMode='contain'></Image>
          Graham
        </Text>
      </View>
      <Text style = {styles.subText}>
        About Graham
      </Text>

      <View style = {styles.container}>
        <Text style = {styles.subText}>
          <Image source={require('./images/Thanos2.png')} style = {styles.AboutTeamImage} resizeMode='contain'></Image>
          Ethan
        </Text>
      </View>
      <Text style = {styles.subText}>
        About Ethan
      </Text>

      <Text style={[styles.profileText, {fontWeight: '200', fontSize: 36}]}> The Boring Stuff </Text>
      <Text style = {[styles.subText, {marginBottom: 100}]}>
        This is where we will put our credibility
      </Text>


    </View>
    </ScrollView>
  );
}



//About screen for when you click on a plant

function AboutPlants({navigation, route}){

  const [value, setValue] = useState(0);
  const numPics = route.params?.numPics;

  /*
      <View style = {styles.circularContainer}>
        <Text style = {[styles.aboutYourPlant, {fontWeight: '400', fontSize: 17, color: 'black'}]}>Ideal Moisture: {route.params?.idealMoisture}</Text>
        <Text style = {[styles.aboutYourPlant, {fontWeight: '400', fontSize: 17, color: 'black'}]}>Ideal Sunlight: {route.params?.sunlight}</Text>
      </View>
  */

  return(
    <ScrollView>
      <View style = {styles.container}>
        <Text style={[styles.profileText, {fontWeight: '400', fontSize: 36, marginBottom: 20}]}>{route.params?.plantName}</Text>
      </View>
    
      <View style = {styles.circularContainer}>
        <Text style={[styles.profileText, {fontWeight: '400', fontSize: 36, color: '#0066ff', textShadowColor: 'black', textShadowRadius: 1}]}>Moisture     </Text>
        <Text style={[styles.profileText, {fontWeight: '400', fontSize: 36, color: '#33cc33', textShadowColor: 'black', textShadowRadius: 1}]}>Sunlight </Text>
      </View>
      <View style={styles.circularContainer}>
        <CircularProgress
          radius={90}
          value={route.params?.moisture} //this will be the value we receive from API
          textColor='#222'
          fontSize={20}
          valueSuffix={'%'}
          activeStrokeColor={'#0066ff'}
          activeStrokeSecondaryColor={'#cc33ff'}
          inActiveStrokeColor={'#0066ff'}
          inActiveStrokeOpacity={0.2}
          inActiveStrokeWidth={6}
          duration={2000}
          subtitle = 'Ideal: 80-95%'
          subtitleColor='#222'
          subtitleFontSize={10}
          
          //onAnimationComplete={() => setValue(route.params?.sunlight)} //sets the value for next bar
        />
        
        <CircularProgress
          radius={90}
          value={route.params?.sunlight} //this will be the value we receive from API
          textColor='#222'
          fontSize={20}
          valueSuffix={'%'}
          inActiveStrokeColor='#33cc33'
          activeStrokeColor={'#33cc33'}
          activeStrokeSecondaryColor='#ffff66'
          inActiveStrokeOpacity={0.2}
          inActiveStrokeWidth={6}
          duration={2000}
          subtitle = 'Ideal: 50-70%'
          subtitleColor='#222'
          subtitleFontSize={10}
        />
    </View>
      <View style = {styles.plantInfoContainer}>
        <Text style={[styles.profileText, {fontWeight: '400', fontSize: 36, color: '#58d68d'}]}> Description </Text>
        <Text style={styles.aboutYourPlant}>{route.params?.description}</Text>
        <Text style={[styles.profileText, {fontWeight: '400', fontSize: 36, color: '#58d68d'}]}>Care</Text>
        <Text style={styles.aboutYourPlant}>{route.params?.care}</Text>
        <Text style={styles.aboutYourPlant}>{route.params?.careBullets}</Text>
        <Text style={styles.aboutYourPlant}>{route.params?.moreCare}</Text>
        <Text style={[styles.profileText, {fontWeight: '400', fontSize: 36, color: '#58d68d'}]}> Propagation </Text>
        <Text style={styles.aboutYourPlant}>{route.params?.propagation}</Text>
        <Text style={[styles.profileText, {fontWeight: '400', fontSize: 36, color: '#58d68d'}]}> Possible Problems </Text>
        <View style = {{marginTop: 32, marginBottom: 100}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style = {styles.aboutPlantCarousel}>
              <Image source={route.params?.problemImage2} style={styles.Pictures} resizeMode='cover'></Image>
              <Text style={[styles.profileText, {alignSelf:'center', fontWeight: '800'}]}>{route.params?.problemImage2Descrip}</Text>
            </View>
            <View style = {styles.aboutPlantCarousel}>
              <Image source={route.params?.problemImage1} style={styles.Pictures} resizeMode='cover'></Image>
              <Text style={[styles.profileText, {alignSelf:'center', fontWeight: '800'}]}>{route.params?.problemImage1Descrip}</Text>
            </View> 
          </ScrollView>
        </View>

            
      </View>
    </ScrollView>
  );
}

//Login Screen
function LoginScreen({navigation}) {
  const image = "../images/background1.jpeg";
  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground source = {image}></ImageBackground>
    <MeetTeamCard>
      <Button 
      title='Meet The Team' 
      onPress={() => navigation.navigate('AboutTheTeam')}
      color = 'white'
      />
    </MeetTeamCard>
    <View style={styles.text1}>
        <Text style={[styles.profileText, {fontWeight: '400', fontSize: 36, marginBottom: 10}]}>Login</Text>
    </View>
      <View style={styles.email}>
        <Input placeholder="Username" placeholderTextColor={'gray'}  onChangeText={(text)=> console.log(text)} />
      </View>
      <View style={styles.password}>
        <Input placeholder="Password" placeholderTextColor={'gray'} onChangeText={(text)=> console.log(text)} />
      </View>
    <View style = {{flexDirection: 'row', marginTop: 60}}>
      <Card>
        <Button
            title="Login"
            // position= "center"
            onPress={() => Alert.alert('Logging In...')}
            color = 'white'
          />
      </Card>
      <Card>
        <Button
            title="Register"
            // position= "center"
            onPress={() => Alert.alert('Registering...')}
            color = 'white'
          />
      </Card>
    </View>
      <View style = {styles.redpanda}>
            <Image source={require('./images/redpanda1.png')}></Image>
      </View>
    
      </SafeAreaView>
  );
}

//Notification Screen (may be changed)
function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.subText}>Notifications???? idk what this will be</Text>
      <Text style={styles.subText}>My thoughts are that you will need a place to 
      check where current or previous notificaitons have gone - or if app notifcations 
      are silent than you can look at them here</Text>
    </View>
  );
}

//Search Screen (may be changed)
function Search() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subText}>Ideas for 'search' page</Text>
      <Text style={styles.subText}>- Add database of tons of different plants</Text>
      <Text style={styles.subText}>- Make database acessible through an autofill search?</Text>
    </SafeAreaView>
  );
}



//Style sheet for all our different styles used across the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fffef2'
  },
  circularContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fffef2',
    flexDirection: 'row'
  },
  profContainer: {
    flex: 1,
    backgroundColor: '#fffef2',
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  text: {
    color: 'darkgreen', 
    fontSize: 30
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50, 
  },
  titleText: {
    fontSize: 50,
  },
  plantText: {
      color: 'white',
      fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold'
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden'
  },
  AboutTeamImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    overflow: 'hidden'
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: 'white'
  },
  plantInfoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fffef2'
  },
  profileText: {
    fontFamily: 'HelveticaNeue',
    color: '#52575d'
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center', 
    marginTop: 32,
  },
  aboutYourPlant: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    fontFamily: 'HelveticaNeue',
    fontSize: 16
  },
  statsBox: {
    flex: 1,
    alignItems: 'center',
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: 10
  },
  subTextPlantRows: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 10,
    marginTop: -80,
    marginBottom: 40,
  },
  mediaImageContainer: {
    width: 175,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  aboutPlantCarousel: {
    width: 275,
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  Pictures: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  recentItemIndicator: {
    backgroundColor: 'red',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  },
  shelfPic: {
        flex: 1,
        width: 332,
        height: 41,
        marginTop: -50,
        marginBottom: -55,
        alignItems: 'center',
        //transform: [{ scale:0.12}],
        justifyContent: 'space-evenly',
        
  },
  potPic: {
    flexDirection: 'row',
    height: 50,
    width: 50,
    transform: [{ scale:0.3}],
    justifyContent: 'space-evenly',
    marginRight: 50,
    marginLeft: 50,
    marginBottom: 75

  },
  text1:{
    top: 75,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: 'center'
  },
    loginbutton:{
      top: 100,
      right: 50,
      // alignSelf: 'center', 
      flex: 1,
      resizeMode: 'contain'
  
    },
    email:{
      top: 75,
      // right: 200,
      alignSelf: 'center', 
      width: 250,
      // flex: 1,
      // resizeMode: 'contain'
  
    },
    password: {
      top: 75,
      // right: -50,
      alignSelf: 'center',
      width: 250,
  
      // flex: 1,
      // resizeMode: 'contain'
    },
    redpanda:{
      top: 0,
      right: 30,
      // alignSelf: 'center', 
      flex: 1,
      marginTop: -70,
      resizeMode: 'contain'
  
    },
    testPic: {
      flexDirection: 'row',
      height: 50,
      width: 50,
      //transform: [{ scale:0.2}],
      justifyContent: 'space-evenly',
      marginRight: 30,
      marginLeft: 44,
      marginBottom: 176,
      
    },
});

export default App;

//Snake
//Aloe
//Pothos
//Spider