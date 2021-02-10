import React from 'react';
import '../styles/components/loading.scss';
import PropTypes from 'prop-types';
import moment from "moment";
import '../styles/components/friendly_time.scss';

const FriendlyTime = (props) => {
  const {value, from, until, time} = props;

  let formatString = 'll';
  if (time) {
    formatString = 'll HHmm[h] ZZ'
  }

  const fromSpan = () => (<span className={'relativeTime'}>{moment(value).fromNow()}</span>);
  const untilSpan = () => (<span className={'relativeTime'}>{moment(value).toNow()}</span>);

  if (value == null) {
    return (<></>);
  }

  return (
    <div className={'friendlyTime'}>
    <span className={'absoluteTime'}>{moment(value).format(formatString)}</span>
      {from && fromSpan()}
      {until && untilSpan()}
    </div>
  );
}

FriendlyTime.defaultProps = {
  until: false,
  from: false,
  time: false
};

FriendlyTime.propTypes = {
  until: PropTypes.bool,
  from: PropTypes.bool,
  time: PropTypes.bool,
  value: PropTypes.string.isRequired
};

export default FriendlyTime;
