import Viewer from "@/components/Viewer";

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center">
      <div>
        <div className="text-4xl font-bold text-black py-18 ">tiff viewer</div>
        <Viewer />
      </div>
    </div>
  );
}
