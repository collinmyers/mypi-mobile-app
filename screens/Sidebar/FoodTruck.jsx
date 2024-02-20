import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import { useNavigation } from "@react-navigation/native";

export default function FoodTruckAdminScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={AppStyle.container}>

            <TouchableOpacity onPress={() => navigation.navigate("FoodTruckShare")}>
                <Text>Share Location</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("FoodTruckUnshare")}>
                <Text>Unshare Location</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

