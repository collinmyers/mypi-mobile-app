import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import EventDetailsModal from "./EventDetails"; 

export default function EventListScreen(){

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };



    return(

            <View style={{justifyContent:"center", flex:1}}>
                <Text style={{textAlign:"center"}}>EventList</Text>
                <ScrollView>
                    <TouchableOpacity onPress={toggleModal}>
                        <Card>
                         <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                         </Card>
                     </TouchableOpacity>
                    <Card>
                        <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                    </Card>
                    <Card>
                        <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                    </Card>
                    <Card>
                        <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                    </Card>
                    <Card>
                        <Card.Image source={require("../assets/my-pi-2-alt.png")}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                    </Card>
                </ScrollView>
                <EventDetailsModal isVisible={isModalVisible} onClose={toggleModal} />
            </View>


    );
}