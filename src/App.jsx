import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ArticlePage } from "./pages/ArticlePage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/homepage"
          element={<HomePage currentUser={currentUser} />}
        />
        <Route
          path="/article/:articleId"
          element={<ArticlePage currentUser={currentUser} />}
        />
        <Route path="/*" element={<NotFoundPage currentUser={currentUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
