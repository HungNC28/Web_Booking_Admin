import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/login/Login";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import MainLayout from "./layout/MainLayout/MainLayout";
import HotelsPage from "./pages/HotelsPage/HotelsPage";
import RoomsPage from "./pages/RoomsPage/RoomsPage";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage";
import NewHotelPage from "./pages/NewHotelPage/NewHotelPage";
import NewRoomPage from "./pages/NewRoomPage/NewRoomPage";
import UserPage from "./pages/UserPage/UserPage";
import EditHotel from "./pages/EditHotel/EditHotel";
import EditRoom from "./pages/EditRoom/EditRoom";

function App() {
    const routes = createBrowserRouter([
        { path: "/", element: <Login /> },
        {
            path: "/admin",
            element: <MainLayout />,
            children: [
                { path: "dashboard", element: <DashboardPage /> },
                { path: "hotels", element: <HotelsPage /> },
                { path: "rooms", element: <RoomsPage /> },
                { path: "transactions", element: <TransactionsPage /> },
                { path: "hotels/create", element: <NewHotelPage /> },
                { path: "rooms/create", element: <NewRoomPage /> },
                { path: "users", element: <UserPage /> },
                { path: "hotels/edit/:hotelId", element: <EditHotel /> },
                { path: "rooms/edit/:roomId", element: <EditRoom /> },
            ],
        },
    ]);
    return <RouterProvider router={routes} />;
}

export default App;
