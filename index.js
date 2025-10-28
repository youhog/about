import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// 改進後的配色與視覺風格
const COLORS = {
  warm1: '#D68A7A',
  warm2: '#E7BE8E',
  neutral: '#F9F8F4',
  accent: '#BFA8E1',
  teal: '#64979C'
};

const gradients = {
  primary: `linear-gradient(135deg, ${COLORS.warm1}, ${COLORS.accent})`,
  subtle: `linear-gradient(180deg, ${COLORS.neutral}, #fff)`
};

function usePageAnimation() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-[var(--neutral)] text-gray-800">
        <style>{`
          :root {
            --warm1: ${COLORS.warm1};
            --warm2: ${COLORS.warm2};
            --neutral: ${COLORS.neutral};
            --accent: ${COLORS.accent};
            --teal: ${COLORS.teal};
          }
          .glass { backdrop-filter: blur(12px); background: rgba(255,255,255,0.5); }
          .btn { padding: 0.6rem 1rem; border-radius: 14px; font-weight:600; transition: all 0.3s ease; }
          .btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 6px 12px rgba(0,0,0,0.1); }
          .card { border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.06); background: #fff; }
        `}</style>

        <header className="p-6 flex items-center justify-between sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
          <Logo />
          <Nav />
        </header>

        <main className="px-6 pb-20 bg-[var(--neutral)] min-h-[70vh]">
          <ContentWrapper />
        </main>

        <footer className="text-center p-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Your Name — Crafted with love & animation ✨
        </footer>
      </div>
    </Router>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
      <motion.div layout className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold" style={{background: gradients.primary}}>Y</motion.div>
      <div>
        <div className="font-bold text-lg text-gray-800">你的名字</div>
        <div className="text-xs text-gray-500">互動式自我介紹網站</div>
      </div>
    </Link>
  );
}

function Nav() {
  const [open, setOpen] = React.useState(false);
  return (
    <nav>
      <div className="hidden md:flex gap-4 items-center">
        <NavLink to="/">首頁</NavLink>
        <NavLink to="/about">關於我</NavLink>
        <NavLink to="/projects">作品集</NavLink>
        <NavLink to="/contact">聯絡</NavLink>
      </div>

      <div className="md:hidden">
        <button className="p-2 rounded-xl border border-gray-300 bg-white shadow-sm" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        {open && (
          <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="absolute right-4 mt-3 p-4 w-48 card glass">
            <div className="flex flex-col gap-3">
              <NavLink to="/">首頁</NavLink>
              <NavLink to="/about">關於我</NavLink>
              <NavLink to="/projects">作品集</NavLink>
              <NavLink to="/contact">聯絡</NavLink>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="relative group text-gray-700 font-medium">
      <span className="group-hover:text-[var(--teal)] transition-colors">{children}</span>
      <motion.span layoutId="underline" className="absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full bg-[var(--teal)] transition-all duration-300"></motion.span>
    </Link>
  );
}

function ContentWrapper() {
  return usePageAnimation();
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};
const pageTransition = { duration: 0.6, ease: 'easeInOut' };

function Home() {
  return (
    <motion.section className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-10 items-center" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <div>
        <h1 className="text-5xl font-extrabold leading-tight text-[var(--warm1)]">
          哈囉，我是 <span className="text-[var(--accent)]">你的名字</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          我是一位熱愛互動與創意的前端開發者，擅長將設計理念轉化為流暢的使用者體驗。
          我喜歡融合動畫、色彩與排版，創造充滿生命力的網頁世界。
        </p>

        <div className="mt-8 flex gap-4">
          <Link to="/projects" className="btn text-white" style={{background: gradients.primary}}>查看作品</Link>
          <Link to="/about" className="btn border border-[var(--accent)] text-[var(--accent)] bg-white">了解更多</Link>
        </div>
      </div>

      <motion.div className="w-full h-80 card overflow-hidden relative" whileHover={{scale:1.03}}>
        <motion.div animate={{rotate:[0,2,-2,0]}} transition={{repeat:Infinity, duration:6, ease:'easeInOut'}} className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--teal)]/20"></motion.div>
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[var(--teal)]">👋 歡迎光臨！</div>
      </motion.div>
    </motion.section>
  );
}

function About() {
  return (
    <motion.section className="max-w-5xl mx-auto mt-12" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <h2 className="text-4xl font-bold text-[var(--teal)] mb-6">關於我</h2>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="card p-6 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-[var(--warm1)] mb-2 text-lg">我的背景</h3>
          <p className="text-gray-700 text-base leading-relaxed">
            我擁有設計與程式的雙重背景，能在專案中兼顧視覺美感與技術可行性。
            我特別熱衷於前端技術（React、Vite、Framer Motion），喜歡打造動態、有故事感的網站體驗。
          </p>
        </div>

        <div className="card p-6 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-[var(--warm1)] mb-2 text-lg">設計理念與目標</h3>
          <p className="text-gray-700 text-base leading-relaxed">
            我相信「設計即溝通」，每一個按鈕、每一次動畫都應該有其意圖，讓使用者感受到被引導、被理解。
            我希望透過細緻的互動與動態過場，創造自然流暢的數位體驗，讓科技更具溫度。
          </p>
        </div>

        <div className="md:col-span-2 card p-6 hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-[var(--warm1)] mb-3 text-lg">技能與工具</h3>
          <ul className="text-gray-700 grid sm:grid-cols-2 gap-1 text-sm">
            <li>• 前端技術：React, Vite, Tailwind, TypeScript</li>
            <li>• 動畫與互動：Framer Motion, GSAP</li>
            <li>• 設計工具：Figma, Illustrator, Photoshop</li>
            <li>• 後端與資料庫：Supabase, Firebase</li>
          </ul>
        </div>
      </div>
    </motion.section>
  );
}

function Projects() {
  const projects = [
    {title:'互動名片', desc:'個性化、可點擊的動態介紹頁'},
    {title:'展示牆', desc:'網頁式作品集，融合動畫與過場'},
    {title:'創意小工具', desc:'集合實用與趣味的微型專案'}
  ];

  return (
    <motion.section className="max-w-5xl mx-auto mt-12" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <h2 className="text-3xl font-bold text-[var(--warm1)] mb-6">作品集</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map(p => (
          <motion.div whileHover={{y:-6}} key={p.title} className="p-5 card hover:shadow-xl transition">
            <h3 className="font-bold text-[var(--teal)]">{p.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function Contact() {
  return (
    <motion.section className="max-w-3xl mx-auto mt-12 p-6 card" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <h2 className="text-2xl font-bold text-[var(--accent)]">聯絡我</h2>
      <p className="mt-2 text-sm text-gray-600">如果你對我的作品有興趣或想合作，隨時歡迎聯繫我！</p>

      <form className="mt-6 grid gap-4">
        <input placeholder="名字" className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" />
        <input placeholder="信箱" className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" />
        <textarea placeholder="訊息內容" rows={4} className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--teal)]" />
        <button type="button" className="btn text-white" style={{background: gradients.primary}}>送出</button>
      </form>
    </motion.section>
  );
}
