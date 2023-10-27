import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";

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

  Link.configure({
    openOnClick: true,
  }),
  TextStyle,
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
  }, [editor]);

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
