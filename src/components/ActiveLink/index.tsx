import Link, { LinkProps } from "next/dist/client/link"
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react"

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export default function ActiveLink({children, activeClassName, ...rest}: ActiveLinkProps){

  // Busca o path da página atual
  const { asPath } = useRouter();

  const className = asPath === rest.href
  ? activeClassName
  : '';

  // console.log("asPath:",asPath);
  // console.log("rest.href:",rest.href);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}
    </Link>
  )
}