import { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import styles from './style.module.scss';

const TextArea = ({
  className,
  onValueChange,
  placeholder,
  value,
  stretch,
  ...props
}) => {
  const self = useRef(null);
  const fitContentHeight = useCallback(() => {
    if (stretch) {
      self.current.style.height = `${self.current.scrollHeight}px`;
    }
  }, [stretch]);

  const handleChange = ({ target }) => {
    onValueChange(target.value);
    fitContentHeight();
  };

  useEffect(() => {
    fitContentHeight();
  }, [fitContentHeight]);

  return (
    <textarea
      value={value}
      ref={self}
      className={cx(styles.field, className)}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  stretch: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onBlur: PropTypes.func
};

TextArea.defaultProps = {
  stretch: false,
  className: '',
  placeholder: ''
};

export default TextArea;
