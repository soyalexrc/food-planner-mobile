import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {updateFoodType} from "@/store/slices/search/searchSlice";
import {changeDate, selectStatsByDay} from "@/store/slices/stats/statsByDaySlice";
import {Meal} from "@/interfaces/meal";
import Placeholder from "@/components/meals/Placeholder";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CALORIES_LIMIT = 2000;

export default function PlanScreen() {
    const dispatch = useAppDispatch();
    const statsByDay = useAppSelector(selectStatsByDay);
    const router = useRouter()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        const today = new Date().getTime();
        if (date.getTime() <= today) {
            dispatch(changeDate(date.toDateString()));
            // setCurrentDate(date);
        } else {
            // TODO handle error
            console.error('Date must be today or before');
        }
        hideDatePicker();
    };

    const handlePreviousDay = () => {
        const date = new Date(statsByDay.date)
        dispatch(changeDate(new Date(date.getTime() - 86400000).toDateString()));
    };

    const handleNextDay = () => {
        const date = new Date(statsByDay.date)
        dispatch(changeDate(new Date(date.getTime() + 86400000).toDateString()));
    };

    const formattedDate = () => {
        const date = new Date(statsByDay.date);
        return date.toLocaleDateString('en-US', {weekday: 'short', day: '2-digit'})
    };

    function handleSelectFood(foodType: string) {
        dispatch(updateFoodType(foodType));
        router.push('/modal');
    }

    function calculateCaloriesForChart(): number {
        return (statsByDay.totalCalories / CALORIES_LIMIT) * 100
    }

    useEffect(() => {
        console.log('date changed!')
    //     TODO actualizar el statbByDay consultando en sqlite el registro que debe ser identico al "statsByDay" de el dia consultado...
    }, [statsByDay.date])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePreviousDay}>
                    <MaterialIcons name="chevron-left" size={40} color="black"/>
                </TouchableOpacity>
                <Pressable onPress={showDatePicker} style={{flexDirection: 'row', gap: 5}}>
                    <MaterialIcons name="calendar-month" size={24} color="black"/>
                    <Text style={{fontSize: 20}}>{formattedDate()}</Text>
                </Pressable>
                <TouchableOpacity onPress={handleNextDay}
                                  disabled={statsByDay.date === new Date().toDateString()}>
                    <MaterialIcons name="chevron-right" size={40} color="black"/>
                </TouchableOpacity>
            </View>
            <View style={styles.stats}>
                <View style={{ flex: 0.3}}>
                    <AnimatedCircularProgress
                        duration={2000}
                        size={100}
                        width={5}
                        fill={calculateCaloriesForChart()}
                        rotation={0}
                        tintColor="green"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor="lightgray"
                    >
                        {
                            (fill) => (
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <Text>{statsByDay.totalCalories} / {CALORIES_LIMIT}</Text>
                                    <Text>Kcal</Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <View style={{ flex: 0.7, gap: 3 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'lightgray', borderStyle: 'solid', paddingBottom: 3 }}>
                        <Text>Proteins</Text>
                        <Text>{statsByDay.totalProteins} gr</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'lightgray', borderStyle: 'solid', paddingBottom: 3 }}>
                        <Text>Carbs</Text>
                        <Text>{statsByDay.totalCarbs} gr</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'lightgray', borderStyle: 'solid', paddingBottom: 3 }}>
                        <Text>Fat</Text>
                        <Text>{statsByDay.totalFat} gr</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{ paddingHorizontal: 10 }}>
                {
                    Object.entries(statsByDay.meals).map(([_, meal]: [mealTitle: string, meal: Meal]) => (
                        <View key={meal.titleApp}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{meal.titleApp}</Text>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <TouchableOpacity onPress={() => handleSelectFood(meal.titleApp)}>
                                        <MaterialIcons name={true ? 'add' : 'swap-horiz'} size={30} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                !meal.title ? <Placeholder cb={() => handleSelectFood(meal.titleApp)} text={meal.titleApp}/> :  <View style={{ height: 100 }} />
                            }
                        </View>
                    ))
                }
            </ScrollView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
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
        gap: 10,
    },
    stats: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        alignItems: 'center',
    }
});
