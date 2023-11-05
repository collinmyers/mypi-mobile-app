import React from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

export default function ChangeNameScreen() {
    return (
        <SafeAreaView style={{ justifyContent: "center", height: "100%" }}>
            <Text style={{ textAlign: "center" }}>Change Name</Text>
        </SafeAreaView>
    );
}

