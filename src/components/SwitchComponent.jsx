import React from "react";
import Switch from "react-switch";
import { lighten, shade } from "polished";
const SwitchComponent = ({ onChange, isDark, checkedSwitch }) => {
  return (
    <div>
      {" "}
      <Switch
        onChange={onChange}
        checked={isDark === checkedSwitch}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={shade(0.4, "#7fff00")}
        onColor="#7fff00"
        onHandleColor={lighten(0.4, "#242424")}
        offHandleColor={lighten(0.1, "#242424")}
        background="#7fff00"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        className="teste"
      />
    </div>
  );
};

export default SwitchComponent;
