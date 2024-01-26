import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import AppStyle from "../../styling/AppStyle";

export default function AppHeader() {
    const navigation = useNavigation();
    const appSecondaryColor = "#8FA063";

    return (
        <SafeAreaView style={AppStyle.drawerHeader}>
            <Feather style={AppStyle.drawerMenuBar} name="menu" size={30} color={appSecondaryColor} onPress={() => navigation.toggleDrawer()} />
        </SafeAreaView>
    );
}
