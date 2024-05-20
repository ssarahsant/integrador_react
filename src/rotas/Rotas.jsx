// importação da bibilioetca router e dos objetos router e route
import { Routes, Route } from 'react-router-dom'
// um trata de todas as rotas e outro trata individualmente, 
// utilizando os routes para envpolver as rotas unicamente.
import { Login } from '../paginas/Login'
import { Inicial } from '../paginas/Inicial'
import { Perfil } from '../paginas/Perfil'
import { Lista } from '../paginas/Lista'

//para criar a rota usa-se a barra (/) para separra cada caminho e o servidor
// utlizando duas props: path (caminho) e element (elemento)
// navegação do login para a página inical, para isso são necessário duas rotas


export function Rotas() {
    return (
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/inicial' element={<Inicial/>}>
                <Route index element={<Lista/>}/>
                <Route path='perfil' element={<Perfil/>}/>
            </Route>
            
        </Routes>
    )
}

