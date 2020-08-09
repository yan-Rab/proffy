import React, { useState, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import  {useNavigation} from '@react-navigation/native'
import {RectButton} from 'react-native-gesture-handler'
import styles from './styles'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesicon from '../../assets/images/icons/give-classes.png'
import landingImg from '../../assets/images/landing.png'
import heartIcon from '../../assets/images/icons/heart.png'
import logo from '../../assets/images/logo.png'
import api from '../../services/api';

const Landing = () => {

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('/connections').then(response => {
            const { total } = response.data;
            console.log(response.data);
            setTotalConnections(total)
        })
    },[])

    const navigation = useNavigation()

    function handleNavigateToStudyPages(){
        navigation.navigate('Study')
    }

    function handleNavigateToGiveClassesPage(){
        navigation.navigate('GiveClasses')
    }
    return(
        <View style = {styles.container}>
            <Image source = {logo} resizeMode = 'contain' style = {styles.logo}/>
            <Image source = {landingImg} style = {styles.banner} />
            <Text style = {styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style = {styles.titleBold}>
                    O que você deseja fazer?
                </Text>
            </Text>

            <View style = {styles.buttonsContainer}>
                
                <RectButton
                onPress = {handleNavigateToStudyPages}
                 style = {[styles.button, styles.buttonPrimary]}>
                    <Image source = {studyIcon} />
                    <Text style = {styles.buttonText}>Estudar</Text>
               
                </RectButton>

                <RectButton 
                onPress = {handleNavigateToGiveClassesPage}
                style = {[styles.button, styles.buttonSecondary]}>
                    <Image source = {giveClassesicon} />
                    <Text style = {styles.buttonText}>Dar aulas</Text>
               
                </RectButton>

            </View>

            <Text style = {styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source = {heartIcon} />
            </Text>
        </View>
    )
}

export default Landing;