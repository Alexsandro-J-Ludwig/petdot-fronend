import styles from "./Footer.module.css";

function Footer(){
    const data = new Date()
    const year = data.getFullYear()

    return (
        <div className={styles["footer"]}>
            <p className={styles["copyright"]}>Copyright Alexsandro {year}</p>
        </div>
    )
}

export default Footer;