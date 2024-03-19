import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import SidebarStyle from "../../styling/SidebarStyle";
import { DATABASE_ID, USER_ALIAS_TABLE_ID, account, database } from "../../utils/Config/appwriteConfig";
import { RadioButton } from "react-native-paper";
import { appTertiaryColor } from "../../utils/colors/appColors";
import { ScrollView } from "react-native-gesture-handler";
import { Query } from "appwrite";

export default function FoodTruckShareScreen() {

    const [profileRole, setProfileRole] = useState({
        role: "",
    });
    const [isSignedIn, setIsSignedIn] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState("Beach1");

    const [truckName, setTruckName] = useState();
    const [userID, setUserID] = useState("");
    const [goodStatus, setGoodStatus] = useState(true);


    const shareLocation = async () => {
        if (isSignedIn && (profileRole.role == "admin" || profileRole.role == "foodtruck") && goodStatus) {
            console.log("hello");
            console.log(truckName);
        }

    };

    useEffect(() => {

        const checkAuthState = async () => {
            try {

                const response = await account.get();
                if (response.email === "") throw new Error("Not a email user (guest)");

                setProfileRole({
                    role: response.labels,
                });
                setUserID(response.$id);
                setIsSignedIn(true);

            } catch {
                setIsSignedIn(false);
                setGoodStatus(false);
            }

        };

        const getUserAlias = async () => {
            // Get User Alias
            const response = await database.listDocuments(
                DATABASE_ID,
                USER_ALIAS_TABLE_ID,
                [
                    Query.equal("UserID", [userID])
                ]
            );
            if (response.documents.length > 0) {
                setTruckName(response.documents.at(0).UserName);
                setGoodStatus(true);
            }
            else {
                setGoodStatus(false);
            }
        };

        checkAuthState();
        getUserAlias();

    }, [userID]);

    return (
        <SafeAreaView style={AppStyle.container}>

            <View style={{ flexDirection: "center", justifyContent: "center" }}>

                <ScrollView>

                    <View style={SidebarStyle.radioGroup}>

                        <View style={SidebarStyle.radio}>
                            <RadioButton.Android
                                value="Beach1"
                                status={selectedLocation === "Beach1" ? "checked" : "unchecked"}
                                onPress={() => setSelectedLocation("Beach1")}
                                uncheckedColor={appTertiaryColor}
                                color={appTertiaryColor}
                                style={SidebarStyle.radioButtons}
                            />
                            <Text style={SidebarStyle.setRadioText}>Beach 1</Text>
                        </View>

                        <View style={SidebarStyle.radio}>
                            <RadioButton.Android
                                value="Beach6"
                                status={selectedLocation === "Beach6" ? "checked" : "unchecked"}
                                onPress={() => setSelectedLocation("Beach6")}
                                uncheckedColor={appTertiaryColor}
                                color={appTertiaryColor}
                            />
                            <Text style={SidebarStyle.setRadioText}>Beach 6</Text>
                        </View>

                        <View style={SidebarStyle.radio}>
                            <RadioButton.Android
                                value="Beach8"
                                status={selectedLocation === "Beach8" ? "checked" : "unchecked"}
                                onPress={() => setSelectedLocation("Beach8")}
                                style={SidebarStyle.radioButtons}
                                uncheckedColor={appTertiaryColor}
                                color={appTertiaryColor}
                            />
                            <Text style={SidebarStyle.setRadioText}>Beach 8</Text>
                        </View>

                        <View style={SidebarStyle.radio}>
                            <RadioButton.Android
                                value="Beach11"
                                status={selectedLocation === "Beach11" ? "checked" : "unchecked"}
                                onPress={() => setSelectedLocation("Beach11")}
                                style={SidebarStyle.radioButtons}
                                uncheckedColor={appTertiaryColor}
                                color={appTertiaryColor}
                            />
                            <Text style={SidebarStyle.setRadioText}>Beach 11</Text>
                        </View>

                        <View style={SidebarStyle.radio}>
                            <RadioButton.Android
                                value="PerryMonument"
                                status={selectedLocation === "PerryMonument" ? "checked" : "unchecked"}
                                onPress={() => setSelectedLocation("PerryMonument")}
                                style={SidebarStyle.radioButtons}
                                uncheckedColor={appTertiaryColor}
                                color={appTertiaryColor}
                            />
                            <Text style={SidebarStyle.setRadioText}>Perry Monument</Text>
                        </View>

                        <View style={SidebarStyle.radio}>
                            <RadioButton.Android
                                value="Vista3"
                                status={selectedLocation === "Vista3" ? "checked" : "unchecked"}
                                onPress={() => setSelectedLocation("Vista3")}
                                style={SidebarStyle.radioButtons}
                                uncheckedColor={appTertiaryColor}
                                color={appTertiaryColor}
                            />
                            <Text style={SidebarStyle.setRadioText}>Vista 3</Text>
                        </View>

                    </View>

                </ScrollView>

                <View style={{ paddingTop: 50 }}>
                    <TouchableOpacity style={SidebarStyle.ShareLocationButtonOpac} onPress={() => shareLocation()}>
                        <Text style={SidebarStyle.ShareLocationText}>Share Location</Text>

                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
}

