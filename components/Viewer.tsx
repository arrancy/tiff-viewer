"use client";

import { useEffect, useState } from "react";
// import OpenSeadragon from "openseadragon";
export default function Viewer() {
  const [isCloudFrontUrl, setIsCloudFrontUrl] = useState<boolean>(false);

  useEffect(() => {
    async function getCloudfrontCookies() {
      const response = await fetch(
        "http://localhost:3000/api/setCloudFrontCookies",
      );
      const data: { url: string } = await response.json();
      const { url } = data;
      const [baseUrl, signatureStuff] = url.split("?");
      const baseUrlWithKey = baseUrl + "/tiff_slide.dzi";
      const finalUrl = baseUrlWithKey + "?" + signatureStuff;
      console.log(finalUrl);
      if (response.ok) {
        setIsCloudFrontUrl(true);
        const OpenSeadragon = (await import("openseadragon")).default;
        const viewer = OpenSeadragon({
          id: "deepZoomViewer",
          tileSources: finalUrl,
          showNavigator: false,
          showNavigationControl: false,
          minZoomLevel: 0.7,
          maxZoomPixelRatio: 1.5,
        });
        return () => viewer.destroy();
      } else {
        return;
      }
    }
    getCloudfrontCookies();
  }, []);
  return (
    <>
      {isCloudFrontUrl ? (
        <div className="fixed top-1/2 left-1/2 " id="deepZoomViewer"></div>
      ) : (
        <div className="bg-slate-950 text-slate-400 font-semibold">
          loading...
        </div>
      )}
    </>
  );
}
