export function scrollToSection(selector: string): boolean {
  // If it's not a hash link, return false
  if (!selector.startsWith("#")) return false

  // Remove the # to get the element id
  const id = selector.substring(1)

  // If the id is empty, it's just a link to the top of the page
  if (id === "") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return true
  }

  // Try to find the element
  const element = document.getElementById(id)

  // If the element exists, scroll to it
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
    return true
  }

  return false
}
