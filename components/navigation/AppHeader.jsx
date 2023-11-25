import React from "react";
import { Platform, View, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDrawerStatus } from "@react-navigation/drawer";

import AppStyle from "../../styling/AppStyle";

export default function AppHeader() {
    const navigation = useNavigation();
    const drawerStatus = useDrawerStatus();

    const appGreen = "#8FA063";

    return (
        <SafeAreaView style={AppStyle.drawerHeader}>
            <View>
                {(Platform.OS === "ios" && drawerStatus === "closed") &&
                    <Icon style={AppStyle.drawerMenuBar}
                        name="menu"
                        size={35}
                        color={appGreen}
                        onPress={() => navigation.toggleDrawer()} />}

                {(Platform.OS === "android" && drawerStatus === "closed") &&
                    <Icon style={AppStyle.drawerMenuBar}
                        name="menu"
                        size={35}
                        color={appGreen}
                        onPress={() => navigation.toggleDrawer()} />}
            </View>
        </SafeAreaView>
    );
}
