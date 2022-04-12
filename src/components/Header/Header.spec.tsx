import { render, screen } from '@testing-library/react'
import { Header } from '.'

// O Mock serve para todos os testes abaixo
jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

// Uma boa prática descrever a categoria dos testes
describe('Header Component', () => {

  // Podemos usar o it() ao invés do test() como uma boa prática dentro de um describe():

  it('renders correctly', () => {
    render(
      <Header />
    )
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  
    // -> Essa função debug() faz o teste mostrar o HTML gerado pelo teste:
    // const { debug } = render()
    // debug()
  })
});
