import { FormEvent } from 'react';
import styles from './form.module.css';

type FormProps = {
  children: React.ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function Form(props: FormProps) {
  return (
    <form className={styles.form} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
}
