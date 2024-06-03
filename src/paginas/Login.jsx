import React from "react";
import axios from 'axios';
import estilos from './Login.module.css'; // Importe o arquivo CSS aqui
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/fundo_login.png'; // Importe a imagem diretamente

// abrir um schema para fazer validação através do zod
const schemaLogin = z.object({
    usuario: z.string()
        .min(5, "O mínimo são 5 caracteres")
        .max(20, "O máximo são 20 caracteres"),
    senha: z.string()
        .min(6, "Informe 6 caracteres")
        .max(20, "O máximo são 20 caracteres")
});

// Exportar a função para ser usada externamente
export function Login() {
    // O navigate será usado para direcionar o usuário para a página home, após o login
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaLogin)
    });

    // criação da função para validação de login + consumo da API para verificação no back-end
    // criação de uma função assíncrona (faz uma requisição externa sem depender do tempo de espera para o retorno)
    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                // passagem do username e password para recuperar o token
                // captura o que está sendo capturado no formulário do usuário e enviar através de uma requisição http
                username: data.usuario,
                password: data.senha
            });
            // captura o access e refresh tokens fornecidos pela API, no local storage, para permitir 
            // o acesso na página após verificação no banco
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            console.log("Login bem sucedido");
            navigate('/inicial');
        } catch (errors) {
            console.log("Erro na autenticação", errors);
        }
    }

    // construção do return com a visualização para o usuário (estrutura html)
    // no momento de criação do input, será criada a estrutura de validação do zod
    return (
        <div className={estilos.wrapper} style={{ backgroundImage: `url(${logo})` }}>
            <div className={estilos.conteiner}>
                <form
                    className={estilos.formulario}
                    onSubmit={handleSubmit(obterDadosFormulario)}
                >
                    <p className={estilos.titulo}>Login</p>

                    <label>Usuário</label>
                    <input
                        className={estilos.campo}
                        {...register('usuario')}
                    />
                    {errors.usuario && (
                        <p className={estilos.mensagem}>{errors.usuario.message}</p>
                    )}

                    <label>Senha</label>
                    <input
                        className={estilos.campo}
                        {...register('senha')}
                        type="password"
                    />
                    {errors.senha && (
                        <p className={estilos.mensagem} >{errors.senha.message}</p>
                    )}

                    <button className={estilos.botao}>Entrar</button>
                </form>
            </div>
        </div>
    );
}
