import { inputField } from "@/lib/types";

function InputField(inputData: inputField) {
  // console.log(inputData);
  return (
    <div
      className={`${
        inputData.hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"
      }`}
    >
      <label className="text-xs text-gray-400">{inputData.label}</label>
      <input
        type={inputData.type}
        className="w-full ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
        {...inputData.inputProps}
        {...inputData.register(inputData.name)}
        defaultValue={inputData.defaultValue}
        hidden={inputData.hidden}
      />
      {inputData.error?.message && (
        <p className="text-xs text-red-700">
          {inputData.error?.message.toString()}
        </p>
      )}
    </div>
  );
}

export default InputField;
