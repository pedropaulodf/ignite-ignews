import { SignInButton } from "../SignInButton";
import Link from "next/link";
import styles from "./styles.module.scss";
import ActiveLink from "../ActiveLink";
import { useState } from "react";

export function Header() {
  const [classOn, setClassOn] = useState(false);

  return (
    // <header className={styles.headerContainer}>
    //   <div className={styles.headerContent}>
    //     <Link href="/" >
    //       <a>
    //         <img src="/images/logo.svg" alt="ig.news" />
    //       </a>
    //     </Link>
    //     <nav>
    //       <ActiveLink activeClassName={styles.active} href="/" >
    //         <a>Home</a>
    //       </ActiveLink>
    //       <ActiveLink activeClassName={styles.active} href="/posts" >
    //         <a>Posts</a>
    //       </ActiveLink>
    //     </nav>
    //     <SignInButton/>
    //   </div>
    // </header>
    <header className={styles.header}>
      <div
        className={`${
          classOn
            ? ` ${styles.container} ${styles.menu_section} ${styles.on}`
            : ` ${styles.container} ${styles.menu_section}`
        }`}
        onClick={() => setClassOn(!classOn)}
      >
        <div className={styles.group}>

          <Link href="/">
            <a className={styles.logo}>
              <img src="/images/logo.svg" alt="ig.news" />
            </a>
          </Link>
          <nav>
            <ul>
              <li>
                <ActiveLink activeClassName={styles.active} href="/">
                  <a>Home</a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink activeClassName={styles.active} href="/posts">
                  <a>Posts</a>
                </ActiveLink>
              </li>
            </ul>
          </nav>
        </div>
        <SignInButton />
        <div className={styles.menu_toggle}>
          <div className={styles.one}></div>
          <div className={styles.two}></div>
          <div className={styles.three}></div>
        </div>
      </div>
    </header>
  );
}
