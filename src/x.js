import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAYUXS6nTsC8YBD5yBjob9VSE55Mb3XLvw");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const chat = model.startChat({
  history: [
    { role: "user", parts: [{ text: "Hello" }] },
    { 
      role: "model", 
      parts: [{ text: "You are a medical chatbot which answers medical questions with medicines . For Marathi users, you must respond in Marathi language using Devanagari script. For Hindi users, respond in Hindi. For English users, respond in English. Do not give punctuation marks return text." }] 
    },
  ],
});

const CameraComponent = ({ chatInput, setChatInput, layout,setRes }) => {
    const [chatResponse, setChatResponse] = useState("");
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
    const [isVoiceChat, setIsVoiceChat] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [voices, setVoices] = useState([]);
    const [currentVoice, setCurrentVoice] = useState(null);

    // Enhanced voice loading with retry mechanism
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            
            // Try to set initial voice for the current layout
            const langCode = getLanguageCode();
            const voice = selectVoice(langCode);
            setCurrentVoice(voice);
        };

        // Initial load
        loadVoices();

        // Setup event listener for voice loading
        window.speechSynthesis.onvoiceschanged = loadVoices;

        // Retry mechanism for voice loading
        const retryInterval = setInterval(() => {
            if (voices.length === 0) {
                loadVoices();
            }
        }, 1000);

        return () => {
            clearInterval(retryInterval);
        };
    }, [layout]);

    const handleChatSubmit = async () => {
        if (!chatInput.trim()) return;

        try {
            let prompt = chatInput;
            if (layout === 'marathi') {
                prompt = `Please respond in Marathi language using Devanagari script. Question: ${chatInput}. Do not give punctuation marks return plain tex medical questions with medicinest`;
            } else if (layout === 'hindi') {
                prompt = `Please respond in Hindi language using Devanagari script. Question: ${chatInput}. Do not give punctuation marks return plain text medical questions with medicines `;
            }

            const response = await chat.sendMessage(prompt);
            const responseText = response.response.text();
            // setChatResponse(responseText);
            setRes(responseText)

            if (isSpeechEnabled) {
                await speakResponse(responseText);
            }
        } catch (error) {
            console.error("Error in chat:", error);
            setChatResponse("Error in chat.");
        }
    };

    const getLanguageCode = () => {
        switch (layout) {
            case 'hindi':
                return "hi-IN";
            case 'marathi':
                return "mr-IN";
            default:
                return "en-IN";
        }
    };

    // Enhanced voice selection logic
    const selectVoice = (lang) => {
        const exactMatch = voices.find(v => v.lang === lang);
        if (exactMatch) return exactMatch;

        // Try finding a voice that starts with the language code
        const langPrefix = voices.find(v => v.lang.startsWith(lang.split("-")[0]));
        if (langPrefix) return langPrefix;

        // For Marathi, try Hindi voice as fallback
        if (lang === "mr-IN") {
            const hindiVoice = voices.find(v => v.lang === "hi-IN");
            if (hindiVoice) return hindiVoice;
        }

        // Try any Indian voice
        const indianVoice = voices.find(v => v.lang.includes("IN"));
        if (indianVoice) return indianVoice;

        // Final fallback
        return voices[0];
    };

    // Enhanced speech synthesis with chunking for long texts
    const speakResponse = async (text) => {
        return new Promise((resolve) => {
            const synth = window.speechSynthesis;
            synth.cancel();

            // Split text into smaller chunks for better handling
            const chunks = text.match(/[^।?!.]+[।?!.]+/g) || [text];

            let currentChunk = 0;
            const speakChunk = () => {
                if (currentChunk < chunks.length) {
                    const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);
                    const langCode = getLanguageCode();
                    utterance.lang = langCode;
                    
                    // Use selected voice
                    if (currentVoice) {
                        utterance.voice = currentVoice;
                    }

                    // Optimize speech parameters for Marathi
                    if (layout === 'marathi') {
                        utterance.rate = 0.85;  // Slower rate for better clarity
                        utterance.pitch = 1.1;  // Slightly higher pitch
                    } else {
                        utterance.rate = 0.9;
                        utterance.pitch = 1;
                    }

                    utterance.onend = () => {
                        currentChunk++;
                        speakChunk();
                    };

                    synth.speak(utterance);
                } else {
                    resolve();
                }
            };

            speakChunk();
        });
    };

    const toggleVoiceChat = () => {
        setIsVoiceChat(prev => !prev);
        if (!isVoiceChat) {
            startVoiceRecognition();
        } else {
            stopVoiceRecognition();
        }
    };

    const startVoiceRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        
        recognitionInstance.lang = getLanguageCode();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.maxAlternatives = 1;

        recognitionInstance.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setChatInput(spokenText);
            handleChatSubmit();
        };

        recognitionInstance.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            // Retry on error
            setTimeout(() => {
                if (isVoiceChat) {
                    startVoiceRecognition();
                }
            }, 1000);
        };

        recognitionInstance.onend = () => {
            if (isVoiceChat) {
                startVoiceRecognition();
            }
        };

        recognitionInstance.start();
        setRecognition(recognitionInstance);
    };

    const stopVoiceRecognition = () => {
        if (recognition) {
            recognition.stop();
            setRecognition(null);
        }
        window.speechSynthesis.cancel();
    };

    useEffect(() => {
        return () => {
            if (recognition) {
                recognition.stop();
            }
            window.speechSynthesis.cancel();
        };
    }, [recognition, layout]);

    return (
        <div className="p-4">
            <div className="space-y-4">
                <h3 className="text-xl font-bold">
                    {layout === 'marathi' ? 'वैद्यकीय सल्लागार सोबत संवाद' : 
                     layout === 'hindi' ? 'चिकित्सा सलाहकार के साथ चैट' : 
                     'Chat with Financial Advisor'}
                </h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={layout === 'marathi' ? 'प्रश्न विचारा...' : 
                                   layout === 'hindi' ? 'प्रश्न पूछें...' : 
                                   'Ask a question...'}
                        className="flex-1 p-2 border rounded"
                    />
                    <button 
                        onClick={handleChatSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {layout === 'marathi' ? 'पाठवा' : 
                         layout === 'hindi' ? 'भेजें' : 
                         'Send'}
                    </button>
                    <button 
                        onClick={toggleVoiceChat}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        {isVoiceChat ? 
                            (layout === 'marathi' ? 'व्हॉइस चॅट थांबवा' : 
                             layout === 'hindi' ? 'वॉइस चैट बंद करें' : 
                             'Stop Voice Chat') : 
                            (layout === 'marathi' ? 'व्हॉइस चॅट सुरू करा' : 
                             layout === 'hindi' ? 'वॉइस चैट शुरू करें' : 
                             'Start Voice Chat')}
                    </button>
                </div>
                {/* <div className="mt-4">
                    <p className="font-bold">
                        {layout === 'marathi' ? 'उत्तर:' : 
                         layout === 'hindi' ? 'उत्तर:' : 
                         'Response:'}
                    </p>
                    <p className="mt-2 p-3 bg-gray-100 rounded">{chatResponse}</p>
                </div> */}
            </div>
        </div>
    );
};

export default CameraComponent;