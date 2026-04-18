export function generateBotResponse(text) {
  let lowerCaseText = text.toLowerCase();
  
  if (lowerCaseText.includes("skills") || lowerCaseText.includes("tech")) {
    return "Akash's tech stack includes HTML, CSS, Flutter, Dart, Java, C, C++, Figma, React, Next.js, and much more! He loves building sleek applications.";
  } else if (lowerCaseText.includes("contact") || lowerCaseText.includes("hire") || lowerCaseText.includes("email")) {
    return "You can reach Akash at keoteakash@gmail.com, or call +91-9307451323. He's open to opportunities!";
  } else if (lowerCaseText.includes("project")) {
    return "Akash has worked on many projects, including EcoBazaarX (a sustainable app) and robust RESTful APIs deployed on Render.";
  } else if (text === "hello" || text === "hi") {
    return "Hello there! How can I help you today?";
  }
  
  return "I'm currently running in static display mode without a backend server, so I cannot dynamically fetch responses. But Akash is a great developer!";
}
