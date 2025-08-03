import { default as ReactSelect, components } from "react-select";
const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          className=" accent-primary dark:accent-primaryYellow"
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default Option;
