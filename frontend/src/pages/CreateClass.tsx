import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import { createClass } from "../services/classService";
import type { Class } from "../types/class";

const CreateClass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Class>({
    defaultValues: {
      status: "Open",
    },
  });

  const onSubmit = async (data: Class) => {
    try {
      setLoading(true);
      await createClass(data);
      toast.success("Thêm lớp học thành công!");
      navigate("/classes");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Không thể tạo lớp học.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/classes")}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 transition">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Thêm lớp học</h1>
        <p className="text-gray-500 mt-1">Điền thông tin để tạo lớp học mới</p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow rounded-xl border border-gray-100 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Mã lớp + Tên lớp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mã lớp <span className="text-red-500">*</span>
              </label>
              <input
                {...register("classCode", {
                  required: "Mã lớp không được bỏ trống",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="VD: CNTT01"
              />
              {errors.classCode && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.classCode.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Tên lớp <span className="text-red-500">*</span>
              </label>
              <input
                {...register("className", {
                  required: "Tên lớp không được bỏ trống",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Lập trình Web"
              />
              {errors.className && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.className.message}
                </p>
              )}
            </div>
          </div>

          {/* Giảng viên + Phòng học */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Giảng viên <span className="text-red-500">*</span>
              </label>
              <input
                {...register("teacher", {
                  required: "Giảng viên không được bỏ trống",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Nguyễn Văn A"
              />
              {errors.teacher && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.teacher.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phòng học <span className="text-red-500">*</span>
              </label>
              <input
                {...register("room", {
                  required: "Phòng học không được bỏ trống",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="A101"
              />
              {errors.room && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.room.message}
                </p>
              )}
            </div>
          </div>

          {/* Lịch học + Sĩ số */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Lịch học <span className="text-red-500">*</span>
              </label>
              <input
                {...register("schedule", {
                  required: "Lịch học không được bỏ trống",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Thứ 2 (Tiết 1-3)"
              />
              {errors.schedule && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.schedule.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sĩ số tối đa <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("maxStudents", {
                  required: "Sĩ số không được bỏ trống",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "Sĩ số phải lớn hơn 0",
                  },
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="30"
              />
              {errors.maxStudents && (
                <p className="text-red-500 text-sm mt-1.5">
                  {errors.maxStudents.message}
                </p>
              )}
            </div>
          </div>

          {/* Trạng thái */}
          <div className="max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Trạng thái
            </label>
            <select
              {...register("status")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition">
              {loading ? "Đang lưu..." : "Lưu lớp học"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/classes")}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-medium transition">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
