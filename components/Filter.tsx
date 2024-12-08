export default function Filter() {
  return (
    <div className="flex justify-center p-4">
      <div style={{ display: "flex", gap: "10px" }}>
        <div className="flex flex-col items-end space-y-2">
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">Teams</span>
          </div>
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">Sharepoint</span>
          </div>
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">Outlook</span>
          </div>
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">Git</span>
          </div>
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">WhatsApp</span>
          </div>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">Slack</span>
          </div>
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">Notion</span>
          </div>
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">SalesForce</span>
          </div>
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">Gmail</span>
          </div>
          <div className="bg-gray-200 rounded px-2 py-1">
            <span className="text-sm">Discord</span>
          </div>
        </div>
      </div>
    </div>
  );
}
