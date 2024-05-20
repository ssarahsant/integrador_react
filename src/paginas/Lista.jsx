// Importação do componente
import { useState } from 'react'
import { Filme } from '../componentes/Filme'
import estilos from './Lista.module.css'
import { useEffect } from 'react'

export function Lista() {

    /* uso do state para armazenas os dados retornados da api em formato de vetor*/
    const [filmes, setFilmes] = useState([])

    
    const apiKey = "6f7f63efbf95898ddafa39e01b398b5f"


    /* chamada do useffcete que recebe de parametro uma função callback (arrow function) 
    e uma lista (quando carregada uma lista será execurtada uma função com esse elementos) */
    /* por se tratar de uma função assincrona a ação será disparada,  enquanto outras funcionalidades rodam, para ser totalmente executada no momento exato */ 
    /* o fetch pega informações espoecificas de acordo com a url especficada */
    /* delimitando a url para inserir os parametros do filme desejado*/
    /* fetch retorna uma promisse, que é o status de uma função assincrona, através de tratmento de sessão */ 
    /* o fetch vai acessar a url e levar um tempo para retornaar, depedendo da rede, 
    /* a promisse serve para aguardar op retorno */
    /*  Além do mais, essa estrutura ja trás o retorno da promisse estilizado */
    /* a ultima linha tranfere as informações para o vetor criado */ 
    useEffect ( () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&language=pt-br`).then(reposta => reposta.json())
        .then(dados => setFilmes(dados.results))
    }, [] )
    /* uso do fetch para montar a urkl com base na chave que foi aytribuida dentro da constabnte */ 
    /* use efeccet possibilita a execução de um afunção assincrona (fetch) que consome uma api, para ter um tempo de espera reduzido, se trata de uma função aassincrona usando a promisse que agurda a finalizaçõo das cmadas, que por fukm o reuksuktado iobtido é filtrado em json e posteriomente armazenado o componente atraves do use state que facilita a renbderização dos componentes. O resultado do fecth é um vetor cobtendo os filmes reuperados do link oferercido pela api*/



    return (
        <main className={estilos.conteiner}>
            {filmes.map( umFilme => <Filme propsFilme={umFilme}/>)}
        </main>
    )
        /* o map percorre uma estrutura de um vetor executando uma arrow function a cada posição do vetor */
        /* Para cada elemento existente dentro da função cria um card para armazenar os dados do filme existente nesse elemento */

        /* passando para o componente filme através de props cada filme contido na posição do vetor */
    
}
