import estilos from './Filme.module.css'

// Importação do Ccomponente Card (para inserir os dados do filme)
import { Card } from './Card'

/* recuperando a props filme criada no componente lista*/

export function Filme({propsFilme}) {
    // adiciona a imagem através da nomeação aplicada na importação
    /* recuperando as chaves do json recuperado da api utilizando a props e a nomeclatura de chaves especificadas no jsonm */
    return (
        <Card>
            <figure className={estilos.conteiner}>
            <img src={ `https://image.tmdb.org/t/p/w400/${propsFilme.poster_path}` } />
            <figcaption> {propsFilme.title} </figcaption>
            <p> {propsFilme.overview} </p>
            <p> {propsFilme.vote_average} </p>
        </figure>
        </Card>
    )
}