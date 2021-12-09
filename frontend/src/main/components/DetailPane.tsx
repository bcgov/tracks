import React from 'react';
import PropTypes from 'prop-types';

const DetailMap = (field, name, renderer = (it, f) => (it[f])) => ({field, name, renderer});

const DetailPane = (props) => {
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
  }

;

DetailPane.propTypes =
  {
    title: PropTypes.string,
    it: PropTypes.object,
    map: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      field: PropTypes.string,
    }))
  };

export default DetailPane;

export {DetailMap};
