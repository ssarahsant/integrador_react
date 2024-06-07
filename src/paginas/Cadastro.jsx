import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import estilos from './Cadastro.module.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const schemaCadastro = z.object({
    email: z.string()
        .min(5, 'Por favor, insira pelo menos 5 caracteres')
        .max(100, 'Por favor, insira até 100 caracteres'),
    username: z.string()
        .min(5, 'Por favor, insira pelo menos 5 caracteres')
        .max(100, 'Por favor, insira até 100 caracteres'),
    password: z.string()
        .min(6, 'Por favor, insira pelo menos 6 caracteres')
        .max(100, 'Por favor, insira até 100 caracteres')
});

export function Cadastro() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaCadastro)
    });

    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create_user/', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            alert('Usuário cadastrado com sucesso!');
            navigate('/inicial'); // Redireciona para a página inicial após o cadastro
        } catch (error) {
            console.error('Erro no cadastro de usuário', error);
        }
    }

    return (
        <div className={estilos.conteiner}>
            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <p className={estilos.titulo}>Cadastro de Usuário</p>

                <label>Email</label>
                <input
                    {...register('email')}
                    className={estilos.campo}
                    placeholder='Email'
                />
                {errors.email && <p className={estilos.mensagem}>{errors.email.message}</p>}

                <label>Usuário</label>
                <input
                    {...register('username')}
                    className={estilos.campo}
                    placeholder='Usuário'
                />
                {errors.username && <p className={estilos.mensagem}>{errors.username.message}</p>}

                <label>Senha</label>
                <input
                    {...register('password')}
                    className={estilos.campo}
                    placeholder='Senha'
                    type='password'
                />
                {errors.password && <p className={estilos.mensagem}>{errors.password.message}</p>}

                <button className={estilos.botao} type="submit">Cadastrar</button>
              
                <Link className={estilos.link} to='/'>
                    Voltar ao login
                </Link>
            </form>
        </div>
    );
}
