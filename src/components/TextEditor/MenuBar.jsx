import { useState } from "react";
import boldIcon from "../../assets/boldIcon.svg";
import italicIcon from "../../assets/italicIcon.svg";
import strikeIcon from "../../assets/strikeIcon.svg";
import erase from "../../assets/erase.svg";
import paragraph from "../../assets/paragraph.svg";
import list from "../../assets/list.svg";
import numberedList from "../../assets/numberedList.svg";
import undo from "../../assets/undo.svg";
import redo from "../../assets/redo.svg";
import highlight from "../../assets/highlight.svg";

const MenuBar = ({ editor }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Heading 1");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleSelect = (level) => {
    setSelectedValue(`Heading ${level}`);
    editor.chain().focus().toggleHeading({ level }).run();
    closeDropdown();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-around items-center bg-gray-100 p-1 border border-gray-300">
      <input
        type="color"
        onInput={(event) => {
          editor.chain().focus().setColor(event.target.value).run();
        }}
        data-testid="setColor"
      />

      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <img src={boldIcon} alt="bold" className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <img src={italicIcon} alt="bold" className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <img src={strikeIcon} alt="bold" className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => {
          if (editor.isActive("textStyle", { color: "#958DF1" })) {
            editor.chain().focus().unsetColor().run();
          } else {
            editor.chain().focus().unsetAllMarks().run();
          }
        }}
        className={`rich-text-button ${
          editor.isActive("textStyle", { color: "#958DF1" }) ||
          editor.isActive("textStyle")
            ? "is-active"
            : ""
        }`}
      >
        <img src={erase} alt="bold" className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => {
          editor.chain().focus().setParagraph().run();
        }}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <img src={paragraph} alt="paragraph" className="w-4 h-4" />
      </button>
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center items-center px-4 py-2  text-sm leading-5 font-medium rounded-md text-gray-700hover:text-gray-500 focus:outline-none focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
          id="heading-dropdown"
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          {selectedValue}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div
            className="origin-top-right z-10 absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none w-full"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="heading-dropdown"
          >
            <div
              className="py-1 text-center"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {[1, 2, 3].map((level) => (
                <button
                  type="button"
                  key={level}
                  onClick={() => {
                    handleSelect(level);
                  }}
                  className={`block px-4 py-2 text-sm leading-5 text-center mx-auto text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                    editor.isActive("heading", { level })
                      ? "is-active"
                      : ""
                  }`}
                  role="menuitem"
                >
                  Heading {level}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <img src={list} alt="list" className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <img
          src={numberedList}
          alt="number list"
          className="w-4 h-4"
        />
      </button>

      <button
        onClick={() => {
          editor.chain().focus().undo().run();
        }}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <img src={undo} alt="undo" className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().redo().run();
        }}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <img src={redo} alt="redo" className="w-4 h-4" />
      </button>

      <button
        onClick={() => {
          editor.chain().focus().toggleHighlight().run();
        }}
        className={editor.isActive("highlight") ? "is-active" : ""}
      >
        <img
          src={highlight}
          alt="highlight text"
          className="w-4 h-4"
        />
      </button>
    </div>
  );
};

export default MenuBar;
