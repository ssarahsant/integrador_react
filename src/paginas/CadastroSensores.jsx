// importando as bibliotecas
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// intermediação do hook com o zod
import { zodResolver } from '@hookform/resolvers/zod'
import estilos from './CadastroSensores.module.css'

// Definindo as opções de tipo de sensor
const TIPOS_SENSOR_CHOICES = [
    { value: 'Temperatura', label: 'Temp_Umidade' },
    { value: 'Contador', label: 'Contador' },
    { value: 'Luminosidade', label: 'Luminosidade' },
    { value: 'Umidade', label: 'Umidade' },
];

// Definindo as regras de validação
const schemaSensor = z.object({
    tipo: z.enum(TIPOS_SENSOR_CHOICES.map(choice => choice.value), {
        errorMap: () => ({ message: 'Selecione um tipo válido' })
    }),
    mac_address: z.string()
        .max(20, 'Máximo de 20 caracteres')
        .nullable(),
    latitude: z.number()
        .min(-90, 'Latitude inválida')
        .max(90, 'Latitude inválida'),
    longitude: z.number()
        .min(-180, 'Longitude inválida')
        .max(180, 'Longitude inválida'),
    localizacao: z.string()
        .max(100, 'Máximo de 100 caracteres'),
    responsavel: z.string()
        .max(100, 'Máximo de 100 caracteres'),
    unidade_medida: z.string()
        .max(20, 'Máximo de 20 caracteres')
        .nullable()
        .optional(),
    status_operacional: z.boolean().default(true),
    observacao: z.string()
        .optional()
});

export function CadastroSensores() {
    // Inicializando o useForm com o resolver do Zod
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaSensor)
    });

    // Função para obter os dados do formulário
    function obterDadosFormulario(data) {
        console.log('Dados do Sensor:', data);
    }

    // Renderizando o formulário
    return (
        <div className={estilos.container}>
            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
            <p className={estilos.titulo}>Cadastro de Sensores</p>
            
                {errors.tipo && (
                    <p className={estilos.mensagem}>{errors.tipo.message}</p>
                )}
                <select
                    {...register('tipo')}
                    className={estilos.campo}
                >
                    <option value="">Selecione o Tipo de Sensor</option>
                    {TIPOS_SENSOR_CHOICES.map(choice => (
                        <option key={choice.value} value={choice.value}>
                            {choice.label}
                        </option>
                    ))}
                </select>

                <label>Mac Address</label>
                {errors.mac_address && (
                    <p className={estilos.mensagem}>{errors.mac_address.message}</p>
                )}
                <input
                    {...register('mac_address')}
                    className={estilos.campo}
                    placeholder="MAC Address"
                />

                <label>Latitude</label>
                {errors.latitude && (
                    <p className={estilos.mensagem}>{errors.latitude.message}</p>
                )}
                <input
                    {...register('latitude')}
                    className={estilos.campo}
                />
                
                <label>Longitude</label>
                {errors.longitude && (
                    <p className={estilos.mensagem}>{errors.longitude.message}</p>
                )}
                <input
                    {...register('longitude')}
                    className={estilos.campo}
                />

                <label>Localização</label>
                {errors.localizacao && (
                    <p className={estilos.mensagem}>{errors.localizacao.message}</p>
                )}
                <input
                    {...register('localizacao')}
                    className={estilos.campo}
                />
                
                <label>Responsável</label>
                {errors.responsavel && (
                    <p className={estilos.mensagem}>{errors.responsavel.message}</p>
                )}
                <input
                    {...register('responsavel')}
                    className={estilos.campo}
                />

                <label>Unidade de Medida</label>
                {errors.unidade_medida && (
                    <p className={estilos.mensagem}>{errors.unidade_medida.message}</p>
                )}
                <input
                    {...register('unidade_medida')}
                    className={estilos.campo}
                />

                <div className={estilos.campoCheckbox}>
                    <input
                        {...register('status_operacional')}
                        type="checkbox"
                        className={estilos.checkbox}
                    />
                    <label>Status Operacional</label>
                </div>

                {errors.observacao && (
                    <p className={estilos.mensagem}>{errors.observacao.message}</p>
                )}
                <textarea
                    {...register('observacao')}
                    className={estilos.campo}
                    placeholder="Observação"
                />

                <button className={estilos.botao}>Cadastrar</button>
            </form>
        </div>
    );
}