type SectionTitleProps = {
  title: string;
  subtitle?: string;
  light?: boolean;
};

export default function SectionTitle({
  title,
  subtitle,
  light = false,
}: SectionTitleProps) {
  return (
    <div className="mb-12">
      <h2
        className={`
          text-3xl md:text-4xl font-bold
          ${light ? "text-white" : "text-slate-900"}
        `}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`
            mt-3 max-w-2xl
            ${light ? "text-slate-400" : "text-slate-500"}
          `}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}