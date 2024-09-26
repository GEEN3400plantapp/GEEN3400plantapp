import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from '../screens/home';
import Plants from '../screens/plants';
import About from '../screens/about';
import Bluetooth from "../screens/bluetooth";
import Description from "../screens/description";

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Mr Pot Butler',
            headerStyle: {
                backgroundColor: '#58d68d',
                //height: 91
            },
            headerTitleStyle: {
                color: 'white',
            },

        }
    },
    Plants: {
        screen: Plants,
        navigationOptions: {
            title: 'List of your Plants',
            headerStyle: {
                backgroundColor: '#58d68d',
                //height: 91
            },
            headerTitleStyle: {
                color: 'white',
            },
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            title: 'About Your Plant',
            headerStyle: {
                backgroundColor: '#58d68d',
                //height: 91
            },
            headerTitleStyle: {
                color: 'white',
            },
        }
        
    },
    Bluetooth: {
        screen: Bluetooth,
        navigationOptions: {
            title: 'Bluetooth Connection',
            headerStyle: {
                backgroundColor: '#58d68d',
                //height: 91
            },
            headerTitleStyle: {
                color: 'white',
            }
        }
    },
    Description:{
        screen: Description,
        navigationOptions: {
            title: 'Description',
            headerStyle: {
                backgroundColor: '#58d68d',
                //height: 91
            },
            headerTitleStyle: {
                color: 'white',
            }
        }

    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);