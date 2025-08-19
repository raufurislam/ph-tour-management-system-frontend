import { Loader } from "@/components/ui/loader";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Loader className="w-16 h-16" />
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  );
}
