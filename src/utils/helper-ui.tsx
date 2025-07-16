import React, { type HTMLAttributes, type ReactNode, type JSX } from "react";
import {
  CiTextAlignCenter,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";
import {
  createButton,
  useEditorState,
  type EditorState,
} from "react-simple-wysiwyg";

const mentionPattern = /([@#])\[([^\]]+)\]\(([^)]+)\)/g;

export const parseMentions = (
  text: string,
  handleClick: (type: string, id: string) => void,
): JSX.Element[] => {
  // text = text.replaceAll("\n", "<br />")
  const parts = text.split(mentionPattern);

  // Process the parts to create React elements
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < parts.length) {
    const before = parts[i];
    const prefix = parts[i + 1]; // @ or #
    const name = parts[i + 2];
    const id = parts[i + 3];

    // Add text before mention
    if (before) {
      elements.push(
        <span key={`text-${i}`} style={{ whiteSpace: "pre-wrap" }}>
          {before}
        </span>,
      );
    }

    // Add mention element based on prefix
    if (prefix && name && id) {
      if (prefix === "@") {
        // Handle @mention for members
        elements.push(
          <a
            key={`${id}-${name}`}
            href="javascript:void(0);"
            onClick={() => handleClick("member", id)}
            className="mention-member"
          >
            @{name}
          </a>,
        );
      } else if (prefix === "!") {
        // Handle #mention for clients
        elements.push(
          <a
            key={`${id}-${name}`}
            href="javascript:void(0);"
            onClick={() => handleClick("client", id)}
            className="mention-client"
          >
            #{name}
          </a>,
        );
      } else if (prefix === "#") {
        // Handle #mention for clients
        elements.push(
          <a
            key={`${id}-${name}`}
            href="javascript:void(0);"
            onClick={() => handleClick("channel", id)}
            className="mention-client"
          >
            #{name}
          </a>,
        );
      }
    }

    i += 4; // Move to the next group of parts
  }
  return elements;
};

export function createColorButton(
  title: string,
  content: ReactNode,
  color: string,
) {
  ButtonFactory.displayName = title.replace(/\s/g, "");

  return ButtonFactory;

  function ButtonFactory(props: HTMLAttributes<HTMLButtonElement>) {
    const editorState = useEditorState();

    let active = false;

    function onAction(e: React.MouseEvent<HTMLButtonElement>) {
      document.execCommand("foreColor", false, color);
    }

    if (editorState.htmlMode) {
      return null;
    }

    return (
      <button
        className="rsw-btn"
        data-active={active}
        onMouseDown={onAction}
        tabIndex={-1}
        title={title}
        type="button"
        {...props}
      >
        {content}
      </button>
    );
  }
}

export const BtnAlignCenter = createButton(
  "Align center",
  <div className="flex items-center justify-center">
    <CiTextAlignCenter />
  </div>,
  "justifyCenter",
);
export const BtnAlignLeft = createButton(
  "Align left",
  <div className="flex items-center justify-center">
    <CiTextAlignLeft />
  </div>,
  "justifyLeft",
);
export const BtnAlignRight = createButton(
  "Align right",
  <div className="flex items-center justify-center">
    <CiTextAlignRight />
  </div>,
  "justifyRight",
);

export const BtnBlack = createColorButton(
  "Black",
  <div className="flex items-center justify-center">
    <div className="h-4 w-4 bg-[#000000]"></div>
  </div>,
  "#000000",
);
export const BtnGreen = createColorButton(
  "Green",
  <div className="flex items-center justify-center">
    <div className="h-4 w-4 bg-[#67C23A]"></div>
  </div>,
  "#67C23A",
);
export const BtnBlue = createColorButton(
  "Blue",
  <div className="flex items-center justify-center">
    <div className="h-4 w-4 bg-[#409EFF]"></div>
  </div>,
  "#409EFF",
);
export const BtnYellow = createColorButton(
  "Yellow",
  <div className="flex items-center justify-center">
    <div className="h-4 w-4 bg-[#F7DC6F]"></div>
  </div>,
  "#F7DC6F",
);
export const BtnRed = createColorButton(
  "Red",
  <div className="flex items-center justify-center">
    <div className="h-4 w-4 bg-[#FF4C4C]"></div>
  </div>,
  "#FF4C4C",
);
export const BtnPurple = createColorButton(
  "Purple",
  <div className="flex items-center justify-center">
    <div className="h-4 w-4 bg-[#A569BD]"></div>
  </div>,
  "#A569BD",
);
export const BtnOrange = createColorButton(
  "Orange",
  <div className="flex items-center justify-center">
    <div className="h-4 w-4 bg-[#F39C12]"></div>
  </div>,
  "#F39C12",
);
export const BtnPink = createColorButton(
  "Pink",
  <div className="flex items-center justify-center">
    <div className="h-4 w-4 bg-[#FFC0CB]"></div>
  </div>,
  "#FFC0CB",
);
