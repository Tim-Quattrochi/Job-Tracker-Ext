const Input = ({
  type,
  placeHolder,
  value,
  onChange,
  className,
  autoComplete,
}) => {
  return (
    <div>
      <input
        type={type}
        name={type}
        id={type}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeHolder}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default Input;
