import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-blue-600">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Không tìm thấy trang
        </h2>

        <p className="mt-3 text-gray-500">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/classes"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
            Quản lý lớp học
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
