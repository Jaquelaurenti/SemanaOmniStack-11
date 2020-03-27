import React from 'react';
import Routes from './routes'
import './global.css'
// componente no react é uma função que retorna html
// podendo ter funcionalidades javascript, css.

function App() {

  return (
    <Routes />
  );
}

export default App;



// As propriedades no React são atributos passados para os componentes.
  // const [counter, setValue] = useState(0);

  // // Quando utlizamos o useStae é retornado um array, 
  // // onde o Array possui duas posições [valor, funcao que atualiza]

  // function increment(){
  //   setValue(counter + 1);
  //   console.log(counter)
  // }