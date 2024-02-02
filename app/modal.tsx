import {Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import {Text, View} from '@/components/Themed';
import {getMeals, urlFor} from "@/utils/data/sanity";
import {FlashList} from "@shopify/flash-list";
import {useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import {useAppSelector} from "@/store/hooks";
import {selectSearch} from "@/store/slices/search/searchSlice";

export default function ModalScreen() {
    const searchData = useAppSelector(selectSearch);

    const [meals, setMeals] = useState([]);
    const [text, onChangeText] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: `Select a ${searchData.foodType}`
        })
        getMeals(searchData.foodType).then(res => setMeals(res));
    }, [])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                placeholder='Search meal'
                value={text}
            />
            {
                // TODO Match the loading state too
                meals.length < 1 &&
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No {searchData.foodType} meals found...</Text>
                </View>
            }
            <FlashList
                data={meals}
                contentContainerStyle={{ paddingVertical: 20 }}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={40}
                keyExtractor={(item) => item._id}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            gap: 10,
                            marginBottom: 10,
                            paddingBottom: 10,
                            borderBottomColor: 'lightgray',
                            borderBottomWidth: 1,
                            borderStyle: 'solid'
                        }}>
                            <Image style={{borderRadius: 6}} width={100} height={100} source={{
                                uri: urlFor(item.image).url()
                            }}/>
                            <View style={{ flex: 1 }}>
                                <Text style={{fontWeight: 'bold', fontSize: 16,}}>{item.title}</Text>
                                {
                                    item.description &&
                                    <Text style={{marginVertical: 5}}>{item.description}</Text>
                                }
                                <Text style={{ marginBottom: 3 }}>Ingredients:</Text>
                                {
                                    item.ingredients.map(ingredient => (
                                        <View key={ingredient._key}
                                              style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View
                                                style={{
                                                    width: 5,
                                                    height: 5,
                                                    borderWidth: 1,
                                                    borderStyle: 'solid',
                                                    borderColor: 'black',
                                                    borderRadius: 10,
                                                    backgroundColor: 'black',
                                                    marginRight: 5
                                                }}
                                            />
                                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>{ingredient.title}: </Text>
                                            <Text style={{fontSize: 12, marginHorizontal: 2}}>{ingredient.amount}</Text>
                                            <Text style={{fontSize: 12}}>{ingredient.measure}</Text>
                                        </View>
                                    ))
                                }
                                <Text style={{ marginTop: 5 }}>Calories: {item.calories} </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
