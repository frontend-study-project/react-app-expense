import * as itemApi from '../services/api/Item';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import { setIsFormEdit, setIsFormAdd, setExpenseState, resetExpenseState } from "../store/form";
import { useDispatch } from "react-redux";
import { addItemsInLocalStorage } from "../services/api/Item";
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
export const useFetchItems = (page) => (
  useQuery({
    queryKey: ["items", page],
    queryFn: () => {
      return itemApi.fetchItemsFromLocalStorage(page);
    },
		initialData: {
			items : [],
			newItems: DUMMY_EXPENSES,
			total : DUMMY_EXPENSES.length,
		},
		staleTime: 1000,
  })
);
export const useAddItems = () => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	return useMutation(
		(newData) => {
			itemApi.addItemsInLocalStorage(newData);
		},
			{
				onSuccess: () => {
					queryClient.invalidateQueries(['items']);
					dispatch(resetExpenseState());
					// dispatch(setExpenseState())
					dispatch(setIsFormEdit(false));
				}
			}
	);
};
export const useUpdateItems = () => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();

	return useMutation(
		(updatedItems) => {
			itemApi.updateItemsInLocalStorage(updatedItems);
		},
		{
			onSuccess: () => {
				// 데이터 업데이트가 성공하면 실행되는 콜백
				queryClient.invalidateQueries(['items']);
				dispatch(resetExpenseState());
				dispatch(setIsFormEdit(false));
			},
		}
	);
};
export const useDeleteItems = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(itemId) => itemApi.deleteItemFromLocalStorage(itemId),
		{
			onSuccese : () => { queryClient.invalidateQueries(["items"]) }
		}
	);
};