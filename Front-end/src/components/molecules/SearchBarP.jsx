import { useNavigate } from 'react-router-dom';
import InputP from "../atoms/InputP";
import ButtonP from "../atoms/ButtonP";

const SearchBarP = ({ searchValue, onSearchChange, onSearch }) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('/agregar-proveedor');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
    <h1 className="text-3xl font-bold">PROVEEDORES</h1>
    <div className="flex items-center space-x-2">
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
    </div>
  );
};

export default SearchBarP;
