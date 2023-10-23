import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/Map';
import EventListScreen from '../screens/EventList';

const Tab = createBottomTabNavigator();

export default function MainNav({navigation}) {
    return(
        <Tab.Navigator initialRouteName="Map">
            <Tab.Screen
            name="Map"
            component={MapScreen}
            options={{
                tabBarLabel: 'Map',
                headerShown: false,
            }}
            />
            
            <Tab.Screen
            name="EventList"
            component={EventListScreen}
            options={{
                tabBarLabel: 'Events',
                headerShown: false,
            }}
            />

        </Tab.Navigator>
    )
}
