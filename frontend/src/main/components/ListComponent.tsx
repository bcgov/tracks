import React, {ReactNode} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

class ListComponentProps {
  idProp?: string;
  detailRoute?: string;
  headers: any;
  rowRenderer: (row) => ReactNode;
  items: any[]
}

const ListComponent: React.FC<ListComponentProps> = ({idProp, detailRoute, headers, rowRenderer, items}) => {

  const navigate = useNavigate();

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
                navigate(detailRoute.replace(':id', it[idProp]))
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

export default ListComponent;
