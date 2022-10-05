import { useEffect, useState } from "preact/hooks";
import * as cytoscape from "cytoscape";
import { MentoringPair, User } from "../models/index.ts";

interface CircleVizProps {
  users: User[];
  pairs: MentoringPair[];
}

export default function CircleViz({ users, pairs }: CircleVizProps) {
  useEffect(() => {
    const cy = cytoscape.default({
      container: document.getElementById("cy"),

      boxSelectionEnabled: false,
      autounselectify: true,
      zoomingEnabled: false,
      userZoomingEnabled: false,

      elements: {
        nodes: users.map((user) => ({
          data: { id: user.name },
          classes: "center-center",
        })),
        edges: pairs.map((pair) => ({
          data: {
            id: `${pair.mentor}->${pair.mentored}`,
            weight: 1,
            source: pair.mentor,
            target: pair.mentored,
          },
        })),
      },

      layout: {
        name: "breadthfirst",
        directed: true,
        fit: true,
        condense: true,
        padding: 30,
        avoidOverlap: true,
        spacingFactor: 1.1,
      },

      style: [
        {
          selector: ".center-center",
          style: {
            "text-valign": "center",
            "text-halign": "center",
          },
        },
        {
          selector: "node",
          style: {
            label: "data(id)",
            padding: "2em",
          },
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            width: 4,
            "line-color": "#999",
            "target-arrow-color": "#999",
          },
        },
      ],
    });
  }, [users, pairs]);

  return <div id="cy"></div>;
}
