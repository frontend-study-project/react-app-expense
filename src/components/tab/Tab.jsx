import { useDispatch } from "react-redux";
import { setTypes } from "../../store/type";

const Tab = () => {
  // store에 저장되어진 값을 변경할 때 무조건 먼저 호출!
  const dispatch = useDispatch();

  const handleChangeType = (type) => {
    dispatch(setTypes(type));
  };

  return (
    <div>
      <ul className="tabList">
        <li>
          <button type="button" onClick={() => handleChangeType("total")}>
            전체 내역
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleChangeType("income")}>
            수입
          </button>
        </li>
        <li>
          <button type="button" onClick={() => handleChangeType("outcome")}>
            지출
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Tab;
