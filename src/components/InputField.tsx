import { inputField } from "@/lib/types";

function InputField(inputData: inputField) {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-400">{inputData.label}</label>
      <input
        type={inputData.type}
        className="w-full ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
        {...inputData.inputProps}
        defaultValue={inputData.defaultValue}
        {...inputData.register(inputData.name)}
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
