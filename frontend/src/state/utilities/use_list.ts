import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {BusinessObjectActionNames} from "./redux_boilerplate_helper";

const useList = (actionsObject: BusinessObjectActionNames, apiName: string, refreshDependencies: any[] = []) => {
    const dispatch = useDispatch();

    const [dirty, setDirty] = useState(false);

    useEffect(() => {
      dispatch({type: actionsObject.LIST_REQUEST, payload: {api: apiName}})
      return () => {
        dispatch({type: actionsObject.LIST_UNLOAD});
      }
    }, refreshDependencies);

  }
;

export {useList};
