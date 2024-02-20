import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./AppHeader";
import MenuBack from "./AppHeaderNavBack";
import { appPrimaryColor } from "../../utils/colors/appColors";
import FoodTruckAdminScreen from "../../screens/Sidebar/FoodTruck";
import FoodTruckShareScreen from "../../screens/Sidebar/FoodTruckShare";
import FoodTruckUnshareScreen from "../../screens/Sidebar/FoodTruckUnshare";



const Stack = createStackNavigator();

export default function FoodTruckStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="FoodTruckAdmin" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FoodTruckAdmin" component={FoodTruckAdminScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <Menu />
                }}
            />
            <Stack.Screen name="FoodTruckShare" component={FoodTruckShareScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
            <Stack.Screen name="FoodTruckUnshare" component={FoodTruckUnshareScreen}
                options={{
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: appPrimaryColor },
                    header: () => <MenuBack />
                }}
            />
        </Stack.Navigator>

    );
}