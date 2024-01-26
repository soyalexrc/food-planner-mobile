import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const data = [
    { value: 30, color: 'blue' },
    { value: 50, color: 'green' },
    { value: 20, color: 'orange' },
];

export default function PlanScreen() {
    const router = useRouter()
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const handlePreviousDay = () => {
        setCurrentDate(new Date(currentDate.getTime() - 86400000));
    };

    const handleNextDay = () => {
        setCurrentDate(new Date(currentDate.getTime() + 86400000));
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', {weekday: 'short', day: 'numeric'});


    // chart data
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = 50; // Adjust radius for a smaller chart
    const centerX = radius;
    const centerY = radius;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePreviousDay}>
                    <MaterialIcons name="chevron-left" size={40} color="black"/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', gap: 5}}>
                    <MaterialIcons name="calendar-month" size={24} color="black"/>
                    <Text style={{fontSize: 20}}>{formattedDate}</Text>
                </View>
                <TouchableOpacity onPress={handleNextDay}
                                  disabled={currentDate.toDateString() === new Date().toDateString()}>
                    <MaterialIcons name="chevron-right" size={40} color="black"/>
                </TouchableOpacity>
            </View>
            <View style={styles.stats}>
                <View style={{ flex: 0.3}}>
                    <AnimatedCircularProgress
                        duration={2000}
                        size={100}
                        width={5}
                        fill={20}
                        rotation={0}
                        tintColor="lightgreen"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="lightgray"
                    >
                        {
                            (fill) => (
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <Text>150 / 1500</Text>
                                    <Text>Kcal</Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <View style={{ flex: 0.7, gap: 3 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'lightgray', borderStyle: 'solid', paddingBottom: 3 }}>
                        <Text>Proteins</Text>
                        <Text>0 gr</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'lightgray', borderStyle: 'solid', paddingBottom: 3 }}>
                        <Text>Carbs</Text>
                        <Text>0 gr</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'lightgray', borderStyle: 'solid', paddingBottom: 3 }}>
                        <Text>Fat</Text>
                        <Text>0 gr</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ paddingHorizontal: 10 }}>
                <Button title='Select breakfast' onPress={() => router.push('/modal')}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Breakfast</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity>
                            <MaterialIcons name={true ? 'add' : 'swap-horiz'} size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 100 }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Morning snack</Text>
                <View style={{ height: 100 }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Lunch</Text>
                <View style={{ height: 100 }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Afternoon snack</Text>
                <View style={{ height: 100 }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Dinner</Text>
                <View style={{ height: 100 }} />
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
        gap: 20,
    },
    stats: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
    }
});
