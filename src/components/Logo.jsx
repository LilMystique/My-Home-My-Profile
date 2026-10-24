import lightLogo from "../assets/logo-light.png";
import darkLogo from "../assets/logo-dark.png";

// The official Capricon Technologies logo. The red wordmark stays; the word TECHNOLOGIES is
// black for light backgrounds and white for dark ones. tone="auto" follows the page theme,
// tone="dark" is for the black bands (footer, contact) that stay dark in both themes.
export default function Logo({ tone = "auto", className = "h-9", alt = "Capricon Technologies" }) {
  if (tone === "dark") {
    return <img src={darkLogo} alt={alt} className={`w-auto ${className}`} draggable="false" />;
  }
  return (
    <>
      <img src={lightLogo} alt={alt} className={`logo-l w-auto ${className}`} draggable="false" />
      <img src={darkLogo} alt="" aria-hidden="true" className={`logo-d w-auto ${className}`} draggable="false" />
    </>
  );
}
