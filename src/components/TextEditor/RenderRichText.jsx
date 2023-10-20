import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

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

const RenderRichText = ({ content }) => {
  const editor = useEditor({
    extensions,
    editable: false,
    editorProps: {
      attributes: {
        class:
          " absolute prose lg:prose-xl h-52 bg-white overflow-y-auto focus:outline-none min-h-[300px]",
      },
    },
  });

  const parsedContent = JSON.parse(content);

  useEffect(() => {
    if (parsedContent) {
      editor?.commands.setContent(parsedContent);
    }
  }, [parsedContent, editor]);

  return (
    <EditorContent
      extensions={extensions}
      editor={editor}
      content={content}
      name="additional"
      value={content}
      id="additionalDetails"
    />
  );
};

export default RenderRichText;
