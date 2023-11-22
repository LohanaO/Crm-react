import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import  {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import Nuevocliente,{action as actionNuevocliente} from './pages/Nuevocliente'
import Index,{loader as clientesLoader} from './pages/Index'
import ErrorPage from './components/ErrorPage'
import EditarClientes,{loader as loaderEditarCliente, action as actionEditarCliete} from './pages/EditarClientes'
import {action as actionEliminarCliente} from './components/Cliente'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Index/>,
        loader: clientesLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: '/Clientes/Nuevo',
        element: <Nuevocliente/>,
        action:actionNuevocliente,
        errorElement: <ErrorPage/>
      },
      {
        path: '/Clientes/:clienteId/editar',
        element: <EditarClientes/>,
        loader: loaderEditarCliente,
        action: actionEditarCliete,
        errorElement: <ErrorPage/>
      },
      {
        path:'/clientes/:clienteId/eliminar',
        action: actionEliminarCliente,
       
      }
    ]
  }
 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
