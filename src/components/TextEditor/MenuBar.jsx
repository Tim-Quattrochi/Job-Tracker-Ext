import { useState } from "react";
import boldIcon from "../../assets/boldIcon.svg";
import italicIcon from "../../assets/italicIcon.svg";
import headerBig from "../../assets/headerBig.svg";
import headerSmall from "../../assets/headerSmall.svg";
import olIcon from "../../assets/olIcon.svg";
import linkIcon from "../../assets/linkIcon.svg";
import numberedListIcon from "../../assets/numberedListIcon.svg";

const MenuBar = ({ editor, openModal }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex justify-around items-center bg-[#F9FEFF] p-1 border border-primary-400 rounded-lg w-full">
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <img src={boldIcon} alt="bold" className="h-8" />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        }
      >
        <img src={headerBig} alt="number list" className="h-8" />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        }
      >
        <img src={headerSmall} alt="number list" className="h-8" />
      </button>
      {/* make a button to toggle a link */}
      <button
        onClick={openModal}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <img src={linkIcon} alt="number list" className="h-8" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <img src={italicIcon} alt="bold" className="h-8" />
      </button>
      <button
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <img
          src={numberedListIcon}
          alt="number list"
          className="h-8"
        />
      </button>
      <button
        onClick={() =>
          editor.chain().focus().toggleBulletList().run()
        }
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <img src={olIcon} alt="number list" className="h-8" />
      </button>
    </div>
  );
};

export default MenuBar;
