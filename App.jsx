import React from "react";

import MainNav from "./navigation/MainNav";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigationHeader from "./navigation/BottomNavHeader";
import ParkInfoScreen from "./sidebarScreens/ParkInfo";
import FAQScreen from "./sidebarScreens/FAQ";


const Drawer = createDrawerNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="MainNav" component={MainNav} options={{header: ()=><BottomNavigationHeader/>}}/>
                <Drawer.Screen name="FAQ" component={FAQScreen}  options={{header: ()=><BottomNavigationHeader/>}}/>
                <Drawer.Screen name="ParkInfo" component={ParkInfoScreen} options={{header: ()=><BottomNavigationHeader/>}}/>            
                </Drawer.Navigator>
        </NavigationContainer>
    );
}

