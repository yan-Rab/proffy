import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8257E5',
        flex: 1,
        justifyContent: 'center',
        padding: 30
    },

    logo: {
        marginLeft: 20,
        width: 70,
        height:60,
        marginBottom: 20
    },
    banner: {
        width: '100%',
        resizeMode: 'contain'
    },

    title: {
        color: "#FFF",
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80,
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },

    buttonsContainer : {
        width: '100%',
        marginTop: 50,
        justifyContent: "space-between",
        flexDirection: 'row',
    },

    button: {
        height: 120,
        width: '48%',
        justifyContent: "space-between",
        borderRadius: 10,
        padding: 20,
        
        alignItems: 'center'
    },

    buttonPrimary: {
        backgroundColor: '#9871F5'
    },

    buttonSecondary: {
        backgroundColor: '#04d361'
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 20
    },

    totalConnections: {
        marginTop: 40,
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140
    }


})

export default styles