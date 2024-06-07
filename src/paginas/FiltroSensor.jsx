import React, { useState } from 'react';
import axios from 'axios';
import estilos from './FiltroSensor.module.css';

export function FiltroSensor() {
    const [filters, setFilters] = useState({
        responsavel: '',
        status_operacional: false,
        tipo: '',
        localizacao: '',
    });

    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://127.0.0.1:8000/api/sensor_filter/', filters, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSensors(response.data);
        } catch (error) {
            console.error('Error fetching sensors:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={estilos.container}>
            <form onSubmit={handleSubmit} className={estilos.formulario}>
                <p className={estilos.titulo}>Filtro de Sensores</p>

                <label>Responsável</label>
                <input
                    className={estilos.campo}
                    type="text" name="responsavel"
                    placeholder='Responsável'
                    value={filters.responsavel}
                    onChange={handleChange} />

                <div className={estilos.campoCheckbox}>
                    <input type="checkbox"
                        name="status_operacional"
                        checked={filters.status_operacional}
                        onChange={handleChange}
                        className={estilos.checkbox} />
                    <label>Status Operacional</label>
                </div>

                <label>Tipo</label>
                <input className={estilos.campo}
                    type="text" name="tipo"
                    placeholder='Tipo'
                    value={filters.tipo}
                    onChange={handleChange} />

                <label>Localização</label>
                <input className={estilos.campo}
                    type="text" name="localizacao"
                    placeholder='Localização'
                    value={filters.localizacao}
                    onChange={handleChange} />

                <button className={estilos.botao} type="submit">Filtrar</button>
            </form>

            <div className={estilos.containerTabela}>
                {sensors.length > 0 && ( // Verifica se há sensores filtrados
                    <table className={estilos.tabela}>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Localização</th>
                                <th>Responsável</th>
                                <th>Longitude</th>
                                <th>Latitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sensors.map(sensor => (
                                <tr key={sensor.id}>
                                    <td>{sensor.tipo}</td>
                                    <td>{sensor.localizacao}</td>
                                    <td>{sensor.responsavel}</td>
                                    <td>{sensor.longitude}</td>
                                    <td>{sensor.latitude}</td>
                                    {/* Aqui você pode adicionar o botão para alterar dados */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
            {loading && <div>Carregando...</div>}
            {error && <div className={estilos.mensagem}>Erro ao buscar sensores: {error.message}</div>}

        </div>
    );
};
