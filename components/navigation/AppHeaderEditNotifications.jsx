import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AppStyle from "../../styling/AppStyle";
import PropTypes from "prop-types";
import { appPrimaryColor, appQuarternary, appSecondaryColor, appTertiaryColor, useAltUI } from "../../utils/colors/appColors";

export default function AppHeaderEditNotifications({ showEditNotifications, onToggleEditNotifications }) {
    const navigation = useNavigation();

    let headerButtons = appQuarternary;

    const handleToggle = () => {
        onToggleEditNotifications(!showEditNotifications);  // Pass the new state upwards if needed
        navigation.setParams({ showEditNotifications: !showEditNotifications });
    };

    return (
        <View style={AppStyle.drawerHeader}>
            <Feather style={AppStyle.drawerMenuBar} name="menu" size={30} color={headerButtons} onPress={() => navigation.toggleDrawer()} />

            {showEditNotifications ?
                (<Feather style={AppStyle.appHeaderEditDone} name="check-square" size={28} color={appQuarternary} onPress={handleToggle} />)
                :
                (<Feather style={AppStyle.appHeaderEdit} name="edit" size={28} color={headerButtons} onPress={handleToggle} />)
            }

        </View>
    );
}
AppHeaderEditNotifications.propTypes = {
    showEditNotifications: PropTypes.bool.isRequired,
    onToggleEditNotifications: PropTypes.func.isRequired,
};