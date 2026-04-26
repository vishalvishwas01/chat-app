import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ExportPage from "./pages/ExportPage";

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/" className="hover:underline">Chat</Link>
        <Link to="/export" className="hover:underline">Export Logs</Link>
      </div>

      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/export" element={<ExportPage />} />
      </Routes>
    </Router>
  );
}

export default App;