import estilos from './Lateral.module.css'
// importaçaõ do componente link da biblioteca router
import { Link } from 'react-router-dom'


// Importação do Icone
import { NavigationArrow } from '@phosphor-icons/react'

export function Lateral () {
    return (
        <aside className={estilos.conteiner}>
            <header className={estilos.header}>
            <NavigationArrow 
            size={32} 
            weight="fill" 
            color='#1e2749' />
                <p className={estilos.title}>LOCALIZADOR</p>
            </header>
            
            <section>
            <Link
                className={estilos.botao}
                to='/inicial'>
                    Filmes
                </Link>

                <Link
                className={estilos.botao}
                to='perfil'>
                    Perfil
                </Link>
            </section>
            
        </aside>
    )
}
