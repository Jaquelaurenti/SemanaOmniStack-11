import React, {useEffect, useState} from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import logoImg from '../../assets/logo.png'
import style from './style'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotals] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);    
    
    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }
    
    async function loadIncidents(){
        // Evitar para que enquanto uma requisção está sendo feita, outra requisição do scroll nao passe por cima da que está sendo carregada
        if(loading){
            return;
        }
        // Se ja carregou todas as inforções nao tem necessidade de carregálas novamente
        if(total > 0 && incidents.length === total){
            return;
        }
        // carrego o loading
        setLoading(true);

        const res = await api.get('incidents',{
            params:{
                page
            }
        });
        // anexar os novos registros ao inves de sobrescrever
        setIncidents([...incidents, ...res.data]);
        setTotals(res.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(()=>{        
        loadIncidents();
    },[]);

    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}> {total} casos </Text>
                </Text>                
            </View>
            <Text style={style.title}>Bem Vindo!</Text>
            <Text style={style.description}> Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList
                style={style.incidentList}
                data={incidents}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                keyExtractor={incident => String(incident.id)}
                renderItem={( { item: incident })=> (
                    <View style={style.incident}>
                    
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>CASO:</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

                        <Text style={style.incidentProperty}>VALOR:</Text>
                        <Text style={style.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency', 
                                currency: 'BRL'
                            }).format(incident.value)}</Text>
                        
                        <TouchableOpacity 
                            style={style.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                </View>
                )}
            />
        </View>
    );
}