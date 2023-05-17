"use client";

import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    grapesjs.init({
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
            id: "section", // id is mandatory
            label: "<b>Section</b>", // You can use HTML/SVG inside labels
            attributes: { class: "gjs-block-section" },
            content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
          },
        ],
      },
    });
  }, []);

  return (
    <main className="h-screen">
      <div className="min-h-full">
        <div id="gjs"></div>
        <div id="block"></div>
      </div>
    </main>
  );
}
