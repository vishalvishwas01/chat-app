import PropTypes from "prop-types";

const Input = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  ...props
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full px-4 py-2 rounded-xl
        bg-gray-100
        text-sm text-gray-800
        placeholder-gray-400
        outline-none
        transition-all duration-200
        focus:bg-white
        focus:ring-2 focus:ring-blue-500
        focus:shadow-sm
        ${className}
      `}
      {...props}
    />
  );
};

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Input;