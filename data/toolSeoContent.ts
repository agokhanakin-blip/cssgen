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

const textShadow: ToolSeoContentModel = {
  whatIsTitle: "What is a Text Shadow Generator?",
  whatIs: [
    "This tool helps you build clean CSS text-shadow values with visual controls.",
    "You can preview how offset, blur, color, and opacity affect readability before copying code.",
  ],
  howToSteps: [
    "Set horizontal and vertical offsets to place the shadow.",
    "Increase blur for a softer glow or keep it low for crisp depth.",
    "Choose a shadow color and adjust opacity for subtle contrast.",
    "Try a preset or random option to speed up exploration.",
    "Copy the final CSS and apply it to headings or hero text.",
  ],
  exampleUsage:
    "A light text shadow can improve heading readability on gradient backgrounds. You can also create stronger decorative effects for banners and badges.",
  tips: [
    "Keep blur and opacity moderate for body text readability.",
    "Use larger blur only for large headings.",
    "Dark shadows usually work best on light backgrounds.",
    "Test across desktop and mobile where font rendering differs.",
  ],
  faq: [
    {
      question: "Does text-shadow impact performance?",
      answer:
        "A single shadow is lightweight for most pages. Avoid excessive layered effects on many large text nodes.",
    },
    {
      question: "Can I use this for dark mode too?",
      answer:
        "Yes. You can use lighter shadow colors in dark mode to create subtle glow effects.",
    },
    {
      question: "What unit does the generator output?",
      answer: "It outputs pixel values for offset and blur.",
    },
  ],
};

const clamp: ToolSeoContentModel = {
  whatIsTitle: "What is a Clamp Generator?",
  whatIs: [
    "This tool creates CSS clamp() expressions for fluid typography.",
    "It helps you scale text smoothly between viewport widths without many media queries.",
  ],
  howToSteps: [
    "Choose minimum and maximum font sizes in pixels.",
    "Set the minimum and maximum viewport widths where scaling should occur.",
    "Review the generated clamp() expression in the output box.",
    "Resize your browser to check how text behaves responsively.",
    "Copy and paste the CSS value into your styles.",
  ],
  exampleUsage:
    "Use clamp() for section titles so they stay readable on mobile and feel proportional on desktop.",
  tips: [
    "Use realistic viewport bounds based on your layout breakpoints.",
    "Keep min and max sizes close enough to avoid dramatic jumps.",
    "Store reusable clamp values in CSS variables.",
    "Pair fluid headings with stable body text for balance.",
  ],
  faq: [
    {
      question: "Do I still need media queries?",
      answer:
        "Often fewer. clamp() handles many typography transitions, though layout changes may still need breakpoints.",
    },
    {
      question: "Can I use clamp() for spacing too?",
      answer:
        "Yes, clamp() also works for margins, padding, and other size-based properties.",
    },
    {
      question: "Is clamp() broadly supported?",
      answer:
        "Yes, clamp() is supported in modern browsers used in production front-end workflows.",
    },
  ],
};

const transition: ToolSeoContentModel = {
  whatIsTitle: "What is a Transition Generator?",
  whatIs: [
    "This generator builds CSS transition declarations for common UI interactions.",
    "You can configure property, duration, timing function, and delay, then test behavior in a live preview.",
  ],
  howToSteps: [
    "Pick which property should animate (or choose all).",
    "Set duration in milliseconds.",
    "Choose a timing function such as ease-in-out or linear.",
    "Add optional delay when needed.",
    "Copy the final transition value and apply it to interactive components.",
  ],
  exampleUsage:
    "Use a 200-300ms ease transition for button hover states to make interfaces feel smoother without being distracting.",
  tips: [
    "Prefer short durations for micro-interactions.",
    "Use consistent easing across your design system.",
    "Avoid animating too many heavy properties at once.",
    "Test reduced-motion alternatives for accessibility.",
  ],
  faq: [
    {
      question: "What properties are best for transitions?",
      answer:
        "Opacity and transform usually perform well and feel smooth for UI interactions.",
    },
    {
      question: "Should I animate all properties?",
      answer:
        "Usually no. Targeting specific properties gives more predictable and maintainable results.",
    },
    {
      question: "Can I combine multiple transitions?",
      answer:
        "Yes, in raw CSS you can add comma-separated transitions for different properties.",
    },
  ],
};

