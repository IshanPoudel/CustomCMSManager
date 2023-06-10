
import Header from './components/Header';
import Footer from './components/Footer';
import { createBrowserRouter , Outlet , RouterProvider , ScrollRestoration } from 'react-router-dom';
import Projects from './pages/Projects';
import Home from './pages/Home';
import Login from './pages/Login';


const Layout = ()=>
{
  return (
    <div>
      <Header/>
      <ScrollRestoration/>
      <Outlet/>
      <Footer/>
    </div>
  )
}


//Create router links. 
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout/>,
      children:
      [
        {
          path: "/",
          element: <Home/>
          
        } , 
        {
          path: "/login",
          element: <Login/>

        },
        {
          path: "/projects",
          element: <Projects/>
        },
      ]
    }
  ]
)


function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      
    </div>
  );
}

export default App;
