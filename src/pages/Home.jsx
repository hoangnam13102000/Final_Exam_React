import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import Toast from "../components/Toast";
import { fetchEmployees } from "../features/employees/employeesSlice";
import { Plus, Loader, AlertCircle, RefreshCw, Search, SortAsc, SortDesc } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const { items: employees, status, error } = useSelector(state => state.employees);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [toast, setToast] = useState(null);
  const departments = ["Kế toán", "Nhân sự", "IT", "Marketing"];

  useEffect(() => {
    if (status === "idle") dispatch(fetchEmployees());
  }, [status, dispatch]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (status === "loading") return <Loading />;
  if (status === "failed") return <Error error={error} onRetry={() => dispatch(fetchEmployees())} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Quản lý nhân sự
          </h1>
          <p className="text-gray-600">Quản lý, tìm kiếm và cập nhật thông tin nhân viên</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-600 focus:outline-none rounded-lg transition-colors"
              />
            </div>
            <div className="md:col-span-3 relative">
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 pr-10 border-2 border-gray-200 hover:border-indigo-300 focus:border-indigo-600 focus:outline-none rounded-lg transition-colors bg-white cursor-pointer"
              >
                <option value="asc">Ngày vào ↑</option>
                <option value="desc">Ngày vào ↓</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {sortOrder === "asc" ? <SortAsc className="w-5 h-5 text-gray-400" /> : <SortDesc className="w-5 h-5 text-gray-400" />}
              </div>
            </div>
            <div className="md:col-span-4">
              <button
                onClick={() => { setEditingEmployee(null); setShowForm(true); }}
                className="w-full px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <Plus size={20} />
                Thêm nhân viên
              </button>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <EmployeeList
          employees={employees}
          searchText={searchText}
          sortOrder={sortOrder}
          onEdit={emp => { setEditingEmployee(emp); setShowForm(true); }}
          setToast={setToast}
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={() => setShowForm(false)}
          departments={departments}
          setToast={setToast} 
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
