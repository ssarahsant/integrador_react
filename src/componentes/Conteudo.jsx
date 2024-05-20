import estilos from './Conteudo.module.css'

export function Conteudo () {
    // Considerando que esse componente é unicamente para o main 
    // a tag retornada será main
    return (
        <main className={estilos.conteiner}>
            <h2>Conteudo</h2>
        </main>
    )
}
