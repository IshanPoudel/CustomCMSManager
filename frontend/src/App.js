
import Header from './components/Header';
import Footer from './components/Footer';
import { createBrowserRouter , Outlet , RouterProvider , ScrollRestoration } from 'react-router-dom';
import Projects from './pages/Projects';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


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
          element: <LoginPage/>

        },
        {
          path: "/projects",
          element: <Projects/>
        },
        {
          path: "signup",
          element: <SignupPage/>

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
