import { render } from '@testing-library/react'
import ActiveLink from '.'

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

// Uma boa prática descrever a categoria dos testes
describe('ActiveLink Component', () => {

  // Podemos usar o it() ao invés do test() como uma boa prática dentro de um describe():

  it('renders correctly', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active" >
        <a>Home</a>
      </ActiveLink>
    )
    
    expect(getByText('Home')).toBeInTheDocument()
  
    // -> Essa função debug() faz o teste mostrar o HTML gerado pelo teste:
    // const { debug } = render()
    // debug()
  })
  
  test('active link is receiving active class', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active" >
        <a>Home</a>
      </ActiveLink>
    )
    
    expect(getByText('Home')).toHaveClass('active')
  })
});
