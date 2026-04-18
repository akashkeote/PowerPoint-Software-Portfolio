import { generateBotResponse } from './chat.logic.js';

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
      
      botMsg.textContent = generateBotResponse(text);
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  });
}