const transform: ToolSeoContentModel = {
  whatIsTitle: "What is a Transform Generator?",
  whatIs: [
    "This tool helps you compose CSS transform values like translate, rotate, scale, and skew.",
    "It is useful for hover effects, motion states, and visual alignment adjustments.",
  ],
  howToSteps: [
    "Adjust translation to move the element on X and Y axes.",
    "Set rotation for directional tilt.",
    "Change scale to enlarge or shrink the element.",
    "Use skew for angled effects when appropriate.",
    "Copy the generated transform declaration and apply it to your component.",
  ],
  exampleUsage:
    "A slight scale and translate transform can make cards feel interactive on hover while keeping layout stable.",
  tips: [
    "Use small values first; subtle transforms often look more polished.",
    "Combine transform with transition for smoother interactions.",
    "Keep transform direction consistent with user expectations.",
    "Test transform behavior on touch devices where hover differs.",
  ],
  faq: [
    {
      question: "Does transform affect document flow?",
      answer:
        "Transforms do not change layout flow dimensions; they affect rendering position and appearance.",
    },
    {
      question: "Can I chain multiple transform functions?",
      answer:
        "Yes, transform supports multiple functions in one declaration, in order.",
    },
    {
      question: "Why is order important in transform?",
      answer:
        "Transform functions are applied in sequence, so changing order can produce different visual results.",
    },
  ],
};

const colorConverter: ToolSeoContentModel = {
  whatIsTitle: "What is a Color Converter?",
  whatIs: [
    "This tool converts colors between HEX, RGB, and HSL formats.",
    "It also provides a quick complementary color preview and CSS variable output for design systems.",
  ],
  howToSteps: [
    "Enter or pick a base HEX color.",
    "Review the converted RGB and HSL values.",
    "Copy individual color formats as needed.",
    "Copy the generated CSS variable block for reuse.",
    "Use random color mode to explore alternatives quickly.",
  ],
  exampleUsage:
    "When moving from design files to code, convert provided HEX values to HSL for easier theming and shade adjustments.",
  tips: [
    "Use HSL when you need easier control over lightness and saturation.",
    "Store final colors as tokens or CSS variables for consistency.",
    "Verify contrast when switching between formats.",
    "Keep naming conventions consistent across themes.",
  ],
  faq: [
    {
      question: "Which format should I use in production CSS?",
      answer:
        "All are valid. Choose based on team preference and whether you need easy channel adjustments (HSL) or direct design parity (HEX).",
    },
    {
      question: "Is conversion exact?",
      answer:
        "Yes for standard 8-bit RGB/HEX conversions. HSL values may be rounded for readability.",
    },
    {
      question: "Can I use generated values in Tailwind config?",
      answer:
        "Yes, you can map HEX, RGB, or HSL values to semantic tokens in your Tailwind theme setup.",
    },
  ],
};

const imageResizerRounder: ToolSeoContentModel = {
  whatIsTitle: "What is an Image Resizer & Round Corners Tool?",
  whatIs: [
    "This tool lets you upload an image, resize it online, round its corners, and download the final output.",
    "It is useful for preparing avatars, card thumbnails, and hero graphics without opening heavy desktop software.",
  ],
  howToSteps: [
    "Upload an image file from your device.",
    "Set output width and height, and optionally keep aspect ratio locked.",
    "Adjust corner radius to create rounded edges.",
    "Pick output format and quality.",
    "Process and download the image.",
  ],
  exampleUsage:
    "Resize a product thumbnail to fixed dimensions and apply a 16px radius so it matches your card component style.",
  tips: [
    "Use WEBP for smaller file size when browser support is acceptable.",
    "Keep radius proportional to image size for balanced visuals.",
    "Avoid extreme upscaling to preserve sharpness.",
    "Use consistent output dimensions for UI grids.",
  ],
  faq: [
    {
      question: "Is image processing done online or locally?",
      answer:
        "In this tool flow, processing runs in your browser using canvas before download.",
    },
    {
      question: "Can I keep original aspect ratio?",
      answer: "Yes, enable the aspect-ratio lock before resizing.",
    },
    {
      question: "Which formats are supported?",
      answer: "PNG, JPG, and WEBP output are available.",
    },
  ],
};

