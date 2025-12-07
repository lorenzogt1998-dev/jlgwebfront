export default function SidebarSmall() {
  const widgets = [
    {
      id: "promo1",
      title: "Upcoming Concert",
      content: (
        <p>
          Join <strong>Edgar Rene</strong> on the <em>Bien Tour 2025</em>!
          <br />
          <a href="/tour" className="text-blue-500 underline">
            View tour dates →
          </a>
        </p>
      ),
    },
    {
      id: "promo2",
      title: "Teachers' Resources",
      content: (
        <a href="/downloads" className="text-blue-600 underline">
          Download lesson materials
        </a>
      ),
    },
  ];

  return (
    <div id="sidebar-small-wrapper" className="my-8">
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {widgets.map((w) => (
          <li
            key={w.id}
            className="border rounded-lg p-4 shadow-sm bg-white/70 backdrop-blur-sm"
          >
            <h4 className="font-semibold text-lg mb-2">{w.title}</h4>
            <div className="text-sm text-gray-700">{w.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
