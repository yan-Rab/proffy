import React, { useState } from 'react';
import {View, Text, Image, Linking} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export interface Teacher{
    id: number,
    name: string,
    avatar: string,
    bio: string,
    cost: number,
    subject: string,
    whatsapp: string
}

interface TeacherItemProps{
    teacher: Teacher,
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
    const [isFavorited, setIsFavorited] = useState(favorited)

    function handleLinkToWhatsapp(){
        api.post('/connections', {
            user_id: teacher.id
        })
        
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('favorites');
        
        let favoritesArray = [];

        if(favorites){
                favoritesArray = JSON.parse(favorites)
        }

        if(isFavorited){
            const favoriteindex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id
            })

            favoritesArray.splice(favoriteindex, 1)
            setIsFavorited(false)
        }else{
           
            favoritesArray.push(teacher)
            setIsFavorited(true)
          
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.profile}>
                <Image 
                source = {{uri: teacher.avatar}}
                style = {styles.avatar} />

                <View style = {styles.profileInfo}>
                <Text style = {styles.name}>{teacher.name}</Text>
                <Text style = {styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style = {styles.bio}>
                {teacher.bio}
            </Text>

            <View style = {styles.footer}>
                <Text style = {styles.price}>
                    Preço/hora {'   '}
                    <Text style = {styles.priceValue}>{teacher.cost.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
                </Text>

                <View style = {styles.buttonsContainer}>
                    <RectButton onPress = {handleToggleFavorite}
                    style = {[styles.favoriteButton, 
                    isFavorited ? styles.favorited : {} ]}>
                        {isFavorited 
                        ? <Image source = {unfavoriteIcon} /> 
                        : <Image source = {heartOutlineIcon} /> }
                       
                    </RectButton>

                    <RectButton onPress = {handleLinkToWhatsapp} style = {styles.contactButton}>
                        <Image source = {whatsappIcon} />
                        <Text style = {styles.contactButtonText}>
                            Entrar em contato
                        </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem