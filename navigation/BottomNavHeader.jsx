import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";



export default function BottomNavigationHeader(){
    const navigation = useNavigation();
    return(
        <SafeAreaView style={HeaderStyle.header}>
            <View>
                <Icon style={HeaderStyle.menuBar}
                    name="menu"
                    size={30}
                    color="white"
                    onPress={()=>navigation.openDrawer()} />
            </View>

            <View style={HeaderStyle.Title}>
                <Text style={HeaderStyle.MyPIText}>My PI</Text>
            </View>
        </SafeAreaView>
    );
}

const HeaderStyle = StyleSheet.create({
    header:{
        backgroundColor: "blue",
    },
    menuBar:{
        paddingLeft:16
    },
    Title:{
        justifyContent:"center"
    },
    MyPIText:{
        color: "white",
        padding: 5,
        fontSize: 32,
        textAlign: "center"
    }
});