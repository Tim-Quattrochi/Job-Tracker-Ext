const Input = ({ type, placeHolder, value, onChange, className }) => {
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
      />
    </div>
  );
};

export default Input;
