// components는 화면에 뿌려지는 요소들이고 utils은 자주 쓰는 기능들(함수) 공통화시켜서 사용
// hooks은 react에서만 사용, utils은 아무데서나..(javascript...)
// => 불필요한, 반복적인 사용을 줄이기 위해 사용

export const getDate = (date) => {
  const year = date.getFullYear();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return year + "-" + month + "-" + day;
};
