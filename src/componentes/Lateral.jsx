import estilos from './Lateral.module.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'; 

export function Lateral() {
    return (
        <aside className={estilos.conteiner}>
            <header className={estilos.header}>
                <img src={logo} alt="Logo" className={estilos.logo} /> 
            </header>
            
            <section>
                <Link
                    className={estilos.botao}
                    to='/inicial'>
                    Lista de Sensores
                </Link>

                <Link
                    className={estilos.botao}
                    to='cadastrosensores'>
                    Cadastro de Sensores
                </Link>

                <Link
                    className={estilos.botao}
                    to='cadastro'>
                    Cadastro de Usuário
                </Link>

                <Link
                    className={estilos.botao}
                    to='localizacao'>
                    Mapa de Sensores
                </Link>

                <Link
                    className={estilos.botao}
                    to='filtrosensores'>
                    Filtro de Sensores
                </Link>
            </section>
        </aside>
    )
}
