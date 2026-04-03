import type { ToolSlug } from "@/data/tools";

export type ToolFaqItem = {
  question: string;
  answer: string;
};

export type ToolSeoContentModel = {
  whatIsTitle?: string;
  whatIs: string[];
  howToSteps: string[];
  exampleUsage: string;
  tips: string[];
  faq: ToolFaqItem[];
};

const gradient: ToolSeoContentModel = {
  whatIsTitle: "What is a CSS Gradient Generator?",
  whatIs: [
    "This CSS gradient generator helps you create linear and radial gradients visually without guessing hex codes or angle values.",
    "You can preview every change in real time and copy a clean CSS declaration when the result matches your design.",
  ],
  howToSteps: [
    "Choose linear or radial depending on whether you want a directional blend or a center-based glow.",
    "For linear gradients, adjust the angle in degrees to match the layout flow.",
    "Pick at least two colors and add more stops when you need smoother transitions.",
    "Try presets or random mode for inspiration, then fine-tune the colors.",
    "Copy the generated CSS and paste it into your stylesheet or component.",
  ],
  exampleUsage:
    "Use a soft linear gradient for hero backgrounds and call-to-action areas. Radial gradients are useful for subtle highlights behind cards or modal surfaces.",
  tips: [
    "Start with two colors and add extra stops only when needed.",
    "Check text contrast on top of gradients before shipping.",
    "Small angle changes can dramatically affect visual balance.",
    "Store reusable gradients as CSS variables for consistency.",
  ],
  faq: [
    {
      question: "What is the difference between linear and radial gradients?",
      answer:
        "Linear gradients blend colors along a straight line at a given angle. Radial gradients spread colors outward from a center point.",
    },
    {
      question: "Is the generated CSS production-ready?",
      answer:
        "Yes, it uses standard modern CSS syntax (`linear-gradient` and `radial-gradient`) supported by current browsers.",
    },
    {
      question: "Can I use the output in Tailwind or CSS-in-JS?",
      answer:
        "Yes, you can use the value in custom CSS, inline styles, Tailwind arbitrary values, or CSS-in-JS.",
    },
  ],
};

const boxShadow: ToolSeoContentModel = {
  whatIsTitle: "What is a CSS Box Shadow Generator?",
  whatIs: [
    "This box shadow generator helps you create `box-shadow` values with visual controls for offset, blur, spread, and color.",
    "It removes trial-and-error by showing live depth changes and outputting copy-ready CSS.",
  ],
  howToSteps: [
    "Select outer or inset shadow mode.",
    "Adjust horizontal and vertical offsets to define light direction.",
    "Tune blur and spread for softness and shadow size.",
    "Pick a color and set opacity for subtle or strong depth.",
    "Copy the CSS and apply it to cards, buttons, or containers.",
  ],
  exampleUsage:
    "A low-opacity outer shadow works well for elevated cards. Inset shadows can create pressed inputs or tactile UI states.",
  tips: [
    "Prefer lower opacity for more natural shadows.",
    "Keep light direction consistent across components.",
    "Avoid excessive spread on small elements.",
    "Use one clean shadow first, then layer only if needed.",
  ],
  faq: [
    {
      question: "When should I use inset shadows?",
      answer:
        "Use inset shadows when you want a surface to look pressed in or carved, such as input fields or recessed panels.",
    },
    {
      question: "What units does this tool output?",
      answer:
        "Offsets, blur, and spread are generated in pixels for predictable results.",
    },
    {
      question: "Can I animate box-shadow?",
      answer:
        "Yes, but keep animations minimal because heavy shadow transitions can impact performance on large pages.",
    },
  ],
};

const borderRadius: ToolSeoContentModel = {
  whatIsTitle: "What is a Border Radius Generator?",
  whatIs: [
    "This border radius generator lets you shape corners quickly with a visual preview and one-click CSS output.",
    "You can lock all corners together or control each corner individually for custom component shapes.",
  ],
  howToSteps: [
    "Choose linked mode for equal corner rounding.",
    "Adjust the main slider until the shape matches your design.",
    "Switch to individual mode when each corner needs a different value.",
    "Try presets for common radius patterns.",
    "Copy the generated `border-radius` CSS and paste it into your styles.",
  ],
  exampleUsage:
    "Use medium radius values for cards and buttons in modern UI. Asymmetric radius can help create tabs, speech bubbles, or directional surfaces.",
  tips: [
    "Align radius values with your spacing scale.",
    "Very high values create pill-like controls.",
    "Check how borders look at each corner value.",
    "Preview radius with real content before finalizing.",
  ],
  faq: [
    {
      question: "What is the corner order in CSS shorthand?",
      answer:
        "The order is top-left, top-right, bottom-right, bottom-left.",
    },
    {
      question: "Does this tool generate percentage radius?",
      answer:
        "This version outputs pixel values for clarity and consistent UI implementation.",
    },
    {
      question: "Why use a generator instead of manual editing?",
      answer:
        "A live preview helps you reach the right shape faster and avoids repeated trial-and-error in DevTools.",
    },
  ],
};

const colorPalette: ToolSeoContentModel = {
  whatIsTitle: "What is a Color Palette Generator?",
  whatIs: [
    "This color palette generator creates harmonious color sets from a single base color.",
    "It helps you build more consistent UI themes using monochrome, analogous, complementary, or triadic schemes.",
  ],
  howToSteps: [
    "Choose a base color from the picker or enter a hex value.",
    "Select a harmony mode that fits your visual direction.",
    "Review the generated swatches and copy individual hex values if needed.",
    "Use presets or randomize to explore alternatives quickly.",
    "Copy the CSS variable block and map it to your design tokens.",
  ],
  exampleUsage:
    "Use the generated swatches for background layers, borders, and accents in a component system. Keeping related hues improves visual consistency across pages.",
  tips: [
    "Use one dominant color and keep supporting colors softer.",
    "Always test contrast for text and icon readability.",
    "Triadic palettes work best when one color is clearly primary.",
    "CSS variables make it easier to evolve themes over time.",
  ],
  faq: [
    {
      question: "What happens if I enter an invalid hex value?",
      answer:
        "The tool falls back to a safe default so generation continues without breaking the page.",
    },
    {
      question: "Are generated palettes automatically accessible?",
      answer:
        "Not always. You should still verify contrast ratios for production text and UI states.",
    },
    {
      question: "Can I use these values in Tailwind?",
      answer:
        "Yes, you can map them to custom tokens in your Tailwind config or use them directly in CSS.",
    },
  ],
};

export const TOOL_SEO_BY_SLUG: Record<ToolSlug, ToolSeoContentModel> = {
  "gradient-generator": gradient,
  "box-shadow-generator": boxShadow,
  "border-radius-generator": borderRadius,
  "color-palette-generator": colorPalette,
};

export function getToolSeoContent(slug: ToolSlug): ToolSeoContentModel {
  return TOOL_SEO_BY_SLUG[slug];
}