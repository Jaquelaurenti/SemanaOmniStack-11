import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(event){
        event.preventDefault();
        try{
            const res =  await api.post('sessions', { id });

            // Salvando alguns dados importantes no Storage da aplicação
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);

            // mandando para a rota de profile
            history.push('/profile')

        }
        catch(err){
            alert('Falha no Login!');
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça o seu Login</h1>
                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e=> setId(e.target.value)}
                    />
                    <button className = "button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color = "#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}

/*Para termos o comportamento de SPA no /register iremos fazer
um Link para que o react não carregue a página novamente
simplesmente troque a rota, comportamento de SPA.*/ 