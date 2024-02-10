import React from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";

export default function FoodTruckAdminScreen() {
    return (
        <SafeAreaView style={AppStyle.container}>

        <Text>Share Location?</Text>
        
        <View>
            <TouchableOpacity>
                <Text>Yes</Text>
            </TouchableOpacity>
        
            <TouchableOpacity>
                <Text>No</Text>
            </TouchableOpacity>
        </View>

        </SafeAreaView>
    );
}

