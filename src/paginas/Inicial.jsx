// impotação dos componentes que irá estruturar a pagina
// colocar dois pontos (..), para sair da pasta e buscar os componentes
// ./ busca na pasta atual
// ../ sai da pasta e busca o componente
import estilos from './Inicial.module.css'
import { Cabecalho } from '../componentes/Cabecalho' 
import { Lateral } from '../componentes/Lateral'
import { Outlet } from 'react-router-dom'


// através do module se pré define um style sheet
// seprando o arquivo de estilização e importa em formato de objeto e suas classes
// aplica pequenas partes do css (classes) em cada componente (estrutura html do react)


// função que gera um trecho de html quando for rebnderizado
// exportação da função (estrutura html) que deixa disponibel para importação em outra página
// como essa que esta sendo usada na main
export function Inicial() {
  // antes disso podem ser desenvolvimentda diferentes regras

  // quando a referencia é por tag não precisa passar o estilo
  return (
      <div className={estilos.gridConteiner}>
        <Cabecalho/>
        <Lateral/>
        <Outlet/>
      </div>
  )
}
