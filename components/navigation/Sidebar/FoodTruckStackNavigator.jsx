import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "../Headers/AppHeader";
import MenuBack from "../Headers/AppHeaderNavBack";
import { appPrimaryColor } from "../../../utils/colors/appColors";
import FoodTruckAdminScreen from "../../../screens/Sidebar/FoodTruck/FoodTruck";
import FoodTruckShareScreen from "../../../screens/Sidebar/FoodTruck/FoodTruckShare";
import FoodTruckUnshareScreen from "../../../screens/Sidebar/FoodTruck/FoodTruckUnshare";

const fade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const Stack = createStackNavigator();

export default function FoodTruckStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="FoodTruckAdmin" screenOptions={{ cardStyleInterpolator: fade }}>
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