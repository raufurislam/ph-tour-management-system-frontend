// components/ui/loader.tsx
export function Loader({ className = "" }: { className?: string }) {
  return (
    <div
      className={`border-4 border-primary border-t-transparent rounded-full w-12 h-12 animate-spin ${className}`}
    ></div>
  );
}
