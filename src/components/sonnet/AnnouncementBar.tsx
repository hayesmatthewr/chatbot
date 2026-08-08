export function AnnouncementBar() {
  const messages = ["😴 90K+ Customers Sleeping Better", "📦 Free Shipping + 30-Day Guarantee"];
  return (
    <div className="bg-[#345E9E] text-white text-sm py-2 text-center">
      {messages.map((m) => (
        <p key={m} className="px-4">
          {m}
        </p>
      ))}
    </div>
  );
}
