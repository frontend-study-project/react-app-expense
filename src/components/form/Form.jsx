import styled from "./Form.module.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setIsFormAdd } from "../../store/form";
import AddForm from "./AddForm";

const Form = () => {
  const dispatch = useDispatch();
  const { isFormAdd } = useSelector(({ form }) => ({
    isFormAdd: form.isFormAdd,
  }));

  const toggleIsFormAdd = () => dispatch(setIsFormAdd(!isFormAdd));

  return (
    <div className={styled.form__content}>
      {/* true > edit, false > add */}
      {isFormAdd ? (
        <>
          <AddForm toggleIsFormAdd={toggleIsFormAdd} />
        </>
      ) : (
        <>
          <button
            type="button"
            className={`${styled["form__btn"]} ${styled["form__btn--open-form"]}`}
            onClick={toggleIsFormAdd}
          >
            새 거래 내역을 추가하세요
          </button>
        </>
      )}
    </div>
  );
};

Form.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object),
  setExpenseState: PropTypes.func,
};

export default Form;
