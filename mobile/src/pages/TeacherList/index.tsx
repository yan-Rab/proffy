import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import {Feather} from '@expo/vector-icons'
import styles from './styles'
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [dataFilters, setDataFilters] = useState({
        subject: '',
        week_day: '',
        time: ''
    })

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    function handleToggleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFilterSubmit(){
        loadFavorites()
       
        const {time,week_day,subject} = dataFilters
        const response = await api.get('classes', {
            params: {
                time,
                week_day,
                subject
            }
        })
        //dia da semana está de forma numérica
        setIsFiltersVisible(false);
        setTeachers(response.data)
    }

    return(
        <View style = {styles.container}>
            <PageHeader title = 'Proffys disponíveis' 
            headerRight = {(
                <BorderlessButton onPress = {handleToggleFiltersVisible}>
                    <Feather  name = 'filter' size = {20} color = '#FFF'/>
                </BorderlessButton>
            )}>
                {isFiltersVisible && (
                    <View style = {styles.searchForm}>
                        <Text style = {styles.label}>
                            Matéria
                        </Text>

                        <TextInput 
                        value = {dataFilters.subject}
                        onChangeText = {text => setDataFilters({...dataFilters, subject: text})}
                        placeholderTextColor = '#c1bccc' 
                        placeholder = 'Qual a matéria?'
                        style = {styles.input} />

                        <View style = {styles.inputGroup}>
                            <View style = {styles.inputBlock}>
                                <Text style = {styles.label}>
                                    Dia da semana
                                </Text>

                                <TextInput 
                                value = {dataFilters.week_day}
                                onChangeText = {text => setDataFilters({...dataFilters, subject: text})}
                                placeholderTextColor = '#c1bccc' 
                                placeholder = 'Qual o dia?'
                                style = {styles.input} />
                            </View>

                            <View style = {styles.inputBlock}>
                                <Text style = {styles.label}>
                                    Horário
                                </Text>

                                <TextInput 
                                value = {dataFilters.time}
                                onChangeText = {text => setDataFilters({...dataFilters, subject: text})}
                                placeholderTextColor = '#c1bccc' 
                                placeholder = 'Qual o horário?'
                                style = {styles.input} />
                            </View>
                        </View>

                        <RectButton onPress = {handleFilterSubmit} style = {styles.submitButton}>
                            <Text style = {styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style = {styles.teacherList}
                contentContainerStyle = {{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                
                {teachers.map((teacher: Teacher) => {
                    return (
                    <TeacherItem 
                    key = {teacher.id} 
                    teacher = {teacher}
                    favorited = {favorites.includes(teacher.id)}/>
                )})}
                
            </ScrollView>
        </View>
    )
}

export default TeacherList