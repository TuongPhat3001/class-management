import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  activePath?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Lớp học", href: "/classes", icon: FileText },
  { label: "Người dùng", href: "/users", icon: Users },
  { label: "Báo cáo", href: "/reports", icon: BarChart3 },
  { label: "Cài đặt", href: "/settings", icon: Settings },
];

const Sidebar = ({
  isCollapsed = false,
  onToggle,
  activePath = "/dashboard",
}: SidebarProps) => {
  return (
    <aside
      className={`flex flex-col h-full bg-white border-r transition-all duration-300 ${
        isCollapsed ? "w-[72px]" : "w-64"
      }`}>
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!isCollapsed && (
          <span className="text-lg font-bold text-gray-900">Admin</span>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100">
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activePath === item.href;
          const Icon = item.icon;

          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}>
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t">
        <button
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
            isCollapsed ? "justify-center" : ""
          }`}>
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
