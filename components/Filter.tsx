export default function Filter() {
  return (
    <div className="flex justify-center p-4">
      <div style={{ display: "flex", gap: "7px" }}>
        <div className="flex flex-col items-end space-y-2">
          <div className="transition-all border border-2 border-foreground hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">Teams</span>
          </div>
          <div className="transition-all border border-2 bg-muted border-muted hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">Sharepoint</span>
          </div>
          <div className="transition-all border border-2 bg-muted border-muted hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">Outlook</span>
          </div>
          <div className="transition-all border border-2 border-foreground hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">GitLab</span>
          </div>
          <div className="transition-all border border-2 bg-muted border-muted hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">WhatsApp</span>
          </div>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <div className="transition-all border border-2 bg-muted border-muted hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">Slack</span>
          </div>
          <div className="transition-all border border-2 bg-muted border-muted hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">Notion</span>
          </div>
          <div className="transition-all border border-2 border-foreground hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">SalesForce</span>
          </div>
          <div className="transition-all border border-2 bg-muted border-muted hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">Gmail</span>
          </div>
          <div className="transition-all border border-2 bg-muted border-muted hover:border-muted-foreground text-foreground hover:text-foreground hover:cursor-pointer rounded px-1.5 py-0">
            <span className="text-sm">Discord</span>
          </div>
        </div>
      </div>
    </div>
  );
}
