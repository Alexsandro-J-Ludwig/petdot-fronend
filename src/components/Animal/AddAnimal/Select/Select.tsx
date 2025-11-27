import Checkbox from '@mui/material/Checkbox';

type Props = {
  specie: string;
};


function Select({specie}: Props) {
  return (
    <>
      {specie == "Cachorro" && (
        <Checkbox onChange={(e) => console.log(e.target.checked)}/>
      )}
      {specie == "Gato" && <option></option>}
      {specie == "Pássaro" && <option></option>}
      {specie == "Coelho" && <option></option>}
      {specie == "Peixe" && <option></option>}

      <input type="checkbox"/>
    </>
  );
}

export default Select;