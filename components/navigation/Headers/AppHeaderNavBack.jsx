import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AppStyle from "../../../styling/AppStyle";
import { appQuarternaryColor, appWarningColor } from "../../../utils/colors/appColors";
import { useNetwork } from "../../context/NetworkContext";

export default function AppHeaderNavBack() {
    const navigation = useNavigation();
    const { isConnected, isInternetReachable } = useNetwork();

    return (
        <View style={[AppStyle.drawerHeader]}>
            <Feather style={AppStyle.drawerMenuBar} name="menu" size={31} color={appQuarternaryColor} onPress={() => navigation.toggleDrawer()} />
            {!isConnected && !isInternetReachable && <MaterialIcons
                style={{ paddingVertical: 11.5, }}
                name="wifi-off"
                size={29}
                color={appWarningColor}
            />
            }
            <Feather style={AppStyle.navBackButton} name="arrow-left" size={31} color={appQuarternaryColor} onPress={() => navigation.goBack()} />
        </View>
    );
}