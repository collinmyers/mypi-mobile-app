import React from "react";
import { Platform, View, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";

import AppStyle from "../../styling/AppStyling";

export default function AppHeader() {
    const navigation = useNavigation();
    const drawerStatus = useDrawerStatus();

    return (
        <SafeAreaView style={AppStyle.drawerHeader}>
            <View>
                {(Platform.OS === "ios" && drawerStatus === "closed") &&
                    <Icon style={AppStyle.drawerMenuBar}
                        name="menu"
                        size={35}
                        color="#8FA063"
                        onPress={() => navigation.toggleDrawer()} />}

                {(Platform.OS === "android" && drawerStatus === "closed") &&
                    <Icon style={AppStyle.drawerMenuBar}
                        name="menu"
                        size={35}
                        color="#8FA063"
                        onPress={() => navigation.toggleDrawer()} />}
            </View>
        </SafeAreaView>
    );
}
