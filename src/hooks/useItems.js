import * as itemApi from '../services/api/Item';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import { setIsFormEdit, resetExpenseState } from "../store/form";
import { useDispatch } from "react-redux";
export const useFetchItems = (page) => (
  useQuery({
    queryKey: ["items", page],
    queryFn: () => {
      return itemApi.fetchItemsFromLocalStorage(page);
    },
		initialData: {
			items : [],
			newItems: [],
			total : 0,
		}
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
			onSuccess : () => {
				queryClient.invalidateQueries(["items"])
			}
		}
	);
};