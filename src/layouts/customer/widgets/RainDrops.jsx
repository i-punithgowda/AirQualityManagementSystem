import React from "react";
import "./RainDrop.css";
import "./Sun.css";

function RainDrop(props) {
  console.log(props);

  return (
    <div className="rain-animation">
      {props.state == "rainy" ? (
        <>
          <div class="raining-cloud"></div>
        </>
      ) : (
        <div class="cloudWrap">
          <div class="cloudBase">
            <div></div>
          </div>

          <div class="cloudBaseShadow">
            <div></div>
          </div>
          <div class="sun"></div>
          <div class="flash"></div>
        </div>
      )}
    </div>
  );
}

export default RainDrop;
