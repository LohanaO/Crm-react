import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom"
import Formulario from "../components/Formulario"
import { obtenerCliente, actualizarCliente } from "../data/Clientes"
import Error from "../components/Error"


export async function loader({params}){
    const cliente = await obtenerCliente(params.clienteId)
       if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados'
        })
       }
      
    
        return cliente
}

export async function action({request, params}){
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
//actualizar el cliente
  await actualizarCliente(params.clienteId, data)
  return redirect('/')

}
const EditarClientes = () => {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()
    console.log(cliente)
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar  Cliente</h1>
      <p className="mt-3">Formulario para editar los datos de un Cliente</p>

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
          <Formulario
            cliente={cliente}
          />

          <input
            type="submit"
            value="Guardar cambios"
            className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarClientes