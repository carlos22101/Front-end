const InputP = ({ value, onChange, placeholder, className }) => {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-gray-300 rounded py-2 px-4 ${className}`}
      />
    );
  };
  
  export default InputP;
  