import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};
export default Spinner;
