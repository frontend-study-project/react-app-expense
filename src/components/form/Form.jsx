import styled from './Form.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setModalState } from '../../store/form';
import FormModal from './FormModal';

const Form = () => {
  const dispatch = useDispatch();
  const { visibleModal, isFormModalAdd } = useSelector(
    ({ form: { modalState } }) => ({
      visibleModal: modalState.visibleModal,
      isFormModalAdd: modalState.isFormAdd,
    })
  );

  const toggleFormModalAdd = () =>
    dispatch(
      setModalState({
        visibleModal: !visibleModal,
        isFormModalAdd: !isFormModalAdd,
      })
    );

  return (
    <>
      <div className={styled.form__content}>
        <button
          type="button"
          className={`${styled['form__btn']} ${styled['form__btn--open-form']}`}
          onClick={toggleFormModalAdd}
        >
          새 거래 내역을 추가하세요
        </button>
      </div>
      {visibleModal && <FormModal isFormModalAdd={isFormModalAdd} />}
    </>
  );
};

Form.propTypes = {
  item: PropTypes.arrayOf(PropTypes.object),
  setExpenseState: PropTypes.func,
};

export default Form;
