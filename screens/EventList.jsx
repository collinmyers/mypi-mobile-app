import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from 'react-native-elements';


export default function EventListScreen(){
    return(

            <View style={{justifyContent:'center', flex:1}}>
                <Text style={{textAlign:'center'}}>EventList</Text>
                <ScrollView>
                    <Card>
                        <Card.Image source={require('../assets/my-pi-2-alt.png')}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                    </Card>
                    <Card>
                        <Card.Image source={require('../assets/my-pi-2-alt.png')}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                    </Card>
                    <Card>
                        <Card.Image source={require('../assets/my-pi-2-alt.png')}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                    </Card>
                    <Card>
                        <Card.Image source={require('../assets/my-pi-2-alt.png')}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                    </Card>
                    <Card>
                        <Card.Image source={require('../assets/my-pi-2-alt.png')}></Card.Image>
                         <Text>I am a placeholder event!</Text>
                    </Card>
                </ScrollView>
            </View>


    )
}