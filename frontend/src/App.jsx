import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Home";
import Alimentation from "./pages/Alimentation";
import Batiment from "./pages/Batiment";
import Fabrication from "./pages/Fabrication";
import Services from "./pages/Services";
import Layout from "./Layout";
import ArtisanDetail from "./pages/ArtisanDetail";
import Error from "./pages/Error";
import "./index.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil/>} />
          <Route path="/Alimentation" element={<Alimentation />} />
          <Route path="/Batiment" element={<Batiment />} />
          <Route path="/Fabrication" element={<Fabrication />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/artisan/:id" element={<ArtisanDetail />} />
          <Route path="/Error" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
} 

export default App;