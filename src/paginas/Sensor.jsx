// Consumo de API para listagem dos sensores cadastrados no banco de dados apresentado nas tabela 
import React, { useEffect, useState } from "react";
import axios from 'axios';
import estilos from './Sensor.module.css'
// Importação do Ccomponente Card (para inserir os dados do filme)
import { Card } from '../componentes/Card'

export function Sensor() {
    // State armazena em uma varuavel em tempo real o que esta ocorrendo
    // apresentando simultaneanete a mudança de status
    const[sensores, setSensores] = useState([]);

    // controle de carregamento dos itens e erros
    // o valor incial quando está carregando, é true e quando receber um valor para de carregar e apresenta um resultado
    const [loading, setLoading] = useState(true);
    
    const[error, setError]=useState(null);

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token')
                const response = await axios.get('http://127.0.0.1:8000/api/sensores', {
                    header:{
                        'Authorization':`Bearer ${token}`
                    }
            });
            setSensores(response.data)
            setLoading(false)
            }
            catch (erro) {
                setError(erro)
                setLoading(false)
            }
        }
        fetchSensores();
    }, []);
    
    if (loading){
        return <div> Carregando... </div>
    }

    if (error){
        return <div> Erro ao carregar os dados: {error.message}</div>
    }

    return (
        <div className={estilos.conteiner}>
            {sensores.map(sensor => (
                <Card key={sensor.id} >
                    <p><strong>Sensor:</strong> {sensor.tipo}</p>
                    <p><strong>Localização:</strong> {sensor.localizacao}</p>
                    <p><strong>Responsável:</strong> {sensor.responsavel}</p>
                    <p><strong>Longitude:</strong> {sensor.longitude}</p>
                    <p><strong>Latitude:</strong> {sensor.latitude}</p>
                </Card>
            ))}
        </div>
    )

}

// Renderização dos dados carregados do back-end, vindo da API
// consulta a API e retorna o resultado em uma função assincrona
// o ip é acessado através da url é inserir o token dentro do authorization, preenchendo o header e trazendo os resultados em tempo real dentro do setSensores preenchendo a lista
// após receber todos os dados o loadigns recebe false
// caso de algum erro é usuário é informado (criação de variavel para controle dos erros)

// enquanto estiver carregando, terá um retorno, assim serve para os erros

// a funcionalidade map percorre a lista gerada pelo fetch anteriormente 
// o key serve para indicar a qual item está se refereindo da lista de objetos