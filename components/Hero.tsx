import SparklesText from "@/components/ui/sparkles-text";

export default function Hero() {
  return (
    <div className="w-full">
      <SparklesText
        className="text-6xl font-bold text-stroke"
        text="Crystal"
      />
      <p className="text-muted-foreground pt-2">Insights that shine.</p>
    </div>
  );
}
