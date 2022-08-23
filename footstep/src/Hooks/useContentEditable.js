import { useEffect, useState, useRef } from "react";

export default useContentEditable = (initialContent) => {
  const $contentEditable = useRef<HTMLDivElement | null>(null);
  const [content, _setContent] = useState(initialContent);

  const onInput = (event) => {
    _setContent(event.target.innerText);
  };

  const setContent = (newContent) => {
    if ($contentEditable.current) {
      $contentEditable.current.innerText = newContent;
      _setContent(newContent);
    }
  };

  useEffect(() => {
    setContent(initialContent);
  }, []);

  return { content, setContent, onInput, $contentEditable };
};