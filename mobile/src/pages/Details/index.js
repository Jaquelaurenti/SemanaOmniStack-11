import React from 'react'
import { Feather } from '@expo/vector-icons'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import  * as MailComposer from 'expo-mail-composer'


import logoImg from '../../assets/logo.png'
import style from './style'

export default function Details() {
    const navigation = useNavigation();    
    const route = useRoute();

    const incidentParams = route.params.incident;
    const message = `Olá ${incidentParams.name}, estou entrando em contato pois gostaria de ajudar no caso "${incidentParams.title}" com o valor de: "${Intl.NumberFormat('pt-BR', {
        style: 'currency', 
        currency: 'BRL'
    }).format(incidentParams.value)}"`;

    function navigationBackToIncidents(){
        navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do Caso: ${incidentParams.title}`,
            recipients:[incidentParams.email],
            body: message
        });
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=5511963112394&text=${message}`);
    }

    return(
        <View style={style.container}>
            
            <View style={style.header}>
                <Image source={logoImg} />
                <TouchableOpacity 
                    onPress={navigationBackToIncidents}
                >
                    <Feather name="arrow-left" size={28} color="#E82041" />

                </TouchableOpacity>
            </View>

            <View style={style.incident}>  

                <Text style={[style.incidentProperty, { marginTop:0 }]}>Dados da ONG:</Text>
                <Text style={style.incidentValue}>{incidentParams.name}</Text>
                <Text style={style.incidentValue}>Cidade: {incidentParams.city}/{incidentParams.uf} </Text>
                <Text style={style.incidentProperty}>CASO:</Text>
                <Text style={style.incidentValue}>{incidentParams.title}</Text>

                <Text style={style.incidentProperty}>VALOR:</Text>
                <Text style={style.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency', 
                                currency: 'BRL'
                            }).format(incidentParams.value)}</Text>

            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja o herói desse caso</Text>
                <Text style={style.heroDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity
                        style={style.action}
                        onPress={sendWhatsapp}
                    >
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={style.action}
                        onPress={sendEmail}
                    >
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}