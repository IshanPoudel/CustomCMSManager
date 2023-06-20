
import Header from './components/Header';
import Footer from './components/Footer';
import { createBrowserRouter , Outlet , RouterProvider , ScrollRestoration } from 'react-router-dom';
import Projects from './pages/Projects';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './components/Dashboard';
import StartingPage from './pages/StartingPage';
import Databases from './pages/Databases';
import Tables from './pages/Tables';


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
        {
          path: "dashboard",
          element: <StartingPage/>
        },
        // Project/:id , for each project.
        {
          path: "/project/:id",
          element: <Projects/>
        },
        //Database/:name , for each project. 
        {
          path: '/database/:name/',
          element: <Databases/>
        },
        // Table name: for each table
        {
          path: '/viewTable/:db_name/:table_name',
          element: <Tables/>
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
