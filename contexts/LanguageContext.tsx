import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    // Nav
    nav_home: 'MISSION CONTROL',
    nav_deck: 'COMMAND DECK',
    nav_chat: 'COMMS LINK',
    nav_specs: 'SYSTEM SPECS',
    nav_map: 'GALAXY MAP',
    
    // Hero
    hero_badge: 'Powered by Gemini 3 Flash',
    hero_title_1: 'BEYOND THE',
    hero_title_2: 'EVENT HORIZON',
    hero_desc: 'Your gateway to the Nebula Nexus. Navigate vast datasets, analyze stellar phenomena, and communicate with our advanced AI core.',
    hero_btn_deck: 'OPEN DECK',
    hero_btn_link: 'ESTABLISH LINK',
    hero_stat_status: 'System Status',
    hero_stat_latency: 'Latency',
    hero_stat_enc: 'Encryption',
    hero_stat_users: 'Explorers',

    // Chat
    chat_header: 'NEBULA AI CORE',
    chat_online: 'System Online',
    chat_input_placeholder: 'Transmit message to core...',
    chat_secure: 'SECURE_CHANNEL_EST',
    chat_welcome: 'Greetings, Commander. I am Nebula. Systems operational. Ready for input.',
    
    // Dashboard
    deck_title: 'Command Deck',
    deck_sector: 'SECTOR 7G // USS NEBULA',
    deck_radar: 'RADAR_ACTIVE',
    deck_locked: 'TARGET LOCKED',
    deck_stream: 'DATA STREAM',
    deck_cpu: 'System Load',
    deck_net: 'Network Link',
    deck_active: 'Active Modules',
    deck_logs: 'Incoming Transmission Logs',
    deck_diag: 'Run Diagnostics',

    // Map
    map_title: 'STELLAR CARTOGRAPHY',
    map_scan: 'SCANNING SECTOR...',
    map_select: 'Select a celestial body for analysis',
  },
  vi: {
    // Nav
    nav_home: 'TRUNG TÂM NHIỆM VỤ',
    nav_deck: 'BUỒNG CHỈ HUY',
    nav_chat: 'LIÊN KẾT LIÊN LẠC',
    nav_specs: 'THÔNG SỐ HỆ THỐNG',
    nav_map: 'BẢN ĐỒ THIÊN HÀ',

    // Hero
    hero_badge: 'Vận hành bởi Gemini 3 Flash',
    hero_title_1: 'VƯỢT QUA',
    hero_title_2: 'CHÂN TRỜI SỰ KIỆN',
    hero_desc: 'Cổng kết nối đến Nebula Nexus. Điều hướng dữ liệu khổng lồ, phân tích hiện tượng sao và giao tiếp với lõi AI tiên tiến.',
    hero_btn_deck: 'MỞ BUỒNG LÁI',
    hero_btn_link: 'THIẾT LẬP KẾT NỐI',
    hero_stat_status: 'Trạng Thái',
    hero_stat_latency: 'Độ Trễ',
    hero_stat_enc: 'Mã Hóa',
    hero_stat_users: 'Thám Hiểm',

    // Chat
    chat_header: 'LÕI TRÍ TUỆ NEBULA',
    chat_online: 'Hệ Thống Trực Tuyến',
    chat_input_placeholder: 'Truyền tin nhắn tới lõi...',
    chat_secure: 'KÊNH_AN_TOÀN_ĐÃ_LẬP',
    chat_welcome: 'Xin chào, Chỉ huy. Tôi là Nebula. Hệ thống hoạt động bình thường. Sẵn sàng nhận lệnh.',

    // Dashboard
    deck_title: 'Buồng Chỉ Huy',
    deck_sector: 'KHU VỰC 7G // USS NEBULA',
    deck_radar: 'RADAR_KÍCH_HOẠT',
    deck_locked: 'ĐÃ KHÓA MỤC TIÊU',
    deck_stream: 'LUỒNG DỮ LIỆU',
    deck_cpu: 'Tải Hệ Thống',
    deck_net: 'Liên Kết Mạng',
    deck_active: 'Mô-đun Hoạt Động',
    deck_logs: 'Nhật Ký Truyền Tin Đến',
    deck_diag: 'Chạy Chẩn Đoán',

    // Map
    map_title: 'BẢN ĐỒ CÁC VÌ SAO',
    map_scan: 'ĐANG QUÉT KHU VỰC...',
    map_select: 'Chọn một thiên thể để phân tích',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};