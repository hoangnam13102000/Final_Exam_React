import { useDispatch } from "react-redux";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { addEmployee, updateEmployeeById } from "../features/employees/employeesSlice";
import { X, User, Mail, Briefcase, Building2, Calendar, AlertCircle } from "lucide-react";
import Toast from "./Toast"; 

const DEPARTMENTS = ["Kế toán", "Nhân sự", "IT", "Marketing", "Bán hàng"];

export default function EmployeeForm({ employee, onClose }) {
  const dispatch = useDispatch();
  const isEditing = !!employee;

  const [toast, setToast] = useState(null);

  const initialValues = employee || {
    fullName: "",
    email: "",
    position: "",
    department: "",
    startDate: "",
  };

  const validate = values => {
    const errors = {};
    if (!values.fullName.trim()) errors.fullName = "Họ tên là bắt buộc";
    if (!values.email.trim()) errors.email = "Email là bắt buộc";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
      errors.email = "Email không hợp lệ";
    if (!values.position.trim()) errors.position = "Chức vụ là bắt buộc";
    if (!values.department.trim()) errors.department = "Phòng ban là bắt buộc";
    if (!values.startDate) errors.startDate = "Ngày vào làm là bắt buộc";
    return errors;
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // tự ẩn sau 3 giây
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{isEditing ? "Cập nhật nhân viên" : "Thêm nhân viên"}</h2>
          <button onClick={onClose} className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
              try {
                if (isEditing) {
                  dispatch(updateEmployeeById({ id: employee.id, data: values }));
                  showToast("Cập nhật nhân viên thành công", "success");
                } else {
                  dispatch(addEmployee(values));
                  showToast("Thêm nhân viên thành công", "success");
                }

                // Delay đóng form để toast hiển thị
                setTimeout(() => onClose(), 1500);

              } catch (err) {
                showToast("Có lỗi xảy ra, vui lòng thử lại", "error");
              }
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form className="space-y-4">
                <FieldInput name="fullName" label="Họ tên" icon={<User size={16} />} errors={errors} touched={touched} placeholder="Nhập họ tên" />
                <FieldInput name="email" label="Email" icon={<Mail size={16} />} errors={errors} touched={touched} placeholder="Nhập email" />
                <FieldInput name="position" label="Chức vụ" icon={<Briefcase size={16} />} errors={errors} touched={touched} placeholder="Nhập chức vụ" />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Building2 size={16} /> Phòng ban
                  </label>
                  <Field as="select" name="department" className={`w-full px-4 py-2.5 border rounded-lg ${errors.department && touched.department ? "border-red-500 bg-red-50" : "border-gray-200"}`}>
                    <option value="">Chọn phòng ban</option>
                    {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                  </Field>
                  {errors.department && touched.department && (
                    <div className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />{errors.department}
                    </div>
                  )}
                </div>

                <FieldInput name="startDate" label="Ngày vào làm" icon={<Calendar size={16} />} type="date" errors={errors} touched={touched} />

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 bg-gray-100 rounded-lg">Hủy</button>
                  <button type="button" onClick={handleSubmit} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg">{isEditing ? "Cập nhật" : "Thêm"}</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

function FieldInput({ name, label, icon, errors, touched, type="text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">{icon}{label}</label>
      <Field type={type} name={name} placeholder={placeholder} className={`w-full px-4 py-2.5 border rounded-lg ${errors[name] && touched[name] ? "border-red-500 bg-red-50" : "border-gray-200"}`} />
      {errors[name] && touched[name] && (
        <div className="text-red-600 text-sm mt-1 flex items-center gap-1">
          <AlertCircle size={14} />{errors[name]}
        </div>
      )}
    </div>
  );
}
