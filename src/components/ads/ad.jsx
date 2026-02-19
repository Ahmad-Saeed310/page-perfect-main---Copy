import { useEffect } from "react";

const GoogleAd = ({ adClient, adSlot, style, className }) => {
  useEffect(() => {
    try {
      // Push the ad slot to AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log("AdSense push error:", err);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={{
        display: "block",
        minHeight: "250px", // default height for test ads
        width: "100%",      // full width by default
        backgroundColor: "#f3f3f3", // optional: visible container during dev
        ...style,           // override styles if passed
      }}
      data-ad-client={adClient || "ca-pub-1165028160233098"}
      data-ad-slot={adSlot || "7760276067"}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest="on" // test mode so it works on localhost
    />
  );
};

export default GoogleAd;
