const Label = ({ htmlFor, className, labelName }) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {labelName}
    </label>
  );
};

export default Label;
