import styles from './Hero.module.scss';

/* eslint-disable-next-line */
export interface HeroProps {}

export function Hero(props: HeroProps) {
  return (
    <div className={styles['container']}>
      <h1>A Hero</h1>
    </div>
  );
}

export default Hero;
