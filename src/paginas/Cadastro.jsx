// importando as bibliotecas
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// intermediação do hook com o zod
import { zodResolver } from '@hookform/resolvers/zod'
import estilos from './Cadastro.module.css'


// as regras de validação fica em um arquivo chamado esquema
// a partir do objeto se faz um objeto java script
// usando os nomes dos campos registrados, a partr disso existem diversas função que pode sem encadeadas para fazer validação
// encadeamento de funções para define um tamanho minimo e máximo, vinculados ao campo nome que é uma string
const schemaPerfil = z.object ({
    nome: z.string()
    .min(1, 'Informe o nome')
    .max(25, 'Máximo de 25 caracteres'),

    usuario: z.string()
    .min(5, 'Mínimo de 5 caracteres')
    .max(10, 'Máximo de 10 caracteres'),

    senha: z.string()
    .min(8, 'Informe 8 caracteres')
    .max(8, 'Máximo de 8 caracteres')

})

export function Cadastro(){
    // o useForm possui varios recursos, um deles é o register e o submit
    // register (é a forma de identificaçlão de cada um dos campos usados)
    // em cada input será inserido o operador spreed (que da acesso a todos os recrusos que uma função trás)
    // detro é identiifcado o nome do elemento
    // handlesubmitt (da acesso a todos os componente identificados através do on submit)
    // juntamente com a lógica de uma função, onde a chamada ocorre no handle submite
    // para ter acesso aos dados inserido é preciso do data
    // use-se um intermediáreio para chamar a função (a biblioteca que vai geenciar oc componente identificados)
    // objeto errors para acessar as mensagem de erro do zod
    // e como parametro do useForm usa se o resolver para vinzular o uso do hook ao schema
    const { register, handleSubmit, formState: {errors} } = useForm({resolver: zodResolver(schemaPerfil)})

    // data um objeto java script que trás as informações do formulário
    function obterDadosFormulario(data) {
        console.log(`Nome: ${data.nome}`)
        console.log(`Usuário ${data.usuario}`)
        console.log(`Senha: ${data.senha}`)
    }

    // para cada campo fazer um if para testar o objeto erros
    // o obejto erro tem que estar no campo para considerar a regra
    // se tiver algum erro no campo nome será renderizado uma tag p, apresnetando uma mensagem
    // ou seja, em tempo real apresenta mensagens para se comunicar com o usuário sobre o erro em questão
    // && funciona como então no if para aplicar uma funcionalidade
    return(
        <div className={estilos.conteiner}>
            <form className={estilos.formulario}
            onSubmit={handleSubmit(obterDadosFormulario)}
            >
                 <p className={estilos.titulo}>Cadastro de Usuários</p>
                 
                <label>Nome</label>
                {errors.nome && (
                    <p className={estilos.mensagem}
                    >{errors.nome.message}</p>
                )}
                <input 
                {...register('nome')}
                className={estilos.campo}
                />

                <label>Usuario</label>
                {errors.usuario && (
                    <p className={estilos.mensagem}
                    >{errors.usuario.message}</p>
                )}

                <input 
                {...register('usuario')}
                className={estilos.campo}
                />
                
                <label>Senha</label>
                {errors.senha && (
                    <p className={estilos.mensagem}
                    >{errors.senha.message}</p>
                )}
                <input 
                {...register('senha')}
                className={estilos.campo}
                />
                
                <button
                className={estilos.botao}
                >Entrar</button>
            </form>
        </div>
    )
}