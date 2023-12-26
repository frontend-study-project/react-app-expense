import PropTypes from "prop-types";
import styles from "./ExpenseDate.module.css";
const ExpenseDate = (props) => {
  const year = props.date.getFullYear();
  const month = props.date.getMonth() + 1;
  const day = props.date.getDate();
  return (
    <div className={styles["expense-date"]}>
      <span className={styles["expense-date__year"]}>{year}년</span>
      <span className={styles["expense-date__month"]}>{month}월</span>
      <span className={styles["expense-date__day"]}>{day}일</span>
    </div>
  );
};
ExpenseDate.propTypes = {
  date: PropTypes.object,
};
export default ExpenseDate;
