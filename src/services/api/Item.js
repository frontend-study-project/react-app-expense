const DUMMY_EXPENSES = [
	{
		id: "e1",
		type: "outcome", // type 추가
		category: "쇼핑",
		title: "Toilet Paper",
		amount: 94.12,
		date: new Date(2020, 7, 14),
	},
	{
		id: "e2",
		type: "outcome",
		category: "쇼핑",
		title: "New TV",
		amount: 799.49,
		date: new Date(2021, 2, 12),
	},
	{
		id: "e3",
		type: "outcome",
		category: "보험",
		title: "Car Insurance",
		amount: 294.67,
		date: new Date(2021, 2, 28),
	},
	{
		id: "e4",
		type: "outcome",
		category: "쇼핑",
		title: "New Desk (Wooden)",
		amount: 450,
		date: new Date(2021, 5, 12),
	},
];
export const fetchItemsFromLocalStorage = (currentPage) => {
  const itemsString = localStorage.getItem("items");
  const items = JSON.parse(itemsString || '[]').map((item) => {
      return {
          ...item,
          amount: Number(item.amount),
          date: new Date(item. date)
      }
  })
  const postPerPage = 3;
  const startIndex = (currentPage - 1) * postPerPage;
  const endIndex = startIndex + postPerPage;

  const newItems = items
    .sort((a, b) => b.date - a.date)
    .slice(startIndex, endIndex);

	return { newItems, total: items.length }

};
export const addItemsInLocalStorage = (newData) => {
	if(!newData) return //undefined가 들어감
	// 전체아이템 가져오기
	const itemsString = localStorage.getItem("items");
	// 문자열 -> 배열, 새로운 아이템을 추가
	const items = JSON.parse(itemsString || '[]')
	items.push(newData);
	localStorage.setItem('items', JSON.stringify(items));
};
export const updateItemsInLocalStorage = (updateItems) => {
// 전체아이템 가져오기
	const itemsString = localStorage.getItem("items");
	let items = JSON.parse(itemsString || '[]');

	const index = items.findIndex((item) => item.id === updateItems.id);
	if(index !== -1){
		items[index] = updateItems
	}

	// 변경된 아이템 목록을 다시 로컬 스토리지에 저장
	localStorage.setItem("items", JSON.stringify(items));

	return items; // 변경된 아이템 목록 반환
}
export const deleteItemFromLocalStorage = (itemId) => {
	// 전체아이템 가져오기
	const itemsString = localStorage.getItem("items");
	let items = JSON.parse(itemsString || '[]');

	// 아이템 목록에서 삭제할 아이템을 찾아 제거
	items = items.filter((item) => item.id !== itemId);
	// 변경된 아이템 목록을 다시 로컬 스토리지에 저장
	localStorage.setItem("items", JSON.stringify(items));
	return items; // 변경된 아이템 목록 반환
};
