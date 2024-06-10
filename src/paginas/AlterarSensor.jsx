import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import estilos from './AlterarSensor.module.css'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//Schema de validação do formulário para checagem dos valores que foram colocados no form
const schemaAlterarSensor = z.object({
    mac_address: z.string().max(20, 'Máximo de 20 caracteres').nullable(),
    latitude: z.string()
        .refine(val => !isNaN(parseFloat(val)), 'Latitude inválida'),

    longitude: z.string()
        .refine(val => !isNaN(parseFloat(val)), 'Longitude inválida'),
    localizacao: z.string().max(100, 'Máximo de 100 caracteres'),
    responsavel: z.string().max(100, 'Máximo de 100 caracteres'),
    unidade_medida: z.string().max(20, 'Máximo de 20 caracteres').nullable(),
    status_operacional: z.boolean(),
    observacao: z.string().nullable(),
    tipo: z.string().optional() 
});

export function AlterarSensor() {
    const navigate = useNavigate();
    const { id } = useParams();//pegando o ID da URL
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schemaAlterarSensor)//chamar o schema e ver os erros possoveis
    });
    //faço uma consulta do sensor do id passado (chave)  
    const obterDadosSensor = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://127.0.0.1:8000/api/sensores/${id}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const sensorData = response.data;
            Object.keys(sensorData).forEach(key => {
                setValue(key, sensorData[key]);
            });
        } catch (err) {
            console.error('Erro ao obter o sensor', err);
        }
    };
     //exibo em tela os dados do id passado  
    useEffect(() => {
        obterDadosSensor();
    }, [id]);

    //pego os dados colocados no formulário e passo para o PUT!!o data aqui é o conj de info do form
    const onSubmit = async (data) => {
        data.latitude = parseFloat(data.latitude);
        data.longitude = parseFloat(data.longitude);


        console.log("Dados enviados para o PUT:", data);
        try {
            const token = localStorage.getItem('access_token');
            //chamo a api passando "data"
            await axios.put(`http://127.0.0.1:8000/api/sensores/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Sensor alterado com sucesso!');
            navigate('/inicial');
        } catch (error) {
            console.error('Erro ao alterar o sensor', error);
        }
    };

    return (
        <div className={estilos.conteiner}>
            <form className={estilos.formulario} onSubmit={handleSubmit(onSubmit)}>
                <label>Tipo</label>
                <select {...register('tipo')} className={estilos.campo}>
                    <option value="">Selecione o tipo de sensor</option>
                    <option value="Temperatura">Temperatura</option>
                    <option value="Contador">Contador</option>
                    <option value="Luminosidade">Luminosidade</option>
                    <option value="Umidade">Umidade</option>
                </select>
                {errors.tipo && <p className={estilos.mensagem}>{errors.tipo.message}</p>}

                <label>Mac Address</label>
                <input {...register('mac_address')} className={estilos.campo} />
                {errors.mac_address && <p className={estilos.mensagem}>{errors.mac_address.message}</p>}

                <label>Latitude</label>
                <input {...register('latitude')} className={estilos.campo} />
                {errors.latitude && <p className={estilos.mensagem}>{errors.latitude.message}</p>}

                <label>Longitude</label>
                <input {...register('longitude')} className={estilos.campo} />
                {errors.longitude && <p className={estilos.mensagem}>{errors.longitude.message}</p>}

                <label>Localização</label>
                <input {...register('localizacao')} className={estilos.campo} />
                {errors.localizacao && <p className={estilos.mensagem}>{errors.localizacao.message}</p>}

                <label>Responsável</label>
                <input {...register('responsavel')} className={estilos.campo} />
                {errors.responsavel && <p className={estilos.mensagem}>{errors.responsavel.message}</p>}

                <label>Unidade Medida</label>
                <input {...register('unidade_medida')} className={estilos.campo} />
                {errors.unidade_medida && <p className={estilos.mensagem}>{errors.unidade_medida.message}</p>}

                <div className={estilos.campoCheckbox}>
                    <input
                        {...register('status_operacional')}
                        type="checkbox"
                        className={estilos.checkbox}
                    />
                    <label>Status Operacional</label>
                </div>
                
                <label>Observação</label>
                <textarea {...register('observacao')} className={estilos.campo}></textarea>
                {errors.observacao && <p className={estilos.mensagem}>{errors.observacao.message}</p>}

                <button type="submit" className={estilos.botao}>Salvar Alterações</button>
            </form>
        </div>
    );
}