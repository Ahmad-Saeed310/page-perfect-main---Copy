import { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log("AdSense error:", err);
    }
  }, []);

  return (
  <ins
  className="adsbygoogle"
  style={{
    display: "block",
    width: "100%",
    minHeight: "250px",
    backgroundColor: "#f3f3f3" // optional: temporary background for testing
  }}
  data-ad-client="ca-pub-1165028160233098"
  data-ad-slot="7760276067"
  data-ad-format="auto"
  data-full-width-responsive="true"
  data-adtest="on" // test mode
/>

  );
};

export default GoogleAd;
