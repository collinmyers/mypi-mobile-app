import React from "react";
import { Dimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import AppStyle from "../../../styling/AppStyle";
import { appQuarternaryColor, appWarningColor } from "../../../utils/colors/appColors";
import { useNetwork } from "../../context/NetworkContext";

export default function AppHeader() {
    const deviceWidth = Dimensions.get("window").width;
    const navigation = useNavigation();
    const { isConnected, isInternetReachable } = useNetwork();

    return (
        <View style={AppStyle.drawerHeader}>
            <Feather style={AppStyle.drawerMenuBar} name="menu" size={31} color={appQuarternaryColor} onPress={() => navigation.toggleDrawer()} />
            {!isConnected && !isInternetReachable && <MaterialIcons
                style={{ paddingVertical: 11.5, marginRight: deviceWidth * 0.46 }}
                name="wifi-off"
                size={29}
                color={appWarningColor}
            />
            }
        </View>
    );
}
