import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import AppStyle from "../../../styling/AppStyle";
import PropTypes from "prop-types";
import { appQuarternaryColor, appWarningColor } from "../../../utils/colors/appColors";
import { useNetwork } from "../../context/NetworkContext";


export default function AppHeaderEditNotifications({ showEditNotifications, onToggleEditNotifications }) {
    const navigation = useNavigation();
    const { isConnected, isInternetReachable } = useNetwork(); // Used to determine whether to show no network indicator

    const handleToggle = () => { // Handles passing of edit mode to change notifications screen content/mode
        onToggleEditNotifications(!showEditNotifications); 
        navigation.setParams({ showEditNotifications: !showEditNotifications });
    };

    return (
        <View style={AppStyle.drawerHeader}>
            <Feather style={AppStyle.drawerMenuBar} name="menu" size={31} color={appQuarternaryColor} onPress={() => navigation.toggleDrawer()} />
            {!isConnected && !isInternetReachable && <MaterialIcons
                style={{ paddingVertical: 11.5, }}
                name="wifi-off"
                size={29}
                color={appWarningColor}
            />
            }
            {showEditNotifications ?
                (<Feather style={AppStyle.appHeaderEditDone} name="check-square" size={28} color={appQuarternaryColor} onPress={handleToggle} />)
                :
                (<Feather style={AppStyle.appHeaderEdit} name="edit" size={28} color={appQuarternaryColor} onPress={handleToggle} />)
            }

        </View>
    );
}
AppHeaderEditNotifications.propTypes = {
    showEditNotifications: PropTypes.bool.isRequired,
    onToggleEditNotifications: PropTypes.func.isRequired,
};