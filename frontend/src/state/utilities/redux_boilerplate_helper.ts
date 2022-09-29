import axios from "axios";
import {all, put, select, takeLatest} from "redux-saga/effects";
import {getAuthHeaders} from "./authentication_helper";
import {TracksConfig} from "../config";
import {getConfiguration} from "./config_helper";

class BusinessObjectActionNames {

	constructor(basename: string) {
		this.LIST_UNLOAD = `${basename}_LIST_UNLOAD`;
		this.DETAIL_UNLOAD = `${basename}_DETAIL_UNLOAD`;
		this.LIST_REQUEST = `${basename}_LIST_REQUEST`;
		this.DETAIL_REQUEST = `${basename}_DETAIL_REQUEST`;
		this.LIST_REQUEST_COMPLETE = `${basename}_LIST_REQUEST_COMPLETE`;
		this.DETAIL_REQUEST_COMPLETE = `${basename}_DETAIL_REQUEST_COMPLETE`;
		this.ERROR = `${basename}_ERROR`;

	}

	LIST_REQUEST: string;
	LIST_UNLOAD: string;
	DETAIL_UNLOAD: string;
	DETAIL_REQUEST: string;
	LIST_REQUEST_COMPLETE: string;
	DETAIL_REQUEST_COMPLETE: string;
	ERROR: string;

}

export {BusinessObjectActionNames}

class DefaultState {
	loading: boolean;
	error: boolean;
	items: [];
	item: object;

	constructor() {
		this.loading = false;
		this.error = false;
		this.items = [];
		this.item = null;
	}
}

export {DefaultState};


function defaultReducer<Type extends DefaultState> (actionsObject, defaultState: Type) : (state: Type, action: any) => Type {

	return (state = defaultState, action): Type => {
		switch (action.type) {

		case actionsObject.LIST_UNLOAD: {
			return {
				...state,
				items: [],
			};
		}

		case actionsObject.DETAIL_UNLOAD: {
			return {
				...state,
				item: null,
			};
		}
		case actionsObject.LIST_REQUEST: {
			return {
				...state,
				loading: true,
				error: false,
				items: []
			};
		}

		case actionsObject.DETAIL_REQUEST: {
			return {
				...state,
				loading: true,
				error: false,
				item: null
			};
		}
		case actionsObject.LIST_REQUEST_COMPLETE: {
			const {items} = action.payload;
			return {
				...state,
				loading: false,
				error: false,
				items
			};
		}

		case actionsObject.DETAIL_REQUEST_COMPLETE: {
			const {item} = action.payload;
			return {
				...state,
				loading: false,
				error: false,
				item
			};
		}

		case actionsObject.ERROR: {
			return {
				...state,
				error: true,
			}
		}

		default:
			return state;
		}
	}
}

export {defaultReducer};

const defaultSagaGenerator = (actionsObject, path) => {

	function* loadList(action) {
		const {api} = action.payload;
		const config: TracksConfig = yield select(getConfiguration);

		try {
			const response = yield axios.get(`${path.replace(':API', api).replace(':BASE', config.API_BASE)}`, {
				headers: yield select(getAuthHeaders)
			});
			yield put({
				type: actionsObject.LIST_REQUEST_COMPLETE,
				payload: {
					items: response.data
				}
			});
		} catch (e) {
			yield put({type: actionsObject.ERROR});
		}
	}

	function* loadDetail(action) {
		const {id, api} = action.payload;
		const config: TracksConfig = yield select(getConfiguration);

		try {
			const response = yield axios.get(`${path.replace(':API', api).replace(':BASE', config.API_BASE)}/${id}`, {
				headers: yield select(getAuthHeaders)
			});
			yield put({
				type: actionsObject.DETAIL_REQUEST_COMPLETE,
				payload: {
					item: response.data
				}
			});
		} catch (e) {
			yield put({type: actionsObject.ERROR});
		}
	}

	return function* saga() {
		yield all(
			[
				takeLatest(actionsObject.LIST_REQUEST, loadList),
				takeLatest(actionsObject.DETAIL_REQUEST, loadDetail),
			]
		)

	}
};

export {defaultSagaGenerator};