const cssUnitConverter: ToolSeoContentModel = {
  whatIsTitle: "What is a CSS Unit Converter?",
  whatIs: [
    "This tool converts px values into rem, em, and percentages using your base font size.",
    "It helps standardize scalable typography and spacing in responsive front-end systems.",
  ],
  howToSteps: [
    "Enter your source pixel value.",
    "Set the base font size used in your project.",
    "Read rem, em, and percent equivalents.",
    "Copy the result you need into your CSS.",
  ],
  exampleUsage:
    "Convert 24px heading size into rem to align with a root font-size based design system.",
  tips: [
    "Keep one base font-size across the project for consistency.",
    "Use rem for typography tokens.",
    "Use percentages when adapting relative sizing contexts.",
    "Document converted values in your style guide.",
  ],
  faq: [
    {
      question: "What base size should I use?",
      answer: "Most projects start with 16px, but use your own root setup if different.",
    },
    {
      question: "Are rem and em always the same?",
      answer: "They match only when parent font-size equals root font-size.",
    },
    {
      question: "Can I use this for spacing too?",
      answer: "Yes, the same conversion logic applies to padding and margin values.",
    },
  ],
};

const metaTagGenerator: ToolSeoContentModel = {
  whatIsTitle: "What is a Meta Tag Generator?",
  whatIs: [
    "This tool helps create SEO-ready title, meta description, and Open Graph tags.",
    "It gives a quick snippet preview so you can improve metadata consistency across pages.",
  ],
  howToSteps: [
    "Write your page title and description.",
    "Enter canonical page URL.",
    "Review search-style preview text.",
    "Copy generated HTML meta tags into your head configuration.",
  ],
  exampleUsage:
    "Generate metadata for a new landing page and keep both standard and OG tags aligned.",
  tips: [
    "Keep titles concise and descriptive.",
    "Write unique descriptions per page intent.",
    "Avoid duplicate metadata across tool pages.",
    "Match OG tags with on-page H1 context.",
  ],
  faq: [
    {
      question: "Do I still need canonical tags?",
      answer: "Yes, canonical links help search engines understand preferred URLs.",
    },
    {
      question: "Should OG description match meta description?",
      answer: "They can match, but tailored social copy may improve click-through.",
    },
    {
      question: "Can this replace full SEO strategy?",
      answer: "No, it helps with on-page metadata only; content and internal linking still matter.",
    },
  ],
};

const robotsTxtGenerator: ToolSeoContentModel = {
  whatIsTitle: "What is a Robots.txt Generator?",
  whatIs: [
    "This tool builds robots.txt rules for crawler access control and sitemap declaration.",
    "It helps webmasters publish clean crawl directives quickly without syntax mistakes.",
  ],
  howToSteps: [
    "Choose whether public crawling is allowed.",
    "Set optional disallowed path patterns.",
    "Add your sitemap URL.",
    "Copy generated robots.txt content.",
  ],
  exampleUsage:
    "Allow global crawling while blocking a private admin area and referencing your sitemap.xml endpoint.",
  tips: [
    "Do not block important public pages by accident.",
    "Always include a sitemap URL for discovery.",
    "Use robots for crawl hints, not security.",
    "Re-check directives after route changes.",
  ],
  faq: [
    {
      question: "Does robots.txt hide private data?",
      answer: "No, it is only a crawler directive and not an access-control mechanism.",
    },
    {
      question: "Can I block one bot and allow others?",
      answer: "Yes, robots syntax supports per user-agent rules.",
    },
    {
      question: "Do all bots obey robots.txt?",
      answer: "Reputable bots generally do, but malicious scrapers may ignore it.",
    },
  ],
};

const base64ImageConverter: ToolSeoContentModel = {
  whatIsTitle: "What is a Base64 Image Converter?",
  whatIs: [
    "This tool converts uploaded images to Base64 data URLs.",
    "It is useful for inline assets in prototypes, email templates, and small icon embedding workflows.",
  ],
  howToSteps: [
    "Upload an image file.",
    "Wait for conversion to Base64 data URL.",
    "Preview the result in-browser.",
    "Copy the generated string for use in CSS or HTML.",
  ],
  exampleUsage:
    "Embed a tiny icon directly inside CSS as a data URL for a rapid prototype.",
  tips: [
    "Use Base64 mainly for small files to avoid large payloads.",
    "Prefer external files for larger production images.",
    "Compress before conversion when possible.",
    "Keep long strings out of manually edited source files when maintainability matters.",
  ],
  faq: [
    {
      question: "Is Base64 always faster?",
      answer:
        "Not always; it can increase payload size. It is best for small assets or special inline cases.",
    },
    {
      question: "Can I convert any image type?",
      answer: "Most browser-supported image formats can be converted through file upload.",
    },
    {
      question: "Where can I use Data URLs?",
      answer: "In CSS backgrounds, HTML image src, and other contexts supporting URL strings.",
    },
  ],
};

