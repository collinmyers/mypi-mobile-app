import React from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";

export default function FoodTruckShareScreen() {
    return (
        <SafeAreaView style={AppStyle.container}>

            <TouchableOpacity>
                <Text>Share Location</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

