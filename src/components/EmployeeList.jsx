import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEmployeeById } from "../features/employees/employeesSlice";
import EmployeeForm from "./EmployeeForm";
import { Edit, Trash2, Users, Mail, Calendar, Briefcase, X, AlertCircle } from "lucide-react";

export default function EmployeeList({ employees = [], departmentFilter }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredEmployees = useMemo(() =>
    departmentFilter ? employees.filter(emp => emp.department === departmentFilter) : employees
  , [employees, departmentFilter]);

  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = (id) => {
    dispatch(deleteEmployeeById(id));
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Danh sách nhân viên
            </h1>
          </div>
          <p className="text-gray-600 ml-11 text-sm md:text-base">
            {filteredEmployees.length} nhân viên
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">STT</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Mã NV</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Họ và tên</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Chức vụ</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Phòng ban</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Ngày bắt đầu</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp, idx) => (
                    <tr key={emp.id} className="hover:bg-indigo-50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-200 text-gray-700 font-bold text-xs">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 font-bold text-xs">
                          {emp.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{emp.fullName}</td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${emp.email}`} className="text-indigo-600 hover:underline text-sm">
                          {emp.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{emp.position}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{emp.startDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => setEditing(emp)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600 hover:text-blue-700"
                            title="Chỉnh sửa"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600 hover:text-red-700"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="p-4 bg-gray-100 rounded-full">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Không có nhân viên nào</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(emp => (
              <div
                key={emp.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 font-bold text-xs">
                      {emp.id}
                    </span>
                    <h3 className="font-bold text-gray-900">{emp.fullName}</h3>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditing(emp)}
                      className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-gray-400" />
                    <a href={`mailto:${emp.email}`} className="text-indigo-600 hover:underline break-all">
                      {emp.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase size={14} className="text-gray-400" />
                    <span>{emp.position}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {emp.department}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-xs">{emp.startDate}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
              <div className="p-4 bg-gray-100 rounded-full inline-block mb-3">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Không có nhân viên nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              Xác nhận xóa nhân viên
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa nhân viên này?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => confirmDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {editing && <EmployeeForm employee={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}