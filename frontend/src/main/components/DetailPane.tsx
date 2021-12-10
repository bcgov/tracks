import React from 'react';
import PropTypes from 'prop-types';

const DetailMap = (field, name, renderer = (it, f) => (it[f])) => ({field, name, renderer});

class DetailPaneProps {
  title: string;
  map: any;
  it: object;
}

const DetailPane: React.FC<DetailPaneProps> = (props) => {
  const {title, map, it} = props;

  return (
    <>
      <h2>{title}</h2>
      <div className='metadataPanel'>
        <dl>
          {map.map((v, i) => [
            <dt key={`dt-${i}`}>{v.name}</dt>,
            <dd key={`dd-${i}`}>{v.renderer(it, v.field)}</dd>
          ])}
        </dl>
      </div>

    </>
  );
};

export default DetailPane;

export {DetailMap};
