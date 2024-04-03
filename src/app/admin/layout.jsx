import StateContextProvider from "@/context/StateContext";
import Sidebar from "@/shared/Sidebar";
import Topbar from "@/shared/Topbar";

const AdminLayout = ({ children }) => {
  return (
    <StateContextProvider>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-50 text-gray-900 duration-200 dark:bg-gray-900 dark:text-gray-50">
        <header>
          <Topbar />
        </header>
        <aside>
          <Sidebar />
        </aside>
        {children}
      </div>
    </StateContextProvider>
  );
};

export default AdminLayout;
