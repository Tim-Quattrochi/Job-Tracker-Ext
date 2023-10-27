import { useState, useCallback } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import MenuBar from "./MenuBar";
import { LinkModal } from "./LinkModal";
import "./modal.css";

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Highlight,
  Placeholder.configure({
    placeholder: "Type your details here...",
  }),

  Link.extend({
    inclusive: false,
  }),
  TextStyle,
  Color.configure({
    types: ["textStyle"],
  }),
];

const TextEdit = ({ onChange, content }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "h-52 bg-white overflow-y-auto  border-solid border-[#5A9DB6] w-full focus:outline-none min-h-full ",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();

      onChange(json);
    },
  });

  const openModal = useCallback(() => {
    setUrl(editor.getAttributes("link").href);
    console.log(url);
    setIsOpen(true);
  }, [editor]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .unsetLink()
        .run();
    }
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  return (
    <>
      <MenuBar editor={editor} openModal={openModal} url={url} />
      <BubbleMenu
        className="bubble-menu-light"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive("link");
        }}
      >
        <button className="button" onClick={openModal}>
          Edit
        </button>
        <button className="button-remove" onClick={removeLink}>
          Remove
        </button>
      </BubbleMenu>
      <EditorContent
        extensions={extensions}
        editor={editor}
        content={content}
        name="additional"
        value={content}
        id="additional"
        contentEditable="true"
      />
      <LinkModal
        url={url}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Link Modal"
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </>
  );
};

export default TextEdit;
