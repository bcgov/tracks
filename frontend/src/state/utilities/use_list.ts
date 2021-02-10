import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {BusinessObjectActionNames} from "./redux_boilerplate_helper";

const useList = (actionsObject: BusinessObjectActionNames, apiName: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: actionsObject.LIST_REQUEST, payload: {api: apiName}})
    return () => {
      dispatch({type: actionsObject.LIST_UNLOAD});
    }
  }, []);

};

export {useList};
