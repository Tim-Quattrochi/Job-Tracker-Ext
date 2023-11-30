const Input = ({
  type,
  id,
  name,
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
        name={name}
        id={id}
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
