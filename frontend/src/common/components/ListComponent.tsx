import React from 'react';
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types';

const ListComponent = (props) => {

  const history = useHistory();

  const {idProp, detailRoute, headers, rowRenderer, items} = props;

  const clickableDetail = (detailRoute !== null && detailRoute !== '')

  return (
    <>
      <table className={`dataTable ${clickableDetail ? 'clickable' : ''}`}>
        <thead>
        <tr>
          {headers.map((h, i) => (<th key={i}>{h}</th>))}
        </tr>
        </thead>
        <tbody>
        {items.map((it, index) => {
          if (clickableDetail) {
            return (
              <tr key={index} onClick={() => {
                history.push(detailRoute.replace(':id', it[idProp]))
              }}>
                {rowRenderer(it)}
              </tr>
            );
          } else {
            return (
              <tr key={index}>
                {rowRenderer(it)}
              </tr>
            );
          }


        })}</tbody>
      </table>
    </>
  );
};

ListComponent.defaultProps = {
  idProp: 'id',
  detailRoute: null
}

ListComponent.propTypes = {
  path: PropTypes.string,
  detailRoute: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.string),
  rowRenderer: PropTypes.func,
  items: PropTypes.array,
  idProp: PropTypes.string
};

export default ListComponent;
