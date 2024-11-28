import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import SplitterLayout from "./components/SplitterLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplitterLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
