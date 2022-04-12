import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { AsyncTest } from '.'

test('it renders correctly', async () => {
  render(<AsyncTest/>);

  screen.logTestingPlaygroundURL();

  expect(screen.getByText('Hello World')).toBeInTheDocument();

  expect(await screen.findByText('ButtonText', {}, { timeout: 1400 })).toBeInTheDocument();

  // await waitFor(() => {
  //   return expect(screen.queryByText('ButtonText')).toBeInTheDocument();
  // }, {})

  // await waitForElementToBeRemoved(screen.queryByText('ButtonText'), {})
})