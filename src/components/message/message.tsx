import { icons } from 'lucide-react';

import styles from './message.module.css';

type MessageProps = {
  message: string;
  success: boolean;
}

export function Message(props: MessageProps) {
  const icon = props.success ? 'CircleCheck' : 'CircleX'
  const LucideIcon = icons[icon];

  return (
    <div className={props.success ? styles.success : styles.error}>
      <LucideIcon />
      <p>{props.message}</p>
    </div>
  );
}
