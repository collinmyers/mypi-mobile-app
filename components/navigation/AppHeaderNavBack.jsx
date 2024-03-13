import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AppStyle from "../../styling/AppStyle";
import { appQuarternaryColor } from "../../utils/colors/appColors";

export default function AppHeaderNavBack() {
    const navigation = useNavigation();

    let headerButtons = appQuarternaryColor;

    return (
        <View style={AppStyle.drawerHeader}>
            <Feather style={AppStyle.drawerMenuBar} name="menu" size={30} color={headerButtons} onPress={() => navigation.toggleDrawer()} />

            <Feather style={AppStyle.navBackButton} name="arrow-left" size={30} color={headerButtons} onPress={() => navigation.goBack()} />
        </View>
    );
}