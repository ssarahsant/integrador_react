import React, { useState } from 'react';
import estilos from './Login.module.css';
import { useNavigate } from 'react-router-dom';
 
export function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
 
    const navigate = useNavigate();
 
    function obterDadosFormulario(e) {
        e.preventDefault();
        navigate('inicial');
    }
 
    return (
        <div className={estilos.wrapper}>
            <p className={estilos.titulo}>AUTENTIFICAÇÃO</p>
            <div className={estilos.conteiner}>
                <form className={estilos.formulario} onSubmit={obterDadosFormulario}>
                    <input
                        className={estilos.campo}
                        placeholder="Usuario"
                        value={usuario}
                        onChange={e => setUsuario(e.target.value)}
                    />
                    <input
                        type="password"
                        className={estilos.campo}
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button className={estilos.botao}>Entrar</button>
                </form>
            </div>
        </div>
    );
}