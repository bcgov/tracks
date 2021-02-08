import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AUTH_ACT_AS} from "../../state/actions";
import {useHistory} from "react-router-dom";

const RoleSelector = () => {
  const currentlyActingAs = useSelector(state => state.Auth.developmentTools.actingAs);
  const availableActors = useSelector(state => state.Auth.developmentTools.availableActors);

  const dispatch = useDispatch();
  const actAs = (actor) => dispatch({type: AUTH_ACT_AS, payload: {actor}});

  const history = useHistory();

  return (
    <>
      <span> Acting as </span>

      <select
        defaultValue={currentlyActingAs ? currentlyActingAs.username : null}
        onChange={(e) => {
          actAs(availableActors.filter(a => a.username === e.target.value)[0]);
          history.push('/');
        }}>
        <option value={'Myself'}>Myself</option>
        {
          availableActors.map(a => (
            <option key={a.username} value={a.username}>{a.name}</option>
          ))
        }
      </select>

    </>
  );
};

export default RoleSelector;
