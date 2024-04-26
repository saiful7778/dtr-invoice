import { EdgeStoreProvider } from "@/context/EdgeStoreContext";
import Sidebar from "@/shared/Sidebar";
import Topbar from "@/shared/Topbar";

const AdminLayout = ({ children }) => {
  return (
    <EdgeStoreProvider>
      <header>
        <Topbar />
      </header>
      <aside>
        <Sidebar />
      </aside>
      {children}
    </EdgeStoreProvider>
  );
};

export default AdminLayout;
