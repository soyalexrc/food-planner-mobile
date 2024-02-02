import {Pressable, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";

export default function Placeholder({ text, cb }: {text: string, cb?: () => void} ) {
    return (
        <Pressable onPress={cb} style={styles.container}>
            <Text>No {text} registered yet...</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        height: 200,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30
    }
});
