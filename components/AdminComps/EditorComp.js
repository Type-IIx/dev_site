
import React from 'react'
import { Editor } from "react-draft-wysiwyg";

function EditorComp({content,setContent,defaultContent}) {

    const handleEditorStateChange = (news) => {
        setContent(news)
      }

  return <>
    <Editor
  editorState={content}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorstyle"
  defaultContentState={defaultContent}
  onEditorStateChange={handleEditorStateChange}
  
/>
  </>
}

export default EditorComp