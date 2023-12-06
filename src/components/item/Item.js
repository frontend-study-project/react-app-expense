// 3. JSON.parse 메서드 호출한 값을 반복문을 돌려서 date 속성의 값을 문자열 -> Date 로 변경!
// 어차피 localstore에서 가져온 값은 항상 이 작업을 해야하기 떄문에 함수에서 한번에!
export const localStorageChanger = () => {
  return (JSON.parse(localStorage.getItem("items")) || []).map((item) => {
    return {
      ...item, 
      amount: Number(item.amount), 
      date: new Date(item.date) 
    }
  });
}
