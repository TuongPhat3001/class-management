import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Loading from "../components/Loading";
import { getClass, updateClass } from "../services/classService";
import type { Class } from "../types/class";

const EditClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Class>();

  useEffect(() => {
    if (!id) return;

    const fetchClass = async () => {
      try {
        setLoadingData(true);

        const response = await getClass(Number(id));

        // Backend:
        // {
        //   message: "...",
        //   data: {...}
        // }

        reset(response.data.data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Không tải được dữ liệu lớp.",
        );

        navigate("/classes");
      } finally {
        setLoadingData(false);
      }
    };

    fetchClass();
  }, [id, navigate, reset]);

  const onSubmit = async (data: Class) => {
    if (!id) return;

    try {
      setSaving(true);

      await updateClass(Number(id), data);

      toast.success("Cập nhật lớp học thành công!");

      navigate("/classes");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Cập nhật thất bại.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return <Loading text="Đang tải dữ liệu..." />;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-8">Chỉnh sửa lớp học</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Mã lớp */}

        <div>
          <label className="block mb-2 font-medium">Mã lớp</label>

          <input
            {...register("classCode", {
              required: "Vui lòng nhập mã lớp",
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.classCode && (
            <p className="text-red-500 mt-1">{errors.classCode.message}</p>
          )}
        </div>

        {/* Tên lớp */}

        <div>
          <label className="block mb-2 font-medium">Tên lớp</label>

          <input
            {...register("className", {
              required: "Vui lòng nhập tên lớp",
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.className && (
            <p className="text-red-500 mt-1">{errors.className.message}</p>
          )}
        </div>

        {/* Giảng viên */}

        <div>
          <label className="block mb-2 font-medium">Giảng viên</label>

          <input
            {...register("teacher", {
              required: "Vui lòng nhập giảng viên",
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.teacher && (
            <p className="text-red-500 mt-1">{errors.teacher.message}</p>
          )}
        </div>

        {/* Phòng */}

        <div>
          <label className="block mb-2 font-medium">Phòng học</label>

          <input
            {...register("room", {
              required: "Vui lòng nhập phòng học",
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.room && (
            <p className="text-red-500 mt-1">{errors.room.message}</p>
          )}
        </div>

        {/* Lịch học */}

        <div>
          <label className="block mb-2 font-medium">Lịch học</label>

          <input
            {...register("schedule", {
              required: "Vui lòng nhập lịch học",
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.schedule && (
            <p className="text-red-500 mt-1">{errors.schedule.message}</p>
          )}
        </div>

        {/* Sĩ số */}

        <div>
          <label className="block mb-2 font-medium">Sĩ số tối đa</label>

          <input
            type="number"
            {...register("maxStudents", {
              required: "Vui lòng nhập sĩ số",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Sĩ số phải lớn hơn 0",
              },
            })}
            className="w-full border rounded-lg p-3"
          />

          {errors.maxStudents && (
            <p className="text-red-500 mt-1">{errors.maxStudents.message}</p>
          )}
        </div>

        {/* Trạng thái */}

        <div>
          <label className="block mb-2 font-medium">Trạng thái</label>

          <select
            {...register("status")}
            className="w-full border rounded-lg p-3">
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Buttons */}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:bg-gray-400">
            {saving ? "Đang cập nhật..." : "Cập nhật"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/classes")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg">
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClass;
