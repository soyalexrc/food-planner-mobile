import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";

export default function PlanScreen() {
    const router = useRouter()
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const handlePreviousDay = () => {
        setCurrentDate(new Date(currentDate.getTime() - 86400000));
    };

    const handleNextDay = () => {
        setCurrentDate(new Date(currentDate.getTime() + 86400000));
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePreviousDay}>
                    <MaterialIcons name="chevron-left" size={40} color="black" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <MaterialIcons name="calendar-month" size={24} color="black" />
                    <Text style={{ fontSize: 20 }}>{formattedDate}</Text>
                </View>
                <TouchableOpacity onPress={handleNextDay} disabled={currentDate.toDateString() === new Date().toDateString()}>
                    <MaterialIcons name="chevron-right" size={40} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Button title='Select breakfast' onPress={() => router.push('/modal')} />
                <View style={{ height: 1000 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    }
});
