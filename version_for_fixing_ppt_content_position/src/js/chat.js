    // AI CHATBOT LOGIC
    const chatBtn = document.getElementById('open-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatWindow = document.getElementById('ai-chatbot-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatBtn && chatWindow && closeChatBtn) {
      chatBtn.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        chatInput.focus();
      });
      closeChatBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
      });

      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        // User message
        const userMsg = document.createElement('div');
        userMsg.style.cssText = 'align-self: flex-end; background: #6366f1; padding: 12px 16px; border-radius: 16px; border-bottom-right-radius: 4px; color: #fff; font-size: 13px; max-width: 85%; font-weight: 500; font-family: "Poppins", sans-serif;';
        userMsg.textContent = text;
        chatMessages.appendChild(userMsg);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate typing
        const typingIndicator = document.createElement('div');
        typingIndicator.style.cssText = 'align-self: flex-start; color: #999; font-size: 11px; margin-top: 5px; font-style: italic;';
        typingIndicator.textContent = 'Typing...';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Bot response mock
        setTimeout(() => {
          chatMessages.removeChild(typingIndicator);
          const botMsg = document.createElement('div');
          botMsg.style.cssText = 'align-self: flex-start; background: rgba(99,102,241,0.1); padding: 12px 16px; border-radius: 16px; border-bottom-left-radius: 4px; color: #232946; font-size: 13px; max-width: 85%; font-family: "Poppins", sans-serif;';
          
          let response = "I'm currently running in static display mode without a backend server, so I cannot dynamically fetch responses. But Akash is a great developer!";
          let lowerCaseText = text.toLowerCase();
          
          if (lowerCaseText.includes("skills") || lowerCaseText.includes("tech")) {
            response = "Akash's tech stack includes HTML, CSS, Flutter, Dart, Java, C, C++, Figma, React, Next.js, and much more! He loves building sleek applications.";
          } else if (lowerCaseText.includes("contact") || lowerCaseText.includes("hire") || lowerCaseText.includes("email")) {
            response = "You can reach Akash at keoteakash@gmail.com, or call +91-9307451323. He's open to opportunities!";
          } else if (lowerCaseText.includes("project")) {
            response = "Akash has worked on many projects, including EcoBazaarX (a sustainable app) and robust RESTful APIs deployed on Render.";
          } else if (text === "hello" || text === "hi") {
            response = "Hello there! How can I help you today?";
          }
          
          botMsg.textContent = response;
          chatMessages.appendChild(botMsg);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 800);
      });
    }
