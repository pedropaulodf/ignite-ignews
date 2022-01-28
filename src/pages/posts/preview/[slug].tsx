import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";

import styles from '../post.module.scss'
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps {
  post: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string,
  }
}

export default function PostPreview({ post }: PostPreviewProps){

  const {data: session} = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session?.activeSubscription){
      router.push(`/posts/${post.slug}`)
    }
  },[session]);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{__html: post.content}}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a href="">Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
    // true: Quando usuario acessa o post pela primeira vez, faz a requisicao em tempo real. Mas espera a página carregar para mostrar para o usuario. (Causa Layout Shift-carrega a página sem o conteúdo e depois preenche ele) | Não é bom para SEO.
    
    // false: Se o post não foi gerado ainda, manda o erro de 404.

    // 'blocking': Parece o true, mas carrega o post no serverSide e só mostra a tela depois que carregou o conteúdo de fato.
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID<any>('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    },
    redirect: 60 * 60, // 1 hour
  }

}