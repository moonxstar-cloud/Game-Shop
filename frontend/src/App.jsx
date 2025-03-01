import React from "react";
import Header from "./Component/Header";
import MobileSidebar from "./Component/MobileSidebar";
import Home from "./Component/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SimilarGames from "./Component/SimilarGames";
import GenreGamesScreen from "./Component/GenreGamesScreen";
import GameDescription from "./Component/GameDiscription";
import GameScreenshotsPage from "./Component/GameScreenshotsPage ";
import LoginPage from "./Component/LoginPage";
import RegisterPage from "./Component/RegisterPage";
import WishListPage from "./Component/WishListPage";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./slice/store";
import DesktopSidebar from "./Component/DesktopSidebar";
import { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Function to clear the search query
  const clearSearchQuery = () => {
    setSearchQuery(""); // Reset the search query to an empty string
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="flex flex-col h-screen">
            <Header
              onMenuClick={() => setIsSidebarOpen(true)}
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery} // Pass searchQuery to Header
            />
            <div className="flex flex-1 overflow-hidden">
              {/* Pass clearSearchQuery to DesktopSidebar */}
              <DesktopSidebar clearSearchQuery={clearSearchQuery} />
              <div className="flex-1 overflow-y-auto">
                {/* Pass clearSearchQuery to MobileSidebar */}
                <MobileSidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                  clearSearchQuery={clearSearchQuery}
                />
                <ToastContainer />
                <Routes>
                  <Route path="/" element={<Home searchQuery={searchQuery} />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/game/:gameId/similar" element={<SimilarGames />} />
                  <Route path="/genre/:genreId" element={<GenreGamesScreen />} />
                  <Route path="/game/:gameId" element={<GameDescription />} />
                  <Route
                    path="/game/:gameId/screenshots"
                    element={<GameScreenshotsPage />}
                  />
                  <Route path="/wishlist" element={<WishListPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;