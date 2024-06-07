import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Mapa from '../componentes/Mapa';
import estilos from './Sensor.module.css'

export function Localizacao() {
    const [pontos, setPontos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token')
                const response = await axios.get('http://127.0.0.1:8000/api/sensores', {
                    header:{
                        'Authorization':`Bearer ${token}`
                    }
            });
        
                const sensores = response.data;
                const pontos = sensores.map(sensor => ({
                    latitude: sensor.latitude,
                    longitude: sensor.longitude,
                    tipo: sensor.tipo,
                    localizacao: sensor.localizacao,
                }));
                setPontos(pontos);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        fetchSensores();
    }, []);

    if (loading) {
        return <div className={estilos.mensagemErro}> Carregando... </div>;
    }

    if (error) {
        return <div className={estilos.mensagemErro}> Erro ao carregar os dados: {error.message} </div>;
    }

    return (
        <div>
            <Mapa pontos={pontos} />
        </div>
    );
}
