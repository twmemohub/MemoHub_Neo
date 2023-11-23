import { useState } from "react";

// Below are all the components used on this page.
// If you need to modify a component, please look for clues to make changes in the respective component file.
import Sidebar from "../partials/dashboard/Sidebar";
import Header from "../partials/dashboard/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import FilterButton from "../components/DropdownFilter";
import Datepicker from "../components/Datepicker";
import Note from "../partials/dashboard/Note";
import Notelabel from "../partials/dashboard/SetQuestions";
// import Academy from "../partials/dashboard/Academy";
// import SkillsForm from "../partials/dashboard/SkillsForm";
import CreateArticle from "../partials/dashboard/CreateArticle";
import Banner from "../partials/dashboard/Banner";
import Article from "../partials/dashboard/Article";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // when I setSidebarOpen true, sidebar will open

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            {/*<WelcomeBanner />*/}

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <Note />
              <Notelabel />
              <Article/>
              <CreateArticle />
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;
