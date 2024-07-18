const ButtonM = ({ onClick, children, Style }) => {
  return (
    <button onClick={onClick} className={Style}>
      {children}
    </button>
  );
};

export default ButtonM;

