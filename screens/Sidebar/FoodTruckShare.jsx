import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import DropDownPicker from "react-native-dropdown-picker";
import SidebarStyle from "../../styling/SidebarStyle";

export default function FoodTruckShareScreen() {

    const [selectedLocation, setSelectedLocation] = useState("");
    const [truckName, setTruckName] = useState("");
    const [open, setOpen] = useState(false);
    const locations = [
        { label: "Beach 1", value: "beach1" },
        { label: "Beach 6", value: "beach6" },
        { label: "Beach 8", value: "beach8" },
        { label: "Beach 11", value: "beach11" },
        { label: "Perry Monument", value: "perryMonumnet" },
        { label: "Vista 3", value: "vista3" },
    ];


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
                    placeholder="Select an option"
                    style={SidebarStyle.PickerDropdown}
                    dropDownContainerStyle={SidebarStyle.PickerDropdownContainer}
                    textStyle={SidebarStyle.PickerDropdownText}
                />

                <View style={{ paddingTop: 50 }}>
                    <TextInput
                        label="Truck Name"
                        value={truckName}
                        onChangeText={truckName => setTruckName(truckName)}
                        style={SidebarStyle.TextInputStyle}
                    />
                </View>


                <View style={{ paddingTop: 50 }}>
                    <TouchableOpacity style={SidebarStyle.ShareLocationButtonOpac}>
                        <Text style={SidebarStyle.ShareLocationText}>Share Location</Text>

                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    );
}

