// This script prevents dark mode flashing on initial load
function setColorModeScript() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.getItem("chakra-ui-color-mode") === "dark"
    || (!("chakra-ui-color-mode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export default setColorModeScript;
