type Widget = {
  id: string;
  title?: string;
  content: React.ReactNode;
};

interface SidebarProps {
  widgets: Widget[];
}

export default function Sidebar({ widgets }: SidebarProps) {
  return (
    <aside id="sidebar-wrapper" className="w-full px-4">
      {/* antes: space-y-6 */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {widgets.map((w) => (
          <li
            key={w.id}
            className="border rounded-3xl p-6 shadow-lg bg-white/80 backdrop-blur-sm border-gray-100"
          >
            {w.title && (
              <h4 className="font-semibold text-lg mb-4 text-[#243f4a] border-b pb-2">
                {w.title}
              </h4>
            )}
            <div className="text-sm text-gray-700">{w.content}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
