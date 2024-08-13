import { FC, useState } from "react";

interface BannerFormProps {
  setBannerText: (text: string) => void;
  setHrefLink: (link: string) => void;
  setTargetDate: (date: Date) => void;
}

export const BannerForm: FC<BannerFormProps> = ({ setBannerText, setHrefLink, setTargetDate }) => {
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBannerText(text || "Default Banner Text");
    setHrefLink(link || "#hello");
    setTargetDate(new Date(date) || new Date());
    setText("");
    setLink("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded mb-6 shadow-lg m-6">
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="text">
          Banner Text
        </label>
        <input
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          id="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="link">
          Link
        </label>
        <input
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          id="link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="date">
          Target Date
        </label>
        <input
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-600"
      >
        Submit
      </button>
    </form>
  );
};
