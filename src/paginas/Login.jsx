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
            <div className={estilos.conteiner}>
                <form className={estilos.formulario} onSubmit={obterDadosFormulario}>
                <p className={estilos.titulo}>Login</p>
                    <label>Usuário</label>
                    <input
                        className={estilos.campo}
                        value={usuario}
                        onChange={e => setUsuario(e.target.value)}
                    />
                    <label>Senha</label>
                    <input
                        type="password"
                        className={estilos.campo}
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button className={estilos.botao}>Entrar</button>
                </form>
            </div>
        </div>
    );
}