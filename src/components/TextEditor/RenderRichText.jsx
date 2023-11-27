import { useEffect, useState } from "react";
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

const RenderRichText = ({
  content,
  handleSaveClick,
  setEditedJob,
  getJobData,
  job,
  editedJob,
}) => {
  const [showBtn, setShowBtn] = useState(false);
  const [inEdit, setInEdit] = useState(false);

  const editor = useEditor({
    extensions,
    autofocus: false,
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
  }, [editor, content]);

  const handleSave = () => {
    const newContent = editor?.getJSON() ?? "";

    const { content } = newContent;
    handleSaveClick({
      ...editedJob,
      additionalDetails: JSON.stringify(content),
    });
    setShowBtn((prev) => !prev);
    setInEdit((prev) => !prev);
  };

  const handleSideEdit = () => {
    setShowBtn((prev) => !prev);
    setInEdit((prev) => !prev);
    setEditedJob(getJobData(job));
  };

  return (
    <>
      <div className="flex justify-center gap-5">
        {showBtn && (
          <div
            className="h-auto w-14  bg-green-500 text-center text-gray-800 hover:bg-gray-200 hover:text-gray-700 cursor-pointer "
            onClick={handleSave}
          >
            Save
          </div>
        )}

        <div
          className="h-auto w-14 rounded bg-gray-400 text-center text-gray-800 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
          onClick={handleSideEdit}
        >
          {inEdit ? "Cancel" : "Edit"}
        </div>
      </div>
      <EditorContent
        extensions={extensions}
        editor={editor}
        content={content}
        name="additional"
        value={content}
        id="additionalDetails"
        contentEditable={inEdit}
      />
    </>
  );
};

export default RenderRichText;
