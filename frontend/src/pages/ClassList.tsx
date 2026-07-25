import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { deleteClass, getClasses } from "../services/classService";
import type { Class } from "../types/class";

const ClassList = () => {
  const navigate = useNavigate();

  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getClasses();
      setClasses(response.data.data || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Không thể kết nối tới máy chủ.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const filteredClasses = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return classes;

    return classes.filter((item) => {
      return (
        item.classCode?.toLowerCase().includes(keyword) ||
        item.className?.toLowerCase().includes(keyword) ||
        item.teacher?.toLowerCase().includes(keyword) ||
        item.room?.toLowerCase().includes(keyword)
      );
    });
  }, [classes, search]);

  const handleDelete = async (id?: number) => {
    if (!id) return;

    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa lớp này?");
    if (!confirmDelete) return;

    try {
      await deleteClass(id);
      alert("Xóa lớp thành công.");
      fetchClasses();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Xóa lớp thất bại.");
    }
  };

  if (loading) {
    return <Loading text="Đang tải danh sách lớp..." />;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý lớp học</h1>
          <p className="text-gray-500 mt-1">
            Danh sách các lớp học trong hệ thống
          </p>
        </div>

        <Link
          to="/classes/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
          + Thêm lớp
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <input
          type="text"
          placeholder="Tìm theo mã lớp, tên lớp, giảng viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Mã lớp</th>
              <th className="text-left px-4 py-3">Tên lớp</th>
              <th className="text-left px-4 py-3">Giảng viên</th>
              <th className="text-left px-4 py-3">Phòng</th>
              <th className="text-left px-4 py-3">Lịch học</th>
              <th className="text-center px-4 py-3">Sĩ số</th>
              <th className="text-center px-4 py-3">Trạng thái</th>
              <th className="text-center px-4 py-3">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredClasses.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              filteredClasses.map((item, index) => (
                <tr
                  key={item.id ?? item.classCode ?? index}
                  className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.classCode}</td>
                  <td className="px-4 py-3">{item.className}</td>
                  <td className="px-4 py-3">{item.teacher}</td>
                  <td className="px-4 py-3">{item.room}</td>
                  <td className="px-4 py-3">{item.schedule}</td>
                  <td className="text-center px-4 py-3">{item.maxStudents}</td>
                  <td className="text-center px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status?.toLowerCase() === "open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="text-center px-4 py-3 space-x-2">
                    <button
                      onClick={() => navigate(`/classes/edit/${item.id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassList;
