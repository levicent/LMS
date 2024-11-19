import AdminLayout from "@/layout/AdminLayout";
import UsersTable from "@/components/Tables/UsersTable/UsersTable";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="col-span-12 xl:col-span-8">
        <UsersTable />
      </div>
    </AdminLayout>
  );
};
export default AdminDashboard;
