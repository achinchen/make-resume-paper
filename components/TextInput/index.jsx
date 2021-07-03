import PropTypes from 'prop-types';
import cx from 'clsx';
import styles from './style.module.scss';

const TextInput = ({
  className,
  onValueChange,
  placeholder,
  value,
  label,
  ...props
}) => {
  const handleChange = (event) => {
    onValueChange(event.target.value);
    event.target.focus();
  };

  return (
    <label className={cx(styles.field, className)}>
      {label}
      <input
        value={value}
        className={cx(styles.fieldInput, { [styles.withLabel]: label })}
        onChange={handleChange}
        placeholder={placeholder}
        {...props}
      />
    </label>
  );
};

TextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onBlur: PropTypes.func
};

TextInput.defaultProps = {
  className: '',
  placeholder: '',
  label: ''
};

export default TextInput;
