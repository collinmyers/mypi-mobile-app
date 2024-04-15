import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { account } from "../../utils/Config/config";
import Logo from "../../components/logo/AppLogo";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { appPrimaryColor } from "../../utils/colors/appColors";
import { useNetwork } from "../../components/context/NetworkContext";
import { useAuth } from "../../components/context/AuthContext";
export default function Dashboard() {

    const navigation = useNavigation();
    const { isSignedIn } = useAuth();
    const { isConnected, isInternetReachable } = useNetwork();
    const [isSignedInLocal, setisSignedInLocal] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: "",
    });

    const getNameAndEmail = async () => {
        try {
            const response = await account.get();

            if (response.email === "") throw new Error("Not a email user (guest)");

            setProfileInfo({
                name: response.name,
            });

            setisSignedInLocal(true);
        } catch {
            setisSignedInLocal(false);
        }
    };

    useEffect(() => {
        if (isConnected && isInternetReachable) {
            getNameAndEmail();
        }
    }, [isInternetReachable, isSignedIn]);

    return (
        <SafeAreaView style={AppStyle.container}>
            <View style={AppStyle.imageContainer}>
                <Logo logoWidth={250} logoHeight={250} />
            </View>

            <View style={HomeStyle.dbContainer}>

                {isSignedInLocal ?
                    (<Text style={HomeStyle.dbTitleText}>Welcome {profileInfo.name}</Text>) :
                    (<Text style={HomeStyle.dbTitleText}>Welcome to myPI</Text>)
                }

                <TouchableOpacity style={HomeStyle.dashboardDonoOpac} onPress={() => { navigation.navigate("Donate"); }}>
                    <MaterialIcons style={{ alignSelf: "center" }} name="volunteer-activism" size={24} color={appPrimaryColor} />
                    <Text style={HomeStyle.dashboardDonoText}>Donate Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}