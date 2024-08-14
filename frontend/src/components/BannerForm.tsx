import { FC, useState } from "react";

interface BannerFormProps {
  onSubmit: (text: string, link: string, date: Date) => void;
  resetTimer: () => void;
}

export const BannerForm: FC<BannerFormProps> = ({ onSubmit, resetTimer }) => {
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [errors, setErrors] = useState<{ text?: string; link?: string; date?: string }>({});

  const validateForm = () => {
    const errors: { text?: string; link?: string; date?: string } = {};

    if (!text.trim()) errors.text = "Banner text is required.";
    if (!link.trim()) errors.link = "Link is required.";
    if (!date.trim()) errors.date = "Target date is required.";

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const targetDate = new Date(date);
    onSubmit(text, link, targetDate);

    setText("");
    setLink("");
    setDate("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded mb-6 shadow-lg m-6">
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="text">
          Banner Text
        </label>
        <input
          className={`w-full p-2 rounded bg-gray-700 text-white border ${errors.text ? 'border-red-600' : 'border-gray-600'}`}
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {errors.text && <p className="text-red-500 text-sm mt-1">{errors.text}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="link">
          Link
        </label>
        <input
          className={`w-full p-2 rounded bg-gray-700 text-white border ${errors.link ? 'border-red-600' : 'border-gray-600'}`}
          id="link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="date">
          Target Date
        </label>
        <input
          className={`w-full p-2 rounded bg-gray-700 text-white border ${errors.date ? 'border-red-600' : 'border-gray-600'}`}
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600 mr-2"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Reset Timer
        </button>
      </div>
    </form>
  );
};
