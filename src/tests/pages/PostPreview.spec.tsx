import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-post",
  title: "My new Post",
  content: "<p>Post content</p>",
  updatedAt: "11 de Abril",
};

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../../services/prismic");

describe("Post Preview page", () => {

  it("renders correctly", () => {

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "loading" || "unauthenticated",
    });

    render(<Post post={post} />);

    expect(screen.getByText("My new Post")).toBeInTheDocument();
    expect(screen.getByText("Post content")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {

    const useSessionMocked = mocked(useSession);
    const userRouterMocked = mocked(useRouter);
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-active-subsctription',
      },
    } as any);

    userRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<Post post={post} />);
    
    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');

  });

  it("loads initial data", async () => {

    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My new post" }],
          content: [{ type: "paragraph", text: "Post content" }],
        },
        last_publication_date: "04-11-2022",
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: "my-new-post",
      },
    } as any);

    // expect.objectContaining({}) faz com que o teste verifique apenas se o teste possui os dados do objeto, se retirar, o teste verificar se o objeto é totalmente igual ao informado
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My new post",
            content: "<p>Post content</p>",
            updatedAt: "11 de abril de 2022",
          },
        },
      })
    );
  });
});
