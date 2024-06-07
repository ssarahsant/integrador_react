import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import estilos from './CadastroSensores.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schemaSensor = z.object({
    tipo: z.string().min(1, 'Tipo é obrigatório'),
    mac_address: z.string().max(20, 'Máximo de 20 caracteres').nullable(),
    latitude: z.string().refine(val => !isNaN(parseFloat(val)), 'Latitude inválida'),
    longitude: z.string().refine(val => !isNaN(parseFloat(val)), 'Longitude inválida'),
    localizacao: z.string().max(100, 'Máximo de 100 caracteres'),
    responsavel: z.string().max(100, 'Máximo de 100 caracteres'),
    unidade_medida: z.string().max(20, 'Máximo de 20 caracteres').nullable(),
    status_operacional: z.boolean(),
    observacao: z.string().nullable(),
});

export function CadastroSensores() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaSensor)
    });

    async function obterDadosFormulario(data) {
        console.log(data)
        try {
            console.log(`${localStorage.getItem('access_token')}`)
            const response = await axios.post('http://127.0.0.1:8000/api/sensores/', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            alert('Sensor cadastrado com sucesso!');
            navigate('/inicial'); // Redireciona para a página inicial após o cadastro
        } catch (error) {
            console.error('Erro no cadastro de sensor', error);
        }
    }

    return (
        <div className={estilos.container}>
           

            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
            <p className={estilos.titulo}>Cadastro de Sensor</p>

            <label>Tipo de Sensor</label>
                <select {...register('tipo')} className={estilos.campo}>
                    <option value="">Selecione o tipo de sensor</option>
                    <option value="Temperatura">Temperatura</option>
                    <option value="Contador">Contador</option>
                    <option value="Luminosidade">Luminosidade</option>
                    <option value="Umidade">Umidade</option>
                </select>
                {errors.tipo && <p className={estilos.mensagem}>{errors.tipo.message}</p>}

                <label>Mac Address</label>
                <input {...register('mac_address')} className={estilos.campo} placeholder="MAC Address" />
                {errors.mac_address && <p className={estilos.mensagem}>{errors.mac_address.message}</p>}

                <label>Latitude</label>
                <input {...register('latitude')} className={estilos.campo} placeholder="Latitude" />
                {errors.latitude && <p className={estilos.mensagem}>{errors.latitude.message}</p>}

                <label>Longitude</label>
                <input {...register('longitude')} className={estilos.campo} placeholder="Longitude" />
                {errors.longitude && <p className={estilos.mensagem}>{errors.longitude.message}</p>}

                <label>Localização</label>
                <input {...register('localizacao')} className={estilos.campo} placeholder="Localização" />
                {errors.localizacao && <p className={estilos.mensagem}>{errors.localizacao.message}</p>}

                <label>Responsável</label>
                <input {...register('responsavel')} className={estilos.campo} placeholder="Responsável" />
                {errors.responsavel && <p className={estilos.mensagem}>{errors.responsavel.message}</p>}

                <label>Unidade de Medida</label>
                <input {...register('unidade_medida')} className={estilos.campo} placeholder="Unidade de Medida" />
                {errors.unidade_medida && <p className={estilos.mensagem}>{errors.unidade_medida.message}</p>}

                <div className={estilos.campoCheckbox}>
                    <input
                        {...register('status_operacional')}
                        type="checkbox"
                        className={estilos.checkbox}
                    />
                    <label>Status Operacional</label>
                </div>

                <textarea {...register('observacao')} className={estilos.campo} placeholder="Observação"></textarea>
                {errors.observacao && <p className={estilos.mensagem}>{errors.observacao.message}</p>}

                <button className={estilos.botao}>Cadastrar</button>
            </form>
        </div>
    );
}
