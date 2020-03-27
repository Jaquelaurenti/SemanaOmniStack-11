import React, { useState } from 'react';
import './style.css'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
export default function Register(){
    // criando os estados para manipular os inputs 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    // utilizando o useHistory para enviar o usuário de volta a página e login
    // fazer a navegação através de um função do Javascript sem depender do uso do Link
    const history = useHistory();

    async function handleRegister(event) {
        // recebe o evento do botão e desvia o comportamento padrão de carregar a página novamente
        event.preventDefault();

        // Objeto que está sendo instanciado pelo input e será utilizado na API 
        const data ={name, email, whatsapp, city, uf};

        try{
            const res = await api.post('ongs',data);
            alert(`Seu ID de acesso: ${res.data.id}`);
            history.push('/');
        }
        catch (err){
            alert('Erro no cadastro. Tente novamente!');
        }

    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color = "#E02041"/>
                    Não tenho cadastro
                </Link>

                </section>
                <form onSubmit={handleRegister}>
                <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                
                />
                <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    placeholder="WhatsApp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                />
                
                <div className="input-group">
                    <input 
                        placeholder="Cidade"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <input 
                        placeholder="UF" 
                        style={{ width: 80 }}
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                    />
                </div>

                <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}