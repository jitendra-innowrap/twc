import React, { useEffect } from 'react'
import success from "../../../public/assets/Lottie/no-orders.json"
import Lottie from "lottie-web";

export default function EmptyBookAnimation() {
    useEffect(() => {
        Lottie.loadAnimation({
          container: document.getElementById('animation'),
          animationData: success,
          renderer: 'svg',
          loop: true,
          autoplay: true,
        });
      }, []);
  return (
    <div id="animation" style={{ width: 200, height: 200 , marginInline:"auto"}} />
  )
}
