import React, { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import DropDownPicker from "react-native-dropdown-picker";
import SidebarStyle from "../../styling/SidebarStyle";
import { account } from "../../utils/Config/appwriteConfig";

export default function FoodTruckShareScreen() {

    const [profileRole, setProfileRole] = useState({
        role: "",
    });
    const [isSignedIn, setIsSignedIn] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState("");
    const [truckName, setTruckName] = useState();
    const [open, setOpen] = useState(false);
    const locations = [
        { label: "Beach 1", value: "beach1" },
        { label: "Beach 6", value: "beach6" },
        { label: "Beach 8", value: "beach8" },
        { label: "Beach 11", value: "beach11" },
        { label: "Perry Monument", value: "perryMonumnet" },
        { label: "Vista 3", value: "vista3" },
    ];


    const shareLocation = async () => {
        console.log(profileRole);
        if (isSignedIn && (profileRole.role == "admin" || profileRole.role == "foodtruck")) {
            console.log("hello");
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

                setIsSignedIn(true);

            } catch {
                setIsSignedIn(false);
            }
        };

        checkAuthState();
    }, []);

    return (
        <SafeAreaView style={AppStyle.container}>

            <View style={{ flexDirection: "center", justifyContent: "center" }}>


                <DropDownPicker
                    open={open}
                    value={selectedLocation}
                    items={locations}
                    setOpen={setOpen}
                    setValue={setSelectedLocation}
                    setItems={null}
                    placeholder="Select a location"
                    style={SidebarStyle.PickerDropdown}
                    dropDownContainerStyle={SidebarStyle.PickerDropdownContainer}
                    textStyle={SidebarStyle.PickerDropdownText}
                />




                <View style={{ paddingTop: 50 }}>
                    <TouchableOpacity style={SidebarStyle.ShareLocationButtonOpac} onPress={() => shareLocation()}>
                        <Text style={SidebarStyle.ShareLocationText}>Share Location</Text>

                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
}

