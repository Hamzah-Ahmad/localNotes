import { ChangeEventHandler } from "react";
import "./styles.css";

type ToggleProps = {
  isToggled: boolean
  onToggle: ChangeEventHandler<HTMLInputElement>
}
const ToggleSwitch = ({ isToggled, onToggle }: ToggleProps) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
};  
export default ToggleSwitch;