const filterGenerator: ToolSeoContentModel = {
  whatIsTitle: "What is a CSS Filter Generator?",
  whatIs: [
    "This tool helps you compose CSS filter values with visual controls.",
    "You can adjust blur, brightness, contrast, saturation, and hue rotation in real time.",
  ],
  howToSteps: [
    "Tune each filter slider to get the desired effect.",
    "Use preview to evaluate visual quality.",
    "Reset when needed and compare styles.",
    "Copy the generated filter CSS value.",
  ],
  exampleUsage:
    "Use subtle contrast and saturation adjustments to harmonize thumbnails across a marketing grid.",
  tips: [
    "Avoid stacking extreme values to keep assets natural.",
    "Use minimal blur for better readability.",
    "Test filters on multiple display types.",
    "Keep effect levels consistent for visual rhythm.",
  ],
  faq: [
    {
      question: "Can I animate CSS filters?",
      answer: "Yes, filters can be animated with transitions, but test performance on lower-end devices.",
    },
    {
      question: "Does filter affect layout?",
      answer: "No, filter changes rendering, not layout flow.",
    },
    {
      question: "Can I combine multiple filter functions?",
      answer: "Yes, filter accepts multiple chained functions in one declaration.",
    },
  ],
};

const flexboxGenerator: ToolSeoContentModel = {
  whatIsTitle: "What is a Flexbox Generator?",
  whatIs: [
    "This tool builds flex container CSS settings for alignment and spacing.",
    "It helps you configure direction, justify-content, align-items, gap, and wrapping quickly.",
  ],
  howToSteps: [
    "Choose direction based on horizontal or vertical layout.",
    "Set justify-content for main-axis distribution.",
    "Set align-items for cross-axis alignment.",
    "Adjust gap and wrapping behavior.",
    "Copy generated CSS into your component.",
  ],
  exampleUsage:
    "Create a toolbar layout with centered alignment, balanced spacing, and responsive wrapping.",
  tips: [
    "Use gap instead of margins for cleaner spacing logic.",
    "Start with center alignment, then fine-tune edge cases.",
    "Use wrap for dynamic content lengths.",
    "Keep alignment patterns consistent across components.",
  ],
  faq: [
    {
      question: "When should I use flexbox instead of grid?",
      answer: "Use flexbox for one-dimensional alignment and distribution.",
    },
    {
      question: "Does gap work with flexbox now?",
      answer: "Yes, modern browsers support gap for flex layouts.",
    },
    {
      question: "Can I mix flex and grid?",
      answer: "Yes, many UIs use both depending on section requirements.",
    },
  ],
};

const gridTemplateGenerator: ToolSeoContentModel = {
  whatIsTitle: "What is a Grid Template Generator?",
  whatIs: [
    "This tool helps define CSS grid-template columns and rows visually.",
    "It is useful for dashboard layouts, card matrices, and structured content sections.",
  ],
  howToSteps: [
    "Enter grid-template-columns values such as `1fr 1fr 1fr`.",
    "Set row definitions for your section needs.",
    "Adjust gap size between grid items.",
    "Review the live preview and copy CSS output.",
  ],
  exampleUsage:
    "Build a 3-column card layout with consistent row sizing and spacing.",
  tips: [
    "Use fr units for flexible responsive columns.",
    "Keep gaps consistent with your spacing scale.",
    "Start simple, then add advanced named areas if needed.",
    "Avoid over-complex templates for maintainability.",
  ],
  faq: [
    {
      question: "Can this generate named areas?",
      answer: "This version focuses on template columns/rows and gap values.",
    },
    {
      question: "Is grid good for responsive design?",
      answer: "Yes, grid is powerful for structured responsive layouts.",
    },
    {
      question: "Can I combine with media queries?",
      answer: "Yes, media queries are commonly used to swap grid templates by breakpoint.",
    },
  ],
};

