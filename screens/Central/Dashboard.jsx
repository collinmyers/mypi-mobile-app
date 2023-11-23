import React from "react";
import { Text } from "react-native-paper";
import AppStyle from "../../styling/AppStyle";
import HomeStyle from "../../styling/HomeStyle";
import { SafeAreaView, View, Image } from "react-native";

export default function Dashboard() {
    return (
      <SafeAreaView style={AppStyle.container}>
        <View style={AppStyle.imageContainer}>
          <Image
            source={require("../../images/PI.jpg")} 
            style={AppStyle.image}
          />
        </View>

        <View style={HomeStyle.dbContainer}>
            <Text style={HomeStyle.dbTitleText}>Hello and Welcome to MyPI!</Text>
            <Text style={HomeStyle.dbText}>
          See our Events Page to view a list of upcoming events for Presque Isle Park.
            </Text>
            <Text style={HomeStyle.dbText}>
          See our Alerts Page to view a list of alerts such as beach closures, tornados, sharknados, and more.
            </Text>
            <Text style={HomeStyle.dbText}>
          See our Map Page to view a map of the park and get directions to points of interests on the map.
            </Text>
            <Text style={HomeStyle.dbText}>
          See our Settings Page to change your notification settings.
            </Text>
            <Text style={HomeStyle.dbText}>
          Check the sidebar menu to see other options such as the FAQ page and the Park Info page.
            </Text>
        </View>
      </SafeAreaView>
    );
  }