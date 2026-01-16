import { Language } from '../types';

type Dictionary = {
  [key: string]: string;
};

export const translations: Record<Language, Dictionary> = {
  en: {
    // Nav
    nav_home: 'MISSION CONTROL',
    nav_deck: 'COMMAND DECK',
    nav_chat: 'COMMS LINK',
    nav_specs: 'SYSTEM SPECS',
    nav_map: 'GALAXY MAP',
    nav_settings: 'CONFIG',
    nav_archives: 'ARCHIVES',
    nav_profile: 'COMMANDER',
    nav_sim: 'TRAINING SIM',
    nav_hangar: 'SHIP HANGAR',
    
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
    chat_sidebar_title: 'MISSION LOGS',
    chat_context_mode: 'Mode',
    chat_context_lang: 'Lang',
    
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
    map_dist: 'Distance from Earth',
    map_analysis: 'Analysis',

    // Archives
    arch_title: 'CLASSIFIED ARCHIVES',
    arch_access: 'ACCESS GRANTED',
    arch_clearance: 'CLEARANCE LEVEL',
    arch_decrypt: 'DECRYPTING FILE...',
    arch_select: 'SELECT A FILE TO VIEW',

    // Profile
    prof_title: 'COMMANDER PROFILE',
    prof_rank: 'RANK',
    prof_exp: 'SERVICE RECORD',
    prof_skills: 'SKILL MATRIX',
    prof_achievements: 'MEDALS & RIBBONS',

    // Simulation
    sim_title: 'DECRYPTION PROTOCOL',
    sim_desc: 'Memorize the sequence to breach the firewall.',
    sim_start: 'INITIATE SEQUENCE',
    sim_level: 'SECURITY LEVEL',
    sim_success: 'ACCESS GRANTED',
    sim_fail: 'BREACH DETECTED',

    // Hangar
    hangar_title: 'FLEET HANGAR',
    hangar_ship_name: 'INTERCEPTOR X-9',
    hangar_class: 'CLASS: RECON',
    hangar_status: 'STATUS: COMBAT READY',
    hangar_engine: 'ENGINE',
    hangar_shield: 'SHIELD',
    hangar_weapon: 'WEAPON',

    // Settings
    set_title: 'SYSTEM CONFIGURATION',
    set_sound: 'Interface Audio',
    set_perf: 'High Performance Graphics',
    set_notif: 'Orbital Notifications',
    set_lang: 'Interface Language',

    // Common
    lbl_loading: 'LOADING...',
    lbl_online: 'ONLINE',
    lbl_offline: 'OFFLINE',
    lbl_latency: 'LATENCY',
    lbl_bandwidth: 'BANDWIDTH',
  },
  vi: {
    // Nav
    nav_home: 'TRUNG TÂM NHIỆM VỤ',
    nav_deck: 'BUỒNG CHỈ HUY',
    nav_chat: 'LIÊN KẾT LIÊN LẠC',
    nav_specs: 'THÔNG SỐ HỆ THỐNG',
    nav_map: 'BẢN ĐỒ THIÊN HÀ',
    nav_settings: 'CẤU HÌNH',
    nav_archives: 'KHO LƯU TRỮ',
    nav_profile: 'HỒ SƠ CHỈ HUY',
    nav_sim: 'MÔ PHỎNG HUẤN LUYỆN',
    nav_hangar: 'NHÀ CHỨA PHI THUYỀN',

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
    chat_sidebar_title: 'NHẬT KÝ NHIỆM VỤ',
    chat_context_mode: 'Chế độ',
    chat_context_lang: 'Ngôn ngữ',

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
    map_dist: 'Khoảng cách từ Trái Đất',
    map_analysis: 'Phân Tích',

    // Archives
    arch_title: 'KHO LƯU TRỮ MẬT',
    arch_access: 'QUYỀN TRUY CẬP ĐƯỢC CẤP',
    arch_clearance: 'CẤP ĐỘ AN NINH',
    arch_decrypt: 'ĐANG GIẢI MÃ TẬP TIN...',
    arch_select: 'CHỌN TẬP TIN ĐỂ XEM',

    // Profile
    prof_title: 'HỒ SƠ CHỈ HUY',
    prof_rank: 'CẤP BẬC',
    prof_exp: 'LỊCH SỬ CÔNG TÁC',
    prof_skills: 'MA TRẬN KỸ NĂNG',
    prof_achievements: 'HUÂN CHƯƠNG',

    // Simulation
    sim_title: 'GIAO THỨC GIẢI MÃ',
    sim_desc: 'Ghi nhớ chuỗi ký tự để phá vỡ tường lửa.',
    sim_start: 'BẮT ĐẦU CHUỖI',
    sim_level: 'CẤP ĐỘ AN NINH',
    sim_success: 'TRUY CẬP THÀNH CÔNG',
    sim_fail: 'PHÁT HIỆN XÂM NHẬP',

    // Hangar
    hangar_title: 'NHÀ CHỨA HẠM ĐỘI',
    hangar_ship_name: 'CHIẾN ĐẤU CƠ X-9',
    hangar_class: 'LOẠI: TRINH SÁT',
    hangar_status: 'TRẠNG THÁI: SẴN SÀNG',
    hangar_engine: 'ĐỘNG CƠ',
    hangar_shield: 'LÁ CHẮN',
    hangar_weapon: 'VŨ KHÍ',

    // Settings
    set_title: 'CẤU HÌNH HỆ THỐNG',
    set_sound: 'Âm Thanh Giao Diện',
    set_perf: 'Đồ Họa Hiệu Suất Cao',
    set_notif: 'Thông Báo Quỹ Đạo',
    set_lang: 'Ngôn Ngữ Giao Diện',

    // Common
    lbl_loading: 'ĐANG TẢI...',
    lbl_online: 'TRỰC TUYẾN',
    lbl_offline: 'NGOẠI TUYẾN',
    lbl_latency: 'ĐỘ TRỄ',
    lbl_bandwidth: 'BĂNG THÔNG',
  }
};