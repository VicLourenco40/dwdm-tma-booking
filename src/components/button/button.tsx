import styles from './button.module.css';

type ButtonProps = {
  text: string;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <div className={styles.button} onClick={props.onClick}>
      {props.text}
    </div>
  );
}
