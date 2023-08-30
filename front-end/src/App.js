import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageRender from './PageRender';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/register" element={<Register />} />
        <Route path="/register/confirmOTP" element={<ConfirmOTP />} />
        <Route path="/register/avatar" element={<SetAvatar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} /> */}
        <Route path="/" element={<PageRender />} />
        <Route path="/:page" element={<PageRender />} />
        <Route path="/:page/:slug" element={<PageRender />} />
      </Routes>
    </Router>
  );
}

export default App;
