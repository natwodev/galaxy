import React from 'react';
import { Cpu, Globe, Zap, Shield, Radio, Database } from 'lucide-react';
import { GalaxyFeature } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const { language } = useLanguage();

  const features: GalaxyFeature[] = [
    {
      id: '1',
      title: language === 'en' ? 'Quantum Processing' : 'Xử Lý Lượng Tử',
      description: language === 'en' ? 'Powered by Gemini 3 Flash, delivering answers at light speed.' : 'Vận hành bởi Gemini 3 Flash, mang lại câu trả lời với tốc độ ánh sáng.',
      icon: <Cpu className="text-cyan-400" size={32} />
    },
    {
      id: '2',
      title: language === 'en' ? 'Universal Access' : 'Truy Cập Toàn Cầu',
      description: language === 'en' ? 'Connect to the knowledge base from any sector of the galaxy.' : 'Kết nối với kho tri thức từ bất kỳ khu vực nào trong thiên hà.',
      icon: <Globe className="text-purple-400" size={32} />
    },
    {
      id: '3',
      title: language === 'en' ? 'Hyper-Response' : 'Phản Hồi Siêu Tốc',
      description: language === 'en' ? 'Low latency communication streams for real-time analysis.' : 'Luồng giao tiếp độ trễ thấp để phân tích thời gian thực.',
      icon: <Zap className="text-yellow-400" size={32} />
    },
    {
      id: '4',
      title: language === 'en' ? 'Shielded Data' : 'Dữ Liệu Được Bảo Vệ',
      description: language === 'en' ? 'Your interactions are encrypted with military-grade protocols.' : 'Tương tác của bạn được mã hóa bằng các giao thức cấp quân sự.',
      icon: <Shield className="text-green-400" size={32} />
    },
    {
      id: '5',
      title: language === 'en' ? 'Deep Space Scans' : 'Quét Không Gian Sâu',
      description: language === 'en' ? 'Continuously updated with the latest cosmic phenomenon.' : 'Liên tục cập nhật các hiện tượng vũ trụ mới nhất.',
      icon: <Radio className="text-pink-400" size={32} />
    },
    {
      id: '6',
      title: language === 'en' ? 'Infinite Storage' : 'Lưu Trữ Vô Hạn',
      description: language === 'en' ? 'Archiving humanity\'s collective knowledge in the cloud nebula.' : 'Lưu trữ kiến thức chung của nhân loại trong đám mây tinh vân.',
      icon: <Database className="text-blue-400" size={32} />
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 mb-4">
          {language === 'en' ? 'System Capabilities' : 'Khả Năng Hệ Thống'}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {language === 'en' ? 'Review the specifications of the Nebula Nexus interface.' : 'Xem xét thông số kỹ thuật của giao diện Nebula Nexus.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className="group relative p-8 rounded-2xl glass-panel border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit border border-white/10 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative Elements */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default Features;