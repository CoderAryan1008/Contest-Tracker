// Central theme registry for every contest platform.
//
// Each entry drives the color, gradient, glow and icon used across
// the dashboard grid AND the horizontal Contest Spotlight carousel.
//
// Adding a new platform only requires adding one entry here.

import codecheflogo from "@/assets/codecheflogo.png";
import leetcodelogo from "@/assets/leetcodelogo.png";
import codeforcelogo from "@/assets/codeforceslogo.png";

export const platformThemes = {
  codeforces: {
    label: "Codeforces",
    tag: "CF",

    // Codeforces' recognizable blue/red/yellow identity
    color: "#3B82F6",

    // Deep blue base with a subtle red/yellow accent feel
    gradientFrom: "#0B1628",
    gradientTo: "#1D4ED8",

    // Blue glow keeps the UI clean while matching the logo
    glow: "rgba(59, 130, 246, 0.45)",

    Icon: codeforcelogo,
  },

  codechef: {
    label: "CodeChef",
    tag: "CC",

    // Warm CodeChef brown/orange identity
    color: "#D6A15D",

    // Dark brown → warm bronze
    gradientFrom: "#1C120B",
    gradientTo: "#6B4322",

    glow: "rgba(214, 161, 93, 0.40)",

    Icon: codecheflogo,
  },

  leetcode: {
    label: "LeetCode",
    tag: "LC",

    // Main LeetCode orange
    color: "#FFA116",

    // Brown/charcoal UI feel
    gradientFrom: "#1F1710",
    gradientTo: "#5A3510",

    // Warm orange glow
    glow: "rgba(255, 161, 22, 0.40)",

    Icon: leetcodelogo,
  },
};

export const getPlatformTheme = (platform) =>
  platformThemes[platform] || platformThemes.codeforces;
