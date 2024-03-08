import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import { useNavigation } from "@react-navigation/native";
import SidebarStyle from "../../styling/SidebarStyle";

export default function FoodTruckAdminScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={AppStyle.container}>

            <TouchableOpacity style={SidebarStyle.ShareLocationButtonOpac} onPress={() => navigation.navigate("FoodTruckShare")}>
                <Text style={SidebarStyle.ShareLocationText}>Share Location</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("FoodTruckUnshare")}>
                <Text>Unshare Location</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

