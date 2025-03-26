// Live Chat Support Widget
document.addEventListener('DOMContentLoaded', () => {
    // Create chat widget elements
    function createChatWidget() {
        // Create the main container
        const chatWidget = document.createElement('div');
        chatWidget.id = 'chat-widget';
        chatWidget.className = 'fixed bottom-8 right-8 z-50';
        
        // Create the chat button
        const chatButton = document.createElement('button');
        chatButton.id = 'chat-button';
        chatButton.className = 'bg-ryanair-blue dark:bg-ryanair-yellow text-white dark:text-ryanair-blue rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110';
        chatButton.innerHTML = '<i class="fas fa-comments text-2xl"></i>';
        
        // Create the chat panel (initially hidden)
        const chatPanel = document.createElement('div');
        chatPanel.id = 'chat-panel';
        chatPanel.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 absolute bottom-24 right-0 overflow-hidden transform scale-0 origin-bottom-right transition-transform duration-300';
        
        // Chat panel header
        const chatHeader = document.createElement('div');
        chatHeader.className = 'bg-ryanair-blue dark:bg-ryanair-yellow text-white dark:text-ryanair-blue p-4 flex justify-between items-center';
        chatHeader.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-headset mr-2"></i>
                <span class="font-bold">Customer Support</span>
            </div>
            <button id="close-chat" class="text-white dark:text-ryanair-blue">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Chat content
        const chatContent = document.createElement('div');
        chatContent.id = 'chat-content';
        chatContent.className = 'h-64 p-4 overflow-y-auto';
        
        // Welcome message
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'chat-message support mb-3';
        welcomeMessage.innerHTML = `
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 inline-block max-w-xs">
                <p class="text-gray-800 dark:text-white">👋 नमस्ते! आप रयानएयर इंडिया के ग्राहक सहायता से जुड़े हुए हैं। मैं आपकी कैसे मदद कर सकता हूँ?</p>
            </div>
        `;
        
        // Chat input area
        const chatInputArea = document.createElement('div');
        chatInputArea.className = 'p-4 border-t dark:border-gray-700';
        chatInputArea.innerHTML = `
            <form id="chat-form" class="flex">
                <input type="text" id="chat-input" placeholder="अपना संदेश यहां लिखें..." class="flex-1 p-2 border rounded-l-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none">
                <button type="submit" class="bg-ryanair-blue dark:bg-ryanair-yellow text-white dark:text-ryanair-blue py-2 px-4 rounded-r-lg">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        `;
        
        // Assemble the chat panel
        chatPanel.appendChild(chatHeader);
        chatContent.appendChild(welcomeMessage);
        chatPanel.appendChild(chatContent);
        chatPanel.appendChild(chatInputArea);
        
        // Assemble the chat widget
        chatWidget.appendChild(chatPanel);
        chatWidget.appendChild(chatButton);
        
        // Add to the body
        document.body.appendChild(chatWidget);
        
        // Add notification dot
        const notificationDot = document.createElement('div');
        notificationDot.id = 'notification-dot';
        notificationDot.className = 'absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-pulse';
        chatButton.appendChild(notificationDot);
        
        return {
            widget: chatWidget,
            button: chatButton,
            panel: chatPanel,
            content: chatContent,
            closeButton: chatPanel.querySelector('#close-chat'),
            form: chatPanel.querySelector('#chat-form'),
            input: chatPanel.querySelector('#chat-input'),
            notificationDot: notificationDot
        };
    }
    
    // Initialize chat widget
    const chat = createChatWidget();
    
    // Toggle chat panel
    chat.button.addEventListener('click', () => {
        toggleChatPanel();
    });
    
    // Close chat panel
    chat.closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closeChatPanel();
    });
    
    // Handle chat form submission
    chat.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chat.input.value.trim();
        if (message) {
            addUserMessage(message);
            chat.input.value = '';
            
            // Simulate typing indicator
            addTypingIndicator();
            
            // Simulate response after delay
            setTimeout(() => {
                removeTypingIndicator();
                addSupportMessage(getAutoResponse(message));
            }, 1500);
        }
    });
    
    // Functions to toggle chat panel
    function toggleChatPanel() {
        if (chat.panel.classList.contains('scale-0')) {
            openChatPanel();
        } else {
            closeChatPanel();
        }
    }
    
    function openChatPanel() {
        chat.panel.classList.remove('scale-0');
        chat.panel.classList.add('scale-100');
        chat.notificationDot.style.display = 'none';
        
        // Add floating animation to chat button when open
        chat.button.classList.add('float-animation');
        
        // Scroll chat to bottom
        scrollChatToBottom();
    }
    
    function closeChatPanel() {
        chat.panel.classList.remove('scale-100');
        chat.panel.classList.add('scale-0');
        
        // Remove floating animation when closed
        chat.button.classList.remove('float-animation');
    }
    
    // Functions to handle messages
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user mb-3 text-right';
        messageDiv.innerHTML = `
            <div class="bg-ryanair-blue dark:bg-ryanair-yellow text-white dark:text-ryanair-blue rounded-lg p-3 inline-block max-w-xs">
                <p>${text}</p>
            </div>
        `;
        chat.content.appendChild(messageDiv);
        scrollChatToBottom();
        
        // Add entrance animation
        messageDiv.classList.add('animate-fade-in');
    }
    
    function addSupportMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message support mb-3';
        messageDiv.innerHTML = `
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 inline-block max-w-xs">
                <p class="text-gray-800 dark:text-white">${text}</p>
            </div>
        `;
        chat.content.appendChild(messageDiv);
        scrollChatToBottom();
        
        // Add entrance animation
        messageDiv.classList.add('animate-fade-in');
    }
    
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'chat-message support mb-3';
        typingDiv.innerHTML = `
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 inline-block">
                <div class="typing-dots flex space-x-1">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;
        chat.content.appendChild(typingDiv);
        scrollChatToBottom();
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function scrollChatToBottom() {
        chat.content.scrollTop = chat.content.scrollHeight;
    }
    
    // Auto response generation
    function getAutoResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste') || lowerMessage.includes('नमस्ते')) {
            return 'नमस्ते! मैं रयानएयर इंडिया का वर्चुअल सहायक हूँ। आप की क्या सहायता कर सकता हूँ?';
        }
        else if (lowerMessage.includes('booking') || lowerMessage.includes('book') || lowerMessage.includes('बुकिंग')) {
            return 'आप हमारी वेबसाइट पर बुकिंग कर सकते हैं। कृपया फ्लाइट सर्च पेज पर जाएँ और अपने यात्रा विवरण दर्ज करें।';
        }
        else if (lowerMessage.includes('cancel') || lowerMessage.includes('रद्द')) {
            return 'बुकिंग रद्द करने के लिए, कृपया अपने बुकिंग पेज पर जाएँ और वहां से रद्दीकरण का विकल्प चुनें।';
        }
        else if (lowerMessage.includes('baggage') || lowerMessage.includes('सामान') || lowerMessage.includes('luggage')) {
            return 'हमारे बैगेज अलाउंस के बारे में जानकारी के लिए, कृपया हमारे बैगेज कैलकुलेटर का उपयोग करें।';
        }
        else if (lowerMessage.includes('refund') || lowerMessage.includes('वापसी')) {
            return 'रिफंड के लिए, कृपया अपनी बुकिंग आईडी के साथ हमारे रिफंड पोर्टल पर जाएँ। रिफंड प्रोसेस होने में 7-14 दिन लग सकते हैं।';
        }
        else if (lowerMessage.includes('thank') || lowerMessage.includes('धन्यवाद')) {
            return 'आपका स्वागत है! कोई और प्रश्न हो तो पूछने में संकोच न करें।';
        }
        else {
            return 'मुझे आपका प्रश्न समझ नहीं आया। क्या आप अपना प्रश्न दूसरे तरीके से पूछ सकते हैं या किसी अन्य सहायता की आवश्यकता है?';
        }
    }
    
    // Add chat button animation
    function animateChatButton() {
        setTimeout(() => {
            chat.button.classList.add('pulse-animation');
            chat.notificationDot.style.display = 'block';
        }, 3000);
    }
    
    // Initialize button animation
    animateChatButton();
    
    // Add CSS for typing indicator
    const style = document.createElement('style');
    style.textContent = `
        .typing-dots {
            display: flex;
        }
        
        .typing-dots .dot {
            width: 8px;
            height: 8px;
            background-color: #073590;
            border-radius: 50%;
            margin: 0 2px;
            animation: typing-dot 1.4s infinite ease-in-out both;
        }
        
        .dark .typing-dots .dot {
            background-color: #FFD700;
        }
        
        .typing-dots .dot:nth-child(1) {
            animation-delay: -0.32s;
        }
        
        .typing-dots .dot:nth-child(2) {
            animation-delay: -0.16s;
        }
        
        @keyframes typing-dot {
            0%, 80%, 100% { 
                transform: scale(0);
            } 
            40% { 
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}); 