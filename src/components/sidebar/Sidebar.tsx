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
    <aside id="sidebar-wrapper" className="w-full lg:w-1/4 px-4">
      <ul className="space-y-6">
        {widgets.map((w) => (
          <li
            key={w.id}
            className="border rounded-lg p-4 shadow-sm bg-white/70 backdrop-blur-sm"
          >
            {w.title && (
              <h4 className="font-semibold text-lg mb-2 border-b pb-1">
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
