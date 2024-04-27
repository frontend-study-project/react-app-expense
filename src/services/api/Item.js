export const fetchItemsFromLocalStorage = (currentPage, searchInput) => {
  const itemsString = localStorage.getItem('items');
  const items = JSON.parse(itemsString || '[]').map((item) => {
    return {
      ...item,
      amount: Number(item.amount),
      date: new Date(item.date),
    };
  });
  // 검색어에 해당하는 아이템을 필터링한다
  const filteredItems = items.filter((item) =>
    Object.values(item)
      .join('')
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  );

  // 페이지네이션으로 아이템 slice하기
  const postPerPage = 5;
  const startIndex = (currentPage - 1) * postPerPage;
  const endIndex = startIndex + postPerPage;

  const newItems = filteredItems
    .sort((a, b) => b.date - a.date)
    .slice(startIndex, endIndex);

  const dataCheckMessage = items.length === 0 ? '데이터를 추가해주세요' : '';
  const total = filteredItems.length;
  const searchResultMessage =
    total === 0 ? '검색 조건에 맞는 데이터가 없습니다.' : '';

  return {
    newItems,
    total,
    searchInput,
    dataCheckMessage,
    searchResultMessage,
  };
};
export const addItemsInLocalStorage = (newData) => {
  if (!newData) return; //undefined가 들어감
  // 전체아이템 가져오기
  const itemsString = localStorage.getItem('items');
  // 문자열 -> 배열, 새로운 아이템을 추가
  const items = JSON.parse(itemsString || '[]');
  items.push(newData);
  localStorage.setItem('items', JSON.stringify(items));
};
export const updateItemsInLocalStorage = (updateItems) => {
  // 전체아이템 가져오기
  const itemsString = localStorage.getItem('items');
  let items = JSON.parse(itemsString || '[]');

  const index = items.findIndex((item) => item.id === updateItems.id);
  if (index !== -1) {
    items[index] = updateItems;
  }

  // 변경된 아이템 목록을 다시 로컬 스토리지에 저장
  localStorage.setItem('items', JSON.stringify(items));

  return items; // 변경된 아이템 목록 반환
};
export const deleteItemFromLocalStorage = (itemId) => {
  // 전체아이템 가져오기
  const itemsString = localStorage.getItem('items');
  let items = JSON.parse(itemsString || '[]');

  // 아이템 목록에서 삭제할 아이템을 찾아 제거
  items = items.filter((item) => item.id !== itemId);
  // 변경된 아이템 목록을 다시 로컬 스토리지에 저장
  localStorage.setItem('items', JSON.stringify(items));
  return items; // 변경된 아이템 목록 반환
};
