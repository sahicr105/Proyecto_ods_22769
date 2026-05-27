import './styles/PrimerComponente.css'

const string = 'Holiiis'
const number = 123456
const array = ['Curso', 'manzana', 4, 10]
const boolean = true
const funcion = () => 'String desde funcion'
const objeto = { nombre: 'Saul', duracion: 4 }
const fecha = new Date()

export const PrimerComponente = () => {
  return (
    <>
      <h1>Variables en JSX</h1>
      <h4>Variable tipo String:</h4> <p>{string}</p>
      <h4>Variable tipo number:</h4> <p>{number}</p>
      <h4>Variable tipo array:</h4> <p>{array}</p>
      <h4>Variable tipo boolean:</h4> <p>{boolean}</p>
      <h4>Variable tipo funcion:</h4> <p>{string}</p>
      <h4>Variable tipo String:</h4> <p>{funcion()}</p>
    </>
  )
}
