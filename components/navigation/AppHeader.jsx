import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import AppStyle from "../../styling/AppStyle";
import {appQuarternaryColor } from "../../utils/colors/appColors";

export default function AppHeader() {
    const navigation = useNavigation();

    let menuColor = appQuarternaryColor;


    return (
        <View style={AppStyle.drawerHeader}>
            <Feather style={AppStyle.drawerMenuBar} name="menu" size={30} color={menuColor} onPress={() => navigation.toggleDrawer()} />
        </View>
    );
}