const aspectRatioGenerator: ToolSeoContentModel = {
  whatIsTitle: "What is an Aspect Ratio Generator?",
  whatIs: [
    "This tool generates CSS aspect-ratio values from width and height units.",
    "It also provides a padding-top fallback for older layout patterns.",
  ],
  howToSteps: [
    "Enter width and height ratio values.",
    "Check the live box preview.",
    "Copy aspect-ratio output.",
    "Use padding fallback when needed.",
  ],
  exampleUsage:
    "Create 16:9 media containers for video cards that stay proportional across breakpoints.",
  tips: [
    "Match ratios to real media assets for less cropping.",
    "Use consistent ratios in content grids.",
    "Prefer native aspect-ratio in modern browsers.",
    "Keep fallback only where project support requires it.",
  ],
  faq: [
    {
      question: "Do I still need padding hacks?",
      answer: "Mostly no for modern browsers, but fallback can help legacy scenarios.",
    },
    {
      question: "Can aspect-ratio be used on images?",
      answer: "Yes, it works on block elements including wrappers and media containers.",
    },
    {
      question: "What happens when content overflows?",
      answer: "Normal overflow rules apply; you may need object-fit or overflow controls.",
    },
  ],
};

const imageCropTool: ToolSeoContentModel = {
  whatIsTitle: "What is an Image Crop Tool?",
  whatIs: [
    "This tool crops uploaded images directly in the browser and exports a clean result.",
    "It is useful for profile photos, banners, and product shots using a draggable crop rectangle.",
  ],
  howToSteps: [
    "Upload an image file.",
    "Drag inside the highlighted region to move it, or drag the corner handles to resize.",
    "Optionally fine-tune X, Y, width, and height in the number fields.",
    "Click Crop, then download the PNG result.",
  ],
  exampleUsage:
    "Crop a large photo to a banner slice, avatar, or product shot with precise rectangle selection.",
  tips: [
    "Use high-resolution source images for better final quality.",
    "Use Full image if you want to reset the marquee to the entire picture.",
    "The output matches your selected width and height in pixels (any aspect ratio).",
    "Preview the result below before downloading.",
  ],
  faq: [
    {
      question: "Does the crop happen locally?",
      answer: "Yes, cropping is performed in-browser using canvas APIs.",
    },
    {
      question: "Can I export transparent PNG?",
      answer: "Yes, PNG output keeps transparency when available in source.",
    },
    {
      question: "Is this good for bulk editing?",
      answer: "This version focuses on single-image processing per run.",
    },
  ],
};

const imageConverter: ToolSeoContentModel = {
  whatIsTitle: "What is an Image Converter?",
  whatIs: [
    "This image converter changes uploaded JPG, PNG, and WEBP files into another image format in your browser.",
    "It is useful when a platform requires a specific format or when you need smaller files for faster loading.",
  ],
  howToSteps: [
    "Upload an image from your device.",
    "Choose output format: PNG, JPG, or WEBP.",
    "Adjust quality if you selected JPG or WEBP.",
    "Click Convert, then download the new file.",
  ],
  exampleUsage:
    "Convert a PNG screenshot to WEBP for web delivery, or switch WEBP to JPG for compatibility with older tools.",
  tips: [
    "Use PNG when you need lossless quality or transparency.",
    "Use JPG for photos when file size matters.",
    "Use WEBP for a strong quality-size balance on modern websites.",
    "Start with quality around 80-90 for web use and compare results visually.",
  ],
  faq: [
    {
      question: "Does conversion happen on the server?",
      answer: "No, conversion is done locally in your browser for faster and private processing.",
    },
    {
      question: "Will image quality change after conversion?",
      answer:
        "Quality can change depending on output format and quality settings, especially with JPG and WEBP.",
    },
    {
      question: "Can I batch convert multiple files?",
      answer: "This version focuses on one file at a time for better reliability on all devices.",
    },
  ],
};

const svgGenerator: ToolSeoContentModel = {
  whatIsTitle: "What is an SVG Generator?",
  whatIs: [
    "This tool creates editable SVG markup with live preview.",
    "It helps designers and developers generate lightweight vector assets quickly.",
  ],
  howToSteps: [
    "Set SVG width and height.",
    "Adjust shape radius, fill, stroke, and stroke width.",
    "Preview rendered result.",
    "Copy SVG code or download file.",
  ],
  exampleUsage:
    "Generate a rounded rectangle SVG badge and reuse it across marketing sections.",
  tips: [
    "Use SVG for scalable UI icons and decorative elements.",
    "Keep path complexity low for maintainability.",
    "Store reusable SVG snippets in component libraries.",
    "Use semantic naming for downloaded assets.",
  ],
  faq: [
    {
      question: "Can I edit exported SVG later?",
      answer: "Yes, SVG output is plain text and fully editable.",
    },
    {
      question: "Is SVG better than PNG for icons?",
      answer: "Usually yes, because SVG scales without quality loss.",
    },
    {
      question: "Can I inline SVG in HTML?",
      answer: "Yes, inline SVG works well for styling and interaction.",
    },
  ],
};

