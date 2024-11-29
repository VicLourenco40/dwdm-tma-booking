import { icons } from 'lucide-react';

import styles from './message.module.css';

type MessageProps = {
  message: string;
  ok: boolean;
}

export function Message(props: MessageProps) {
  const icon = props.ok ? 'CircleCheck' : 'CircleX'
  const LucideIcon = icons[icon];

  return (
    <div className={props.ok ? styles.success : styles.error}>
      <LucideIcon />
      <p>{props.message}</p>
    </div>
  );
}
