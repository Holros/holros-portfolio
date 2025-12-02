import { useState } from "react";

interface Option {
  fullName: string;
  shortName: string;
}

interface Props {
  label?: string;
  options: Option[];
  selected: string[];
  onChange: (newValues: string[]) => void;
}

export default function MultiSelectDropdown({
  label = "Skills",
  options,
  selected,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const toggle = (shortName: string) => {
    if (selected.includes(shortName)) {
      onChange(selected.filter((s) => s !== shortName));
    } else {
      onChange([...selected, shortName]);
    }
  };

  return (
    <div className="w-full relative">
      {label && <p className="mb-1 font-medium">{label}</p>}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border rounded-md p-2 bg-white text-left"
      >
        {selected.length > 0
          ? `${selected.length} selected`
          : "Select skills"}
      </button>

      {open && (
        <div className="absolute z-20 bg-white border rounded-md w-full mt-1 max-h-48 overflow-y-auto shadow">
          {options.map((opt) => (
            <label
              key={opt.shortName}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.shortName)}
                onChange={() => toggle(opt.shortName)}
              />
              {opt.fullName}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
