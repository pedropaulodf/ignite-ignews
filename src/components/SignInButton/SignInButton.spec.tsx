import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/react";
import { SignInButton } from ".";

// O Mock serve para todos os testes abaixo
jest.mock("next-auth/react");

// Uma boa prática descrever a categoria dos testes
describe("SignInButton Component", () => {
  // Podemos usar o it() ao invés do test() como uma boa prática dentro de um describe():

  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    // Seta o valor para ser mockado
    // mockReturnValue = Vale para todos os testes, seja esse ou os de baixo.
    // mockReturnValueOnce = Vale apenas para o próximo teste abaixo desse.
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "loading" || "unauthenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
