import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        <Link to="/classes" className="text-2xl font-bold text-blue-600">
          Class Management
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/classes" className={isActive("/classes")}>
            Danh sách lớp
          </Link>

          {/* <Link
            to="/classes/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Thêm lớp
          </Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
