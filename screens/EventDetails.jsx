import React from "react";
import { View, Modal, Text, Button } from "react-native";
import PropTypes from "prop-types"; // Import PropTypes

export default function EventDetailsModal({ isVisible, onClose }) {

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
                    <Text>This is the Event Details:</Text>

                    <Button title="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}

EventDetailsModal.propTypes = {
    isVisible: PropTypes.bool.isRequired, // Validate the 'isVisible' prop
    onClose: PropTypes.func.isRequired, // Validate the 'onClose' prop
};
