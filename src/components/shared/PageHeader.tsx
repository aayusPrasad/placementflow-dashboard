const PageHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
    <p className="text-sm text-muted-foreground mt-1">{description}</p>
  </div>
);

export default PageHeader;
