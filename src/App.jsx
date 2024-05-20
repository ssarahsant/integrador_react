// impotação dos componentes que irá estruturar a pagina
import { Inicial } from './paginas/Inicial'
import './global.css'
import { List } from '@phosphor-icons/react/dist/ssr'
import { Lista } from './paginas/Lista'
import { Perfil } from './paginas/Perfil'
import { BrowserRouter } from 'react-router-dom'
import { Rotas } from './rotas/Rotas'

// através do module se pré define um style sheet
// seprando o arquivo de estilização e importa em formato de objeto e suas classes
// aplica pequenas partes do css (classes) em cada componente (estrutura html do react)

// função que gera um trecho de html quando for rebnderizado
export function App() {
  // antes disso podem ser desenvolvimentda diferentes regras
  // quando a referencia é por tag não precisa passar o estilo

  // o browser é o componente que vai criar o contexto para o componente de rotas
// esse componente é importatdo da biblioteca router
  return (
        <BrowserRouter>
          <Rotas/>
        </BrowserRouter>
  )
}

// exportação da função (estrutura html) que deixa disponibel para importação em outra página
// como essa que esta sendo usada na main
// export default App

// a função app está sendo importada/chamda no documento main.
// para deixar padronizado, deve-se inserir o export no função 
// e usar o comando diretamente na inicialização da função
