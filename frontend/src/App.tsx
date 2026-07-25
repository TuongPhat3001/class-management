import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import ClassList from "./pages/ClassList";
import CreateClass from "./pages/CreateClass";
import EditClass from "./pages/EditClass";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Layout chung */}
      <Route path="/" element={<Layout />}>
        {/* Trang mặc định */}
        <Route index element={<Navigate to="/classes" replace />} />

        {/* Quản lý lớp */}
        <Route path="classes" element={<ClassList />} />

        {/* Thêm lớp */}
        <Route path="classes/create" element={<CreateClass />} />

        {/* Chỉnh sửa lớp */}
        <Route path="classes/edit/:id" element={<EditClass />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
