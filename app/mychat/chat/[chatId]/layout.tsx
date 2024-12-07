export default function Layout({ children }) {
  return (
    <div className="p-4 bg-red-100">
      <h1>MyChat Demo Chat Service</h1>
      {children}
    </div>
  );
}
