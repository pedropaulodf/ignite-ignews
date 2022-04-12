import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";


jest.mock('next/router');
jest.mock("../../services/stripe");

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe('Home page', () => {

  it('renders correctly', () => {
    render(<Home product={{priceId: 'fake-price-id', amount: '$10.00'}} />);

    expect(screen.getByText('for $10.00 month')).toBeInTheDocument();
  })

  it('loads initial data', async () => {
    const retrieveStripePriceMocked = mocked(stripe.prices.retrieve);

    retrieveStripePriceMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any);

    const response = await getStaticProps({});

    // expect.objectContaining({}) faz com que o teste verifique apenas se o teste possui os dados do objeto, se retirar, o teste verificar se o objeto é totalmente igual ao informado
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )

  })

})