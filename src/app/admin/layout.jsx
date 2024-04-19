import Sidebar from "@/shared/Sidebar";
import Topbar from "@/shared/Topbar";

const AdminLayout = ({ children }) => {
  return (
    <>
      <header>
        <Topbar />
      </header>
      <aside>
        <Sidebar />
      </aside>
      {children}
    </>
  );
};

export default AdminLayout;
