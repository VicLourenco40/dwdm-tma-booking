import styles from './button.module.css';

type ButtonProps = {
  text: string;
}

export function Button(props: ButtonProps) {
  return (
    <div className={styles.button}>
      {props.text}
    </div>
  );
}
