import styles from './rating.module.css';

type RatingProps = {
  rating: number;
};

export function Rating(props: RatingProps) {
  const ratingPercentage = props.rating / 5 * 100;

  return (
    <p className={styles.stars}>
      ★★★★★
      <span className={styles['stars-colored']} style={{width: ratingPercentage}}>
        ★★★★★
      </span>
    </p>
  );
}
