export default function CanvasProfileSection() {
  return (
    <section className="w-full min-h-screen bg-[#f9f9f9] flex items-center justify-center">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-20 md:py-40 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Middle: Stats & Projects */}
          <div className="md:col-span-9 space-y-8">
            {/* AI Quota Card */}
            <section className="glass-card rounded-xl p-8">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1a1c1c] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#005da7]">memory</span>
                    AI 算力消耗
                  </h2>
                  <p className="text-sm text-[#414751] mt-1">本月配额使用情况</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl md:text-7xl font-bold text-[#005da7] tracking-tight particle-text">84%</span>
                </div>
              </div>
              <div className="relative h-2 bg-[#e2e2e2] rounded-full overflow-hidden mb-4">
                <div
                  className="absolute top-0 left-0 h-full bg-[#005da7] rounded-full progress-bar-glow"
                  style={{ width: '84%', transition: 'width 1s ease-out' }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-[#555c67]">
                <span>已用 420.5K Tokens</span>
                <span>总量 500K Tokens</span>
              </div>
            </section>

            {/* Recent Projects */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#1a1c1c]">最近工程</h2>
              </div>
              <div className="glass-card rounded-lg p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#e2e2e2]/50 flex items-center justify-center mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-sm text-[#414751] mb-1">暂无工程</p>
                <p className="text-xs font-mono text-[#555c67]">新建项目后将在此显示</p>
              </div>
            </section>
          </div>

          {/* Right: Settings */}
          <aside className="md:col-span-3 space-y-8">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-[11px] font-mono text-[#555c67] mb-4 tracking-wider">系统设置</h3>
              <div className="space-y-2">
                {[
                  { icon: 'tune', label: '偏好设置' },
                  { icon: 'security', label: '安全与密钥' },
                  { icon: 'account_balance_wallet', label: '计费与订阅' },
                ].map((item) => (
                  <a
                    key={item.label}
                    className="flex items-center justify-between p-3 rounded-md hover:bg-[#e2e2e2]/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#414751] group-hover:text-[#005da7] transition-colors">
                        {item.icon}
                      </span>
                      <span className="text-sm text-[#1a1c1c]">{item.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-[#c1c7d3] group-hover:text-[#005da7] transition-colors text-[18px]">
                      chevron_right
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-white to-[#e2e2e2]/30">
              <span className="material-symbols-outlined text-[#005da7] mb-2 text-3xl">api</span>
              <h4 className="text-base font-medium text-[#1a1c1c] mb-2">API 访问令牌</h4>
              <p className="text-sm text-[#414751] mb-4">生成新的鉴权凭证以供外部系统调用。</p>
              <button className="w-full text-[11px] font-mono border border-[#005da7]/30 text-[#005da7] py-2 rounded-md hover:bg-[#EBF2FF] transition-colors cursor-pointer">
                管理密钥
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Inline styles matching page_2.html */}
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.8);
          border-left: 1px solid rgba(255, 255, 255, 0.8);
          border-bottom: 1px solid rgba(0, 93, 167, 0.1);
          border-right: 1px solid rgba(0, 93, 167, 0.1);
        }
        .particle-text {
          text-shadow: 0 0 15px rgba(0, 93, 167, 0.3);
          animation: pulse-glow 3s infinite alternate;
        }
        @keyframes pulse-glow {
          0% { text-shadow: 0 0 10px rgba(0, 93, 167, 0.2); }
          100% { text-shadow: 0 0 20px rgba(0, 93, 167, 0.5); }
        }
        .progress-bar-glow {
          box-shadow: 0 0 12px rgba(0, 93, 167, 0.4);
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </section>
  );
}
