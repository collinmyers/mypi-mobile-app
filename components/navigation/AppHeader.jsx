import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import AppStyle from "../../styling/AppStyle";
import { appSecondaryColor } from "../../utils/colors/appColors";

export default function AppHeader() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={AppStyle.drawerHeader}>
            <Feather style={AppStyle.drawerMenuBar} name="menu" size={30} color={appSecondaryColor} onPress={() => navigation.toggleDrawer()} />
        </SafeAreaView>
    );
}
