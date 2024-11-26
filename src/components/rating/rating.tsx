import styles from './rating.module.css';

type RatingProps = {
  rating: number;
};

export function Rating(props: RatingProps) {
  const ratingPercentage = props.rating / 5 * 100;

  return (
    <div className={styles.stars}>
      ★★★★★
      <div
        className={styles['stars-colored']}
        style={{width: ratingPercentage}}
      >
        ★★★★★
      </div>
    </div>
  );
}
