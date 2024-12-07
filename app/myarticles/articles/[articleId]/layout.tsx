export default function Layout({ children }) {
  return (
    <div className="p-4 bg-red-100">
      <h1>MyArticles Demo Knowledge Base</h1>
      {children}
    </div>
  );
}
