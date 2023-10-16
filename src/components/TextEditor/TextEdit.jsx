import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import MenuBar from "./MenuBar";

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

  TextStyle,
  Color.configure({
    types: ["textStyle"],
  }),
];

const TextEdit = ({ onChange, content }) => {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose lg:prose-xl h-52 bg-white overflow-y-auto focus:outline-none min-h-[300px]",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();

      onChange(json);
    },
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent
        extensions={extensions}
        editor={editor}
        content={content}
        name="additional"
        value={content}
        id="additional"
      />
    </>
  );
};

export default TextEdit;
