import { useNavigate } from 'react-router-dom';
import InputP from "../atoms/InputP";
import ButtonP from "../atoms/ButtonP";

const SearchBarP = ({ searchValue, onSearchChange, onSearch }) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/agregar-proveedor');
  };

  return (
    <div className="flex items-center bg-[#CCCCCC] p-4">
      <InputP
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Buscar"
        className="flex-grow border-none"
      />
      <ButtonP onClick={handleAddClick} className="flex-shrink-0 ml-4">
        Agregar
      </ButtonP>
    </div>
  );
};

export default SearchBarP;
