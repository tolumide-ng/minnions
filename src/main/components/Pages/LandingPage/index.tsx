import * as React from "react";
import { Preview } from "../../UI/organisms/Preview";
import styles from "./index.module.css";

export const LandingPage = () => {
    return (
        <article className={styles.ldpg}>
            <article className={styles.ldpgCont}>
                <Preview />
            </article>
        </article>
    );
};
