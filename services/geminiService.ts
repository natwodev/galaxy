import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';

const apiKey = process.env.API_KEY || '';

const getAiClient = () => {
  if (!apiKey) {
    console.warn("API Key is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateGalaxyContent = async (prompt: string, language: Language = 'en'): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return language === 'vi' ? "Lỗi: Thiếu khóa API." : "Error: API Key is missing.";

  const systemInstruction = language === 'vi' 
    ? "Bạn là Nebula, một AI dẫn đường từ thiên hà Andromeda. Phản hồi của bạn nên hữu ích, ngắn gọn, nhưng mang âm hưởng thuật ngữ vũ trụ (ví dụ: 'Rõ', 'Đang quét dữ liệu', 'Các vì sao thẳng hàng'). Bạn là chuyên gia về thiên văn học, vật lý và các khái niệm khoa học viễn tưởng. Hãy trả lời bằng tiếng Việt."
    : "You are Nebula, a sentient AI guide from the Andromeda galaxy. Your responses should be helpful, concise, but flavored with subtle space terminology (e.g., 'Copy that', 'Scanning data', 'Stars align'). You are an expert on astronomy, physics, and sci-fi concepts. Answer in English.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || (language === 'vi' ? "Mất kết nối với tinh vân." : "Connection to the nebula was lost.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'vi' ? "Phát hiện nhiễu khí quyển. Không thể tiếp cận lõi." : "Atmospheric interference detected. Unable to reach the core.";
  }
};