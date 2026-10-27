import { BrowserRouter, Route, Routes } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import MyVenues from "./pages/MyVenues/MyVenues";
import HomePage from "./pages/Home/HomePage";
import VenueForm from "./pages/VenueForm/VenueForm";
import EventForm from "./pages/EventForm/EventForm";
import MainLayout from "./MainLayout";
import MyEvents from "./pages/MyEvents/MyEvents";
import EventBook from "./pages/EventBook/EventBook";
import EventCheckout from "./pages/EventBook/EventCheckout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/venue" element={<VenueForm />} />
          <Route path="/my-venues" element={<MyVenues />} />
          <Route path="/event" element={<EventForm />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/event/:id" element={<EventBook />} />
          <Route
            path="/event/:id/booking/:booking_id"
            element={<EventCheckout />}
          />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
