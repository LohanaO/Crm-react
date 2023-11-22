import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCliente } from '../data/Clientes'


export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const email = formData.get('email')
  //validacion
  const errores = []
  if (Object.values(data).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  
  if (!regex.test(email)) {
    errores.push('El email no es valido')
  }
  
  if (Object.keys(errores).length) {
    return errores
  }

  await agregarCliente(data)
  return redirect('/')
}
const Nuevocliente = () => {
  const errores = useActionData()
  const navigate = useNavigate()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-10 py-10 mt-20'>
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form
          method="post"
          noValidate

        >
          <Formulario />

          <input
            type="submit"
            value="Registrar Cliente"
            className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
          />
        </Form>
      </div>
    </>
  )
}

export default Nuevocliente