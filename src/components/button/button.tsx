import styles from './button.module.css';

type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Button(props: ButtonProps) {
  return (
    <div className={styles.button} onClick={props.onClick}>
      {props.text}
    </div>
  );
}
