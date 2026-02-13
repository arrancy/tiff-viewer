import Viewer from "@/components/Viewer";

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-black justify-center">
      <div>
        <div className="text-4xl font-bold text-white text-center py-18 ">
          tiff viewer
        </div>
        <Viewer />
      </div>
    </div>
  );
}
