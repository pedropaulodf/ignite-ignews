import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {

  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubscribe(){
    if(!session){
      signIn('github');
      return;
    }

    // Redireciona para os posts
    if(session.activeSubscription) {
      router.push('/posts');
      return;
    }

    // Criação da checkout session
    try{
      const response = await api.post('/subscribe')
      const { sessionId } = response.data;
      
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({sessionId: sessionId});
      
    } catch (err) {
      alert(err.message);
    }

  }

  return (
    <button 
    type="button" 
    className={styles.subscribeButton}
    onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
