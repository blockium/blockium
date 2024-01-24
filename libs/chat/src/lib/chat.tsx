import styles from './chat.module.scss';

/* eslint-disable-next-line */
export interface ChatProps {}

export function Chat(props: ChatProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Chat!</h1>
    </div>
  );
}

export default Chat;