const faviconGenerator: ToolSeoContentModel = {
  whatIsTitle: "What is a Favicon Generator?",
  whatIs: [
    "This tool generates common favicon sizes from one uploaded image.",
    "It also provides HTML link tags you can copy into your website head.",
  ],
  howToSteps: [
    "Upload a source image (preferably square).",
    "Download required favicon PNG sizes.",
    "Copy generated HTML snippet.",
    "Place files in your public assets and update paths if needed.",
  ],
  exampleUsage:
    "Create 16x16, 32x32, and 180x180 icons for browser tabs and touch devices.",
  tips: [
    "Start with at least 512x512 source to keep small outputs crisp.",
    "Use high-contrast shapes for recognizability in tiny sizes.",
    "Test favicon visibility on light and dark browser themes.",
    "Keep filename conventions consistent for deployment.",
  ],
  faq: [
    {
      question: "Do I need all favicon sizes?",
      answer: "Core sizes are recommended for cross-platform compatibility.",
    },
    {
      question: "Can I use PNG only?",
      answer: "Yes, many modern setups work well with PNG favicon assets.",
    },
    {
      question: "Where should favicon files be placed?",
      answer: "Typically in your public root so referenced paths resolve correctly.",
    },
  ],
};

const logoGenerator: ToolSeoContentModel = {
  whatIsTitle: "What is a Logo Generator?",
  whatIs: [
    "This tool creates simple brand logos by combining icon, text, layout, and color controls.",
    "You can export clean SVG for scalability and PNG for quick sharing.",
  ],
  howToSteps: [
    "Enter brand name and optional tagline (toggle visibility if you want a wordmark only).",
    "Choose icon, layout, and typography (system, serif, mono, or display).",
    "Tune corner radius, type sizes, letter spacing, and icon scale in Style tuning.",
    "Try presets for quick palettes, then adjust colors and export dimensions.",
    "Copy SVG, or download SVG or PNG when you are satisfied.",
  ],
  exampleUsage:
    "Generate a startup MVP logo for landing pages, social headers, and product mockups.",
  tips: [
    "Keep contrast high between text and background; use transparent background for dark UI chrome.",
    "Use shorter brand names for better visual balance on small icons.",
    "Export SVG for production scalability; PNG is best for quick shares or raster-only contexts.",
    "Letter spacing and icon scale help tighten premium wordmarks versus playful marks.",
  ],
  faq: [
    {
      question: "Which format is better, SVG or PNG?",
      answer: "Use SVG for scalable production assets and PNG for fixed-size previews.",
    },
    {
      question: "Can I edit exported SVG later?",
      answer: "Yes, exported SVG remains editable text markup.",
    },
    {
      question: "Is this a full AI logo generator?",
      answer: "This version is a fast manual builder focused on practical web logo outputs.",
    },
  ],
};

export const TOOL_SEO_BY_SLUG: Record<ToolSlug, ToolSeoContentModel> = {
  "gradient-generator": gradient,
  "box-shadow-generator": boxShadow,
  "border-radius-generator": borderRadius,
  "color-palette-generator": colorPalette,
  "text-shadow-generator": textShadow,
  "clamp-generator": clamp,
  "transition-generator": transition,
  "transform-generator": transform,
  "color-converter": colorConverter,
  "image-resizer-rounder": imageResizerRounder,
  "css-unit-converter": cssUnitConverter,
  "meta-tag-generator": metaTagGenerator,
  "robots-txt-generator": robotsTxtGenerator,
  "base64-image-converter": base64ImageConverter,
  "filter-generator": filterGenerator,
  "flexbox-generator": flexboxGenerator,
  "grid-template-generator": gridTemplateGenerator,
  "aspect-ratio-generator": aspectRatioGenerator,
  "image-crop-tool": imageCropTool,
  "image-converter": imageConverter,
  "svg-generator": svgGenerator,
  "favicon-generator": faviconGenerator,
  "logo-generator": logoGenerator,
};

export function getToolSeoContent(slug: ToolSlug): ToolSeoContentModel {
  return TOOL_SEO_BY_SLUG[slug];
}