import { render, screen, fireEvent } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import { SubscribeButton } from ".";
import { useRouter } from 'next/router'

// O Mock serve para todos os testes abaixo
jest.mock("next-auth/react");
jest.mock("next/router");

// Uma boa prática descrever a categoria dos testes
describe("SubscribeButton Component", () => {

  it("renders correctly", () => {
    
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "loading" || "unauthenticated",
    });

    render(<SubscribeButton />);
    expect(screen.getByText("Subscribe now", { exact: false })).toBeInTheDocument();
  });

  it("redirects users to sign in when not authenticated", () => {

    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "loading" || "unauthenticated",
    });

    // Mocka a função signIn()
    const signInMocked = mocked(signIn);

    render(<SubscribeButton />);

    // Pega o botão para dar um click nele
    const subscribeButton = screen.getByText("Subscribe now", { exact: false });

    // Dispara um evento de click no botao
    fireEvent.click(subscribeButton);
    
    // Espera a função ser chamada
    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has a subscription', () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: 'fake-active-subsctription',
      },
      status: "authenticated",
    });

    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any);

    render(<SubscribeButton />);

    // Pega o botão para dar um click nele
    const subscribeButton = screen.getByText("Subscribe now", { exact: false });

    // Dispara um evento de click no botao
    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');

  })

});
