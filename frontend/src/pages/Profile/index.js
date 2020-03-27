import React, { useEffect, useState } from 'react';
import './style.css'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'
export default function Profile(){
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    // função para manipularmos os casos de cada ong, onde:
    // 1 par: função que eu quero que seja executada (criar uma função para carregar os casos)
    // 2 par: quando eu quero que seja executada, ela é um array de dependências, ou seja, sempre que houve mudançar a 
    // função do primeiro parametro será executada. 
    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(res => {
            setIncidents(res.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(idIncident){
        try{
            await api.delete(`incidents/${idIncident}`, {
                headers:{
                    Authorization: ongId,
                }
            });

            // faço uma varredura no array de incidentes para que seja removido em real time o id que acabou de ser excluido
            setIncidents(incidents.filter(incidents => incidents.id !== idIncident))

        } catch (err){
            alert('Ero ao deletar caso, tente novamente');
        }
    }

   // remover LocalStorage e voltar o usuário para a sessão de Logout
   function handleLogout(){
       localStorage.clear();
       history.push('/');
   }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick = {handleLogout}
                    type="button">
                    <FiPower size={16} color = "#E02041"/>
                </button>                
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                         
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size = {20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>
    );
}