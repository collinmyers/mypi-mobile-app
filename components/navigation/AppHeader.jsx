import React from "react";
import { View, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import AppStyle from "../../styling/AppStyling";

export default function AppHeader() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={AppStyle.drawerHeader}>
            <View style={AppStyle.drawerMenuBarContainer}>
                <Icon style={AppStyle.drawerMenuBar}
                    name="menu"
                    size={35}
                    color="#8FA063"
                    onPress={() => navigation.openDrawer()} />
            </View>
        </SafeAreaView>
    );
}
