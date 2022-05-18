import React, { useEffect } from "react";
import $ from "jquery";
function Slider() {
  return (
    <>
      <div className="items">
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={
              process.env.PUBLIC_URL +
              "boot-bay-assets/slide/slide1_460x460.png"
            }
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={
              process.env.PUBLIC_URL +
              "boot-bay-assets/slide/slide2_460x460.png"
            }
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={
              process.env.PUBLIC_URL +
              "boot-bay-assets/slide/slide3_460x460.png"
            }
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={
              process.env.PUBLIC_URL +
              "boot-bay-assets/slide/slide4_460x460.png"
            }
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={
              process.env.PUBLIC_URL +
              "boot-bay-assets/slide/slide5_460x460.png"
            }
            width="400px"
          />
        </div>
        <div class="item max-w-[400px]">
          <img
            alt=""
            src={
              process.env.PUBLIC_URL +
              "boot-bay-assets/slide/slide6_460x460.png"
            }
            width="400px"
          />
        </div>
      </div>
    </>
  );
}

export default Slider;
