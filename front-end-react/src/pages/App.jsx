import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ClientList from '../pages/ClientList';
import ClientForm from '../pages/ClientForm';
import EditClient from '../pages/EditClient';

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ClientList />}/>
          <Route path='/add-client' element={<ClientForm />}/>
          <Route path='/edit-client/:id' element={<EditClient />}/>
        </Routes>
      </BrowserRouter>
    );
}