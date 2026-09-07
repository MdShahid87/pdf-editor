import ToolCard from "./ToolCard";

const CategorySection = ({ title, tools }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={`${title}-${tool.name}`} tool={tool} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
