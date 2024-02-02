import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {updateFoodType} from "@/store/slices/search/searchSlice";
import {selectStatsByDay} from "@/store/slices/stats/statsByDaySlice";
import {Meal} from "@/interfaces/meal";
import Placeholder from "@/components/meals/Placeholder";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const data = [
    { value: 30, color: 'blue' },
    { value: 50, color: 'green' },
    { value: 20, color: 'orange' },
];

export default function PlanScreen() {
    const dispatch = useAppDispatch();
    const statsByDay = useAppSelector(selectStatsByDay);
    const router = useRouter()
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
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
            setCurrentDate(date);
        } else {
            // TODO handle error
            console.error('Date must be today or before');
        }
        hideDatePicker();
    };

    const handlePreviousDay = () => {
        setCurrentDate(new Date(currentDate.getTime() - 86400000));
    };

    const handleNextDay = () => {
        setCurrentDate(new Date(currentDate.getTime() + 86400000));
    };

    const formattedDate = currentDate.toLocaleDateString('en-US', {weekday: 'short', day: '2-digit'});

    function handleSelectFood(foodType: string) {
        dispatch(updateFoodType(foodType));
        router.push('/modal');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handlePreviousDay}>
                    <MaterialIcons name="chevron-left" size={40} color="black"/>
                </TouchableOpacity>
                <Pressable onPress={showDatePicker} style={{flexDirection: 'row', gap: 5}}>
                    <MaterialIcons name="calendar-month" size={24} color="black"/>
                    <Text style={{fontSize: 20}}>{formattedDate}</Text>
                </Pressable>
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
                        fill={40.7}
                        rotation={0}
                        tintColor="green"
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
