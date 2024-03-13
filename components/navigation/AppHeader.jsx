import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import AppStyle from "../../styling/AppStyle";
import { appPrimary, appQuarternary, appSecondaryColor, appTertiaryColor, useAltUI } from "../../utils/colors/appColors";

export default function AppHeader() {
    const navigation = useNavigation();

    let menuColor = appTertiaryColor;
    if (useAltUI){
        menuColor = appQuarternary;
    }

    return (
        <View style={AppStyle.drawerHeader}>
            <Feather style={AppStyle.drawerMenuBar} name="menu" size={30} color={menuColor} onPress={() => navigation.toggleDrawer()} />
        </View>
    );
}
