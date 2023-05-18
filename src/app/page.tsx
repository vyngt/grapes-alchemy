"use client";

import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import { Editor } from "grapesjs";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [editor, set_editor] = useState<Editor | undefined>();
  const block_ref = useRef<HTMLDivElement>(null);

  const on_add_block = () => {
    if (editor) {
      editor.BlockManager.add("custom-block", {
        label: "Custom Block",
        content: {
          tagName: "div",
          draggable: true,
          attributes: { "some-attribute": "some-value" },
          components: [
            {
              tagName: "span",
              content: "<b>Some static content</b>",
            },
            {
              tagName: "div",
              components: "<span>HTML at some point</span>",
            },
          ],
        },
      });
    }
  };

  useEffect(() => {
    const _editor = grapesjs.init({
      container: "#gjs",
      fromElement: true,
      // Size of the editor
      height: "80vh",
      width: "auto",
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      panels: { defaults: [] },
      blockManager: {
        appendTo: "#block",
        blocks: [
          {
            id: "section",
            label: "<b>Section</b>",
            attributes: { class: "gjs-block-section" },
            content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
          },
          {
            id: "text",
            label: "Text",
            content: '<div data-gjs-type="text">Insert your text here</div>',
          },
          {
            id: "image",
            label: "Image",
            select: true,
            content: { type: "image" },
            activate: true,
          },
        ],
      },
    });
    set_editor(_editor);

    return () => {
      editor?.destroy();
      if (block_ref) {
        const current = block_ref.current;
        if (current) {
          console.log("Destroyed");
          current.innerHTML = "";
        }
      }
      set_editor(undefined);
    };
  }, []);

  return (
    <main className="h-screen">
      <div className="min-h-full">
        <button
          onClick={() => {
            on_add_block();
          }}
        >
          Add Button
        </button>
        <div id="gjs"></div>
        <div id="block" ref={block_ref}></div>
      </div>
    </main>
  );
}
