/* ==========================================================================
   AI 知識圖譜 | Interactive Charts, Diagrams & UI Logic
   100% Self-Contained Vanilla JS (Works Offline)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initScrollReveal();
  initHierarchyExplorer();
  initBiasVarianceLab();
  initMlAlgoMap();
  initGradientDescentLab();
  initActivationChart();
  initArchitectureExplorer();
  initTemperatureLab();
  initTestTimeComputeChart();
  initAttentionLab();
  initScalingChart();
  initRadarChart();
  initBenchmarkChart();
  initTimeline();
  initDecisionAdvisor();
  initGlossary();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Light / Dark)
   -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById("themeToggle");
  const iconSpan = document.getElementById("themeIcon");
  const labelSpan = document.getElementById("themeLabel");
  const saved = localStorage.getItem("ai-atlas-theme");

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      iconSpan.textContent = "☀️";
      labelSpan.textContent = "暖白模式";
    } else {
      iconSpan.textContent = "🌙";
      labelSpan.textContent = "深夜模式";
    }
  };

  applyTheme(saved === "dark" ? "dark" : "light");

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("ai-atlas-theme", next);
    applyTheme(next);
  });
}

/* --------------------------------------------------------------------------
   2. Navigation, Progress Bar & Active Section Spy
   -------------------------------------------------------------------------- */
function initNavigation() {
  const progressBar = document.getElementById("readingProgress");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = [...document.querySelectorAll("section[id]")];
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navList = document.getElementById("navLinks");

  menuBtn?.addEventListener("click", () => {
    navList.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => navList.classList.remove("open"));
  });

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    progressBar.style.width = `${pct}%`;

    let activeId = sections[0]?.id || "";
    for (const sec of sections) {
      if (scrollTop >= sec.offsetTop - 140) {
        activeId = sec.id;
      }
    }
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${activeId}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   3. Interactive Nested Hierarchy (AI > ML > DL > LLM)
   -------------------------------------------------------------------------- */
const HIERARCHY_DATA = {
  ai: {
    badge: "最外層總概念",
    badgeClass: "pill-neutral",
    title: "人工智慧 Artificial Intelligence (AI)",
    desc: "涵蓋所有讓機器模擬人類認知、推理、感知與決策能力的技術總稱。除了數據驅動的機器學習外，也包含早期的符號邏輯、專家系統、規則引擎與路徑搜尋演算法。",
    kv: [
      { label: "核心範式", value: "規則推理 + 統計學習 + 自主代理" },
      { label: "資料需求", value: "視方法而定（可由規則或資料驅動）" },
      { label: "代表技術", value: "專家系統、A* 搜尋、ML、DL、Agent" },
      { label: "經典範例", value: "西洋棋引擎、智慧排程、AI 助理" }
    ]
  },
  ml: {
    badge: "AI 的核心子集",
    badgeClass: "pill-ml",
    title: "機器學習 Machine Learning (ML)",
    desc: "不靠人工逐條撰寫規則，而是讓演算法直接從歷史資料中學習統計規律以進行預測或分類。在結構化表格資料（金融、製造、電商）中至今仍是效率與準確度的王者。",
    kv: [
      { label: "特徵工程", value: "人工挑選與建構特徵（高度可解釋）" },
      { label: "資料與硬體", value: "中小型資料即可見效；標準 CPU 可跑" },
      { label: "代表演算法", value: "XGBoost、隨機森林、SVM、K-Means" },
      { label: "最佳戰場", value: "信用風控、詐欺偵測、預測性維護" }
    ]
  },
  dl: {
    badge: "ML 的進階分支",
    badgeClass: "pill-dl",
    title: "深度學習 Deep Learning (DL)",
    desc: "使用多層人工神經網路（數十至數百層）模擬大腦分層抽象機制，能直接從影像、語音、文字等非結構化原始資料中「自動萃取高維特徵」，省去繁瑣人工特徵設計。",
    kv: [
      { label: "特徵工程", value: "端對端自動學習多層次特徵" },
      { label: "資料與硬體", value: "大量標註/未標註資料；需 GPU / TPU" },
      { label: "核心架構", value: "CNN（空間）、RNN/LSTM（序列）、Transformer" },
      { label: "最佳戰場", value: "醫療影像辨識、自駕感知、語音轉錄" }
    ]
  },
  llm: {
    badge: "DL 的前沿巔峰應用",
    badgeClass: "pill-llm",
    title: "大型語言模型 Large Language Models (LLM)",
    desc: "建立在深度學習 Transformer 架構之上的超大規模基礎模型。透過兆級 Token 預訓練、人類回饋強化學習（RLHF）與推論期算力擴展（Reasoning），展現跨領域語意理解、多模態互動與複雜邏輯推理能力。",
    kv: [
      { label: "核心機制", value: "自注意力機制 (Self-Attention) + CoT 推理" },
      { label: "資料與硬體", value: "數十兆 Token；萬卡級 GPU/TPU 叢集" },
      { label: "代表模型", value: "GPT 系列、Gemini、Claude、Llama 3、DeepSeek-R1" },
      { label: "最佳戰場", value: "對話助理、程式開發、企業 RAG、AI Agent" }
    ]
  }
};

function initHierarchyExplorer() {
  const rings = document.querySelectorAll(".ring-group");
  const tabs = document.querySelectorAll(".h-tab");
  const panel = document.getElementById("hierarchyDetailContent");

  const renderLayer = (key) => {
    const item = HIERARCHY_DATA[key];
    if (!item) return;

    rings.forEach((r) => r.classList.toggle("active", r.dataset.layer === key));
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.layer === key));

    panel.innerHTML = `
      <div>
        <span class="pill ${item.badgeClass}" style="margin-bottom:12px;">${item.badge}</span>
        <h3 style="margin:0 0 10px; font-size:1.38rem;">${item.title}</h3>
        <p style="margin:0; color:var(--text-secondary); font-size:0.95rem;">${item.desc}</p>
      </div>
      <div class="detail-kv-grid">
        ${item.kv
          .map(
            (row) => `
          <div class="detail-kv">
            <label>${row.label}</label>
            <span>${row.value}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  };

  rings.forEach((ring) => {
    ring.addEventListener("click", () => renderLayer(ring.dataset.layer));
  });
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => renderLayer(tab.dataset.layer));
  });

  renderLayer("llm");
}

/* --------------------------------------------------------------------------
   4. Interactive Neural Architecture Explorer (MLP / CNN / RNN / Transformer / MoE)
   -------------------------------------------------------------------------- */
const ARCH_DATA = {
  mlp: {
    name: "多層感知器 MLP (Multilayer Perceptron)",
    era: "1958 – 1986 奠基時代",
    dataType: "表格向量 / 扁平化特徵",
    mechanism: "全連接層（Fully Connected）搭配非線性激活函數（如 ReLU）與反向傳播（Backpropagation）更新權重。",
    strength: "萬能函數逼近器，實作直覺，至今仍廣泛作為 Transformer 內部的 FFN 前饋子層使用。",
    bottleneck: "忽略影像空間結構與文字前後順序，輸入維度過高時參數量會呈爆炸性成長。",
    svg: `
      <svg viewBox="0 0 560 250" width="100%" height="250" aria-label="MLP Architecture">
        <defs>
          <linearGradient id="gMlp" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#0D9488"/>
            <stop offset="100%" stop-color="#4F46E5"/>
          </linearGradient>
        </defs>
        <g stroke="currentColor" stroke-opacity="0.18" stroke-width="1.4">
          ${[55,105,155,205].map(y1 => [40,85,130,175,220].map(y2 => `<line x1="95" y1="${y1}" x2="230" y2="${y2}"/>`).join("")).join("")}
          ${[40,85,130,175,220].map(y1 => [65,125,185].map(y2 => `<line x1="230" y1="${y1}" x2="365" y2="${y2}"/>`).join("")).join("")}
          ${[65,125,185].map(y1 => [95,155].map(y2 => `<line x1="365" y1="${y1}" x2="475" y2="${y2}"/>`).join("")).join("")}
        </g>
        ${[55,105,155,205].map(y => `<circle cx="95" cy="${y}" r="11" fill="#0D9488"/>`).join("")}
        ${[40,85,130,175,220].map(y => `<circle cx="230" cy="${y}" r="11" fill="#4F46E5"/>`).join("")}
        ${[65,125,185].map(y => `<circle cx="365" cy="${y}" r="11" fill="#6366F1"/>`).join("")}
        ${[95,155].map(y => `<circle cx="475" cy="${y}" r="12" fill="#D97706"/>`).join("")}
        <text x="95" y="242" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">輸入層 Input</text>
        <text x="230" y="242" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">隱藏層 1</text>
        <text x="365" y="242" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">隱藏層 2</text>
        <text x="475" y="242" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">輸出層 Output</text>
      </svg>
    `
  },
  cnn: {
    name: "卷積神經網路 CNN (Convolutional Neural Network)",
    era: "1989 LeNet → 2012 AlexNet → 2015 ResNet",
    dataType: "2D 影像、醫療掃描、3D 視訊網格",
    mechanism: "利用滑動卷積核（Kernel）與權重共享萃取「邊緣 → 紋理 → 局部器官 → 完整物體」的階層空間特徵，ResNet 更以殘差跳躍連接突破百層訓練極限。",
    strength: "具備平移不變性、大幅減少參數量，是電腦視覺與邊緣端影像推論的中流砥柱。",
    bottleneck: "感受野偏向局部區域，捕捉跨長距離全域語意關聯較弱。",
    svg: `
      <svg viewBox="0 0 560 250" width="100%" height="250" aria-label="CNN Architecture">
        <!-- Input Grid -->
        <rect x="30" y="55" width="90" height="90" rx="8" fill="rgba(13,148,136,0.14)" stroke="#0D9488" stroke-width="2"/>
        <rect x="48" y="73" width="28" height="28" rx="4" fill="rgba(13,148,136,0.45)" stroke="#0D9488" stroke-width="2"/>
        <line x1="76" y1="73" x2="178" y2="75" stroke="#0D9488" stroke-dasharray="4 3" stroke-width="1.6"/>
        <line x1="76" y1="101" x2="178" y2="115" stroke="#0D9488" stroke-dasharray="4 3" stroke-width="1.6"/>
        <!-- Feature Maps Stack 1 -->
        <rect x="172" y="45" width="68" height="100" rx="8" fill="rgba(79,70,229,0.12)" stroke="#4F46E5" stroke-width="1.8"/>
        <rect x="184" y="55" width="68" height="100" rx="8" fill="rgba(79,70,229,0.20)" stroke="#4F46E5" stroke-width="1.8"/>
        <rect x="196" y="65" width="68" height="100" rx="8" fill="rgba(79,70,229,0.28)" stroke="#4F46E5" stroke-width="2"/>
        <!-- Pooling & Residual Skip -->
        <path d="M 230 45 Q 315 8 395 62" fill="none" stroke="#D97706" stroke-width="2.2" stroke-dasharray="5 3"/>
        <text x="312" y="24" text-anchor="middle" font-size="11" fill="#D97706" font-weight="600">ResNet 殘差跳躍連接 (Skip)</text>
        <!-- Deep Feature Maps -->
        <rect x="315" y="68" width="44" height="72" rx="7" fill="rgba(99,102,241,0.25)" stroke="#6366F1" stroke-width="1.8"/>
        <rect x="327" y="78" width="44" height="72" rx="7" fill="rgba(99,102,241,0.38)" stroke="#6366F1" stroke-width="2"/>
        <path d="M 268 115 L 310 115" stroke="currentColor" stroke-opacity="0.4" stroke-width="2"/>
        <path d="M 375 115 L 420 115" stroke="currentColor" stroke-opacity="0.4" stroke-width="2"/>
        <!-- Classifier Output -->
        <rect x="425" y="60" width="102" height="106" rx="12" fill="rgba(217,119,6,0.12)" stroke="#D97706" stroke-width="2"/>
        <text x="476" y="102" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">分類 / 偵測</text>
        <text x="476" y="122" text-anchor="middle" font-size="11" fill="#D97706">98.4% 腫瘤陰性</text>
        <text x="476" y="140" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.6">Softmax Output</text>
        <text x="75" y="178" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">原始影像 + 濾波核</text>
        <text x="220" y="190" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">卷積特徵圖 Conv</text>
        <text x="345" y="178" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">池化 Pooling</text>
      </svg>
    `
  },
  rnn: {
    name: "循環神經網路 RNN / LSTM",
    era: "1997 LSTM → 2014 GRU & Seq2Seq",
    dataType: "時間序列、語音波形、早期自然語言",
    mechanism: "逐步讀取序列資料，並將「隱藏狀態 (Hidden State)」像接力棒一樣往下一時間步傳遞；LSTM 加入遺忘門、輸入門與輸出門，有效緩解長距離記憶遺失。",
    strength: "天然貼合串流與具時間先後順序的訊號（如金融感測、即時語音流）。",
    bottleneck: "必須依序逐字計算，無法大規模平行化訓練，面對萬字長文仍會面臨記憶瓶頸。",
    svg: `
      <svg viewBox="0 0 560 250" width="100%" height="250" aria-label="RNN LSTM Architecture">
        ${[0,1,2,3].map((i) => {
          const x = 68 + i * 124;
          return `
            <rect x="${x}" y="86" width="76" height="58" rx="12" fill="rgba(79,70,229,0.16)" stroke="#4F46E5" stroke-width="2"/>
            <text x="${x+38}" y="112" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">LSTM</text>
            <text x="${x+38}" y="130" text-anchor="middle" font-size="10" fill="#4F46E5">t = ${i+1}</text>
            <line x1="${x+38}" y1="184" x2="${x+38}" y2="148" stroke="#0D9488" stroke-width="2"/>
            <circle cx="${x+38}" cy="196" r="14" fill="rgba(13,148,136,0.16)" stroke="#0D9488" stroke-width="1.8"/>
            <text x="${x+38}" y="200" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">x${i+1}</text>
            <line x1="${x+38}" y1="84" x2="${x+38}" y2="52" stroke="#D97706" stroke-width="2"/>
            <circle cx="${x+38}" cy="38" r="13" fill="rgba(217,119,6,0.16)" stroke="#D97706" stroke-width="1.8"/>
            <text x="${x+38}" y="42" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">y${i+1}</text>
            ${i < 3 ? `<line x1="${x+78}" y1="115" x2="${x+120}" y2="115" stroke="#4F46E5" stroke-width="2.4"/><polygon points="${x+122},115 ${x+114},110 ${x+114},120" fill="#4F46E5"/>` : ""}
          `;
        }).join("")}
        <text x="280" y="238" text-anchor="middle" font-size="12" fill="currentColor" opacity="0.7">隱藏記憶狀態 h(t) 逐時間步依序傳遞（難以平行運算）</text>
      </svg>
    `
  },
  transformer: {
    name: "Transformer（自注意力架構）",
    era: "2017 《Attention Is All You Need》至今",
    dataType: "文字、程式碼、影像 Patch、音訊與多模態 Token",
    mechanism: "徹底拋棄循環結構，改以「多頭自注意力機制 (Multi-Head Self-Attention)」同時計算序列中任意兩個 Token 的關聯權重，搭配位置編碼與 GPU 高度平行運算。",
    strength: "直接捕捉全域長距離語意依賴、訓練極易規模化（Scaling Laws），成為所有現代 LLM 與多模態模型的統一基石。",
    bottleneck: "標準自注意力記憶體與計算量隨序列長度呈平方成長 O(N²)，需靠 FlashAttention、KV Cache 與稀疏注意力優化。",
    svg: `
      <svg viewBox="0 0 560 250" width="100%" height="250" aria-label="Transformer Architecture">
        <!-- Input Tokens -->
        ${[70, 175, 280, 385, 490].map((x, idx) => `
          <rect x="${x-32}" y="192" width="64" height="30" rx="8" fill="rgba(13,148,136,0.15)" stroke="#0D9488" stroke-width="1.6"/>
          <text x="${x}" y="211" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor">Token ${idx+1}</text>
        `).join("")}
        <!-- All-to-All Attention Web -->
        <g fill="none" stroke="#D97706">
          <path d="M 70 190 Q 175 110 280 190" stroke-width="2.5" stroke-opacity="0.75"/>
          <path d="M 70 190 Q 280 80 490 190" stroke-width="1.8" stroke-opacity="0.5"/>
          <path d="M 175 190 Q 280 120 385 190" stroke-width="2.2" stroke-opacity="0.65"/>
          <path d="M 280 190 Q 385 130 490 190" stroke-width="3" stroke-opacity="0.85"/>
          <path d="M 175 190 Q 332 95 490 190" stroke-width="1.4" stroke-opacity="0.38"/>
        </g>
        <!-- Multi-Head Self-Attention Block -->
        <rect x="115" y="76" width="330" height="46" rx="12" fill="rgba(217,119,6,0.14)" stroke="#D97706" stroke-width="2"/>
        <text x="280" y="104" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Multi-Head Self-Attention（平行全域關聯）</text>
        <!-- FFN + Norm -->
        <rect x="155" y="18" width="250" height="38" rx="10" fill="rgba(79,70,229,0.16)" stroke="#4F46E5" stroke-width="2"/>
        <text x="280" y="42" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Add &amp; Norm → Feed-Forward (MLP)</text>
        <line x1="280" y1="76" x2="280" y2="58" stroke="#4F46E5" stroke-width="2.2"/>
      </svg>
    `
  },
  moe: {
    name: "混合專家架構 MoE (Mixture of Experts)",
    era: "2024 – 2026 前沿高效大模型主流",
    dataType: "兆級知識容量與高效推理模型（如 DeepSeek-R1 671B）",
    mechanism: "將傳統單一巨大的前饋層拆分為數十個專業「專家子網路 (Experts)」，由輕量路由器（Router）為每個 Token 動態挑選最相關的少數專家（例如僅激活 37B / 671B）進行計算。",
    strength: "以極低單次推論算力與成本，同時擁有數千億至破兆參數的龐大知識容量，大幅加速訓練與推論。",
    bottleneck: "模型總權重仍需大量 GPU 顯存承載，且需精密設計負載平衡避免部分專家過載或閒置。",
    svg: `
      <svg viewBox="0 0 560 250" width="100%" height="250" aria-label="MoE Architecture">
        <!-- Input Token -->
        <rect x="28" y="100" width="84" height="48" rx="10" fill="rgba(13,148,136,0.16)" stroke="#0D9488" stroke-width="2"/>
        <text x="70" y="128" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">輸入 Token</text>
        <!-- Router -->
        <polygon points="188,88 238,124 188,160 138,124" fill="rgba(217,119,6,0.18)" stroke="#D97706" stroke-width="2"/>
        <text x="188" y="128" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">Router</text>
        <line x1="114" y1="124" x2="136" y2="124" stroke="#0D9488" stroke-width="2.2"/>
        <!-- Experts -->
        ${[
          { y: 24, label: "專家 E1（程式）", active: true },
          { y: 76, label: "專家 E2（文學）", active: false },
          { y: 128, label: "專家 E3（數學）", active: true },
          { y: 180, label: "專家 E4（生物）", active: false }
        ].map((ex) => `
          <line x1="238" y1="124" x2="305" y2="${ex.y+20}" stroke="${ex.active ? "#D97706" : "currentColor"}" stroke-width="${ex.active ? 2.6 : 1.2}" stroke-opacity="${ex.active ? 1 : 0.22}" ${ex.active ? "" : 'stroke-dasharray="4 4"'}/>
          <rect x="308" y="${ex.y}" width="126" height="40" rx="9" fill="${ex.active ? "rgba(79,70,229,0.22)" : "rgba(148,163,184,0.10)"}" stroke="${ex.active ? "#4F46E5" : "currentColor"}" stroke-opacity="${ex.active ? 1 : 0.25}" stroke-width="${ex.active ? 2.2 : 1.2}"/>
          <text x="371" y="${ex.y+24}" text-anchor="middle" font-size="11.5" font-weight="${ex.active ? "700" : "500"}" fill="currentColor" opacity="${ex.active ? 1 : 0.45}">${ex.label}</text>
          ${ex.active ? `<line x1="436" y1="${ex.y+20}" x2="474" y2="124" stroke="#4F46E5" stroke-width="2.2"/>` : ""}
        `).join("")}
        <!-- Combine -->
        <rect x="476" y="96" width="66" height="56" rx="12" fill="rgba(79,70,229,0.16)" stroke="#4F46E5" stroke-width="2"/>
        <text x="509" y="121" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">加權</text>
        <text x="509" y="137" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">融合輸出</text>
      </svg>
    `
  }
};

function initArchitectureExplorer() {
  const tabs = document.querySelectorAll(".arch-tab");
  const diagramBox = document.getElementById("archDiagramBox");
  const infoBox = document.getElementById("archInfoBox");

  const renderArch = (key) => {
    const d = ARCH_DATA[key];
    if (!d) return;
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.arch === key));
    diagramBox.innerHTML = d.svg;
    infoBox.innerHTML = `
      <div>
        <span class="pill pill-dl" style="margin-bottom:10px;">${d.era}</span>
        <h3 style="margin:0 0 6px; font-size:1.28rem;">${d.name}</h3>
        <div style="font-size:0.82rem; color:var(--text-muted); font-family:var(--font-mono);">適用資料形態：${d.dataType}</div>
      </div>
      <p style="margin:0; font-size:0.93rem; color:var(--text-secondary);">${d.mechanism}</p>
      <div class="arch-stat-row">
        <div class="arch-stat"><strong>核心優勢：</strong>${d.strength}</div>
        <div class="arch-stat warn"><strong>主要瓶頸：</strong>${d.bottleneck}</div>
      </div>
    `;
  };

  tabs.forEach((t) => t.addEventListener("click", () => renderArch(t.dataset.arch)));
  renderArch("transformer");
}

/* --------------------------------------------------------------------------
   5. Interactive Self-Attention Mini-Lab
   -------------------------------------------------------------------------- */
const ATTENTION_PRESETS = {
  zh: {
    tokens: ["模型", "閱讀", "長篇", "病歷", "後", "，", "它", "精準", "找出", "病因"],
    defaultIdx: 6,
    weights: {
      0: [0.38, 0.24, 0.05, 0.10, 0.02, 0.01, 0.10, 0.03, 0.05, 0.02],
      1: [0.28, 0.26, 0.14, 0.22, 0.03, 0.01, 0.02, 0.01, 0.02, 0.01],
      2: [0.04, 0.12, 0.30, 0.44, 0.02, 0.01, 0.01, 0.02, 0.02, 0.02],
      3: [0.08, 0.18, 0.24, 0.28, 0.03, 0.01, 0.02, 0.02, 0.04, 0.10],
      4: [0.06, 0.32, 0.10, 0.26, 0.16, 0.02, 0.02, 0.02, 0.02, 0.02],
      5: [0.08, 0.10, 0.06, 0.12, 0.18, 0.24, 0.08, 0.04, 0.05, 0.05],
      6: [0.56, 0.06, 0.02, 0.06, 0.02, 0.01, 0.14, 0.04, 0.06, 0.03],
      7: [0.06, 0.04, 0.03, 0.08, 0.02, 0.01, 0.12, 0.26, 0.24, 0.14],
      8: [0.14, 0.08, 0.04, 0.14, 0.02, 0.01, 0.16, 0.12, 0.11, 0.18],
      9: [0.05, 0.04, 0.08, 0.38, 0.02, 0.01, 0.03, 0.08, 0.17, 0.14]
    },
    insights: {
      6: "代名詞「<strong>它</strong>」對句首的「<strong>模型</strong>」分配了高達 <strong>56%</strong> 的注意力權重！即使兩者相隔 5 個詞元，Self-Attention 仍能瞬間完成跨距離指代消歧（Coreference Resolution）。",
      9: "「<strong>病因</strong>」高度關注前文的「<strong>病歷</strong> (38%)」與動作「<strong>找出</strong> (17%)」，展現 Transformer 如何將語意線索跨句整合。",
      3: "「<strong>病歷</strong>」與修飾語「<strong>長篇</strong> (24%)」、動詞「<strong>閱讀</strong> (18%)」及結果「<strong>病因</strong> (10%)」形成緊密語意叢集。"
    }
  },
  en: {
    tokens: ["The", "neural", "network", "scaled", "fast", "because", "it", "used", "GPU", "clusters"],
    defaultIdx: 6,
    weights: {
      0: [0.30, 0.34, 0.26, 0.04, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01],
      1: [0.10, 0.32, 0.42, 0.06, 0.02, 0.01, 0.02, 0.01, 0.02, 0.02],
      2: [0.08, 0.30, 0.28, 0.14, 0.04, 0.01, 0.08, 0.03, 0.02, 0.02],
      3: [0.02, 0.14, 0.28, 0.24, 0.18, 0.04, 0.02, 0.03, 0.03, 0.02],
      4: [0.01, 0.04, 0.08, 0.46, 0.24, 0.05, 0.02, 0.02, 0.04, 0.04],
      5: [0.02, 0.04, 0.08, 0.26, 0.16, 0.18, 0.06, 0.08, 0.06, 0.06],
      6: [0.04, 0.24, 0.46, 0.06, 0.02, 0.02, 0.10, 0.04, 0.01, 0.01],
      7: [0.02, 0.04, 0.08, 0.06, 0.02, 0.04, 0.18, 0.18, 0.20, 0.18],
      8: [0.01, 0.04, 0.05, 0.08, 0.04, 0.02, 0.02, 0.14, 0.28, 0.32],
      9: [0.01, 0.03, 0.06, 0.08, 0.04, 0.02, 0.02, 0.12, 0.38, 0.24]
    },
    insights: {
      6: "代名詞 <strong>\"it\"</strong> 自動將總計 <strong>70%</strong> 的注意力聚焦在 <strong>\"neural\" (24%)</strong> 與 <strong>\"network\" (46%)</strong> 上，無須像 RNN 逐字遞推，直接透過點積相似度（Q·Kᵀ / √d）鎖定主詞。",
      9: "<strong>\"clusters\"</strong> 與修飾詞 <strong>\"GPU\" (38%)</strong> 及動詞 <strong>\"used\" (12%)</strong> 強烈連結，精準捕捉硬體加速語境。",
      4: "副詞 <strong>\"fast\"</strong> 將 <strong>46%</strong> 注意力集中於所修飾的動詞 <strong>\"scaled\"</strong>。"
    }
  }
};

function initAttentionLab() {
  const tokenRow = document.getElementById("attentionTokenRow");
  const svg = document.getElementById("attentionSvg");
  const insightEl = document.getElementById("attentionInsight");
  const presetBtns = document.querySelectorAll(".preset-btn");

  let activePreset = "zh";
  let selectedIdx = ATTENTION_PRESETS.zh.defaultIdx;

  const renderAttention = () => {
    const preset = ATTENTION_PRESETS[activePreset];
    const weights = preset.weights[selectedIdx];
    const n = preset.tokens.length;

    tokenRow.innerHTML = preset.tokens
      .map((tok, i) => {
        const w = weights[i];
        const isSel = i === selectedIdx;
        const alpha = isSel ? 1 : Math.max(0.06, w * 1.15);
        const bgStyle = isSel
          ? ""
          : `background: rgba(217, 119, 6, ${(w * 0.42).toFixed(2)}); border-color: rgba(217, 119, 6, ${Math.min(0.85, w * 1.5 + 0.15).toFixed(2)});`;
        return `
          <button class="token-pill ${isSel ? "selected" : ""}" data-idx="${i}" style="${bgStyle}">
            ${tok}
            <span class="token-weight">${Math.round(w * 100)}%</span>
          </button>
        `;
      })
      .join("");

    // Draw SVG Bezier arcs from selected token to every other token
    const width = 1000;
    const step = width / n;
    const xSource = step * selectedIdx + step / 2;

    let paths = "";
    weights.forEach((w, i) => {
      const xTarget = step * i + step / 2;
      const dist = Math.abs(i - selectedIdx);
      if (i === selectedIdx) {
        paths += `<circle cx="${xSource}" cy="12" r="6" fill="#D97706"/>`;
        return;
      }
      const arcHeight = Math.min(132, 30 + dist * 16);
      const midX = (xSource + xTarget) / 2;
      const strokeW = Math.max(1.2, w * 14);
      const opacity = Math.max(0.12, Math.min(0.95, w * 1.7));
      const color = w >= 0.2 ? "#EA580C" : "#4F46E5";
      paths += `
        <path d="M ${xSource} 10 Q ${midX} ${arcHeight} ${xTarget} 10"
              fill="none" stroke="${color}" stroke-width="${strokeW.toFixed(1)}"
              stroke-opacity="${opacity.toFixed(2)}" stroke-linecap="round"/>
      `;
    });

    svg.setAttribute("viewBox", `0 0 ${width} 145`);
    svg.innerHTML = paths;

    const topTargetIdx = weights
      .map((w, i) => ({ w, i }))
      .filter((x) => x.i !== selectedIdx)
      .sort((a, b) => b.w - a.w)[0];

    insightEl.innerHTML =
      preset.insights[selectedIdx] ||
      `目前選定詞元「<strong>${preset.tokens[selectedIdx]}</strong>」對「<strong>${preset.tokens[topTargetIdx.i]}</strong>」分配最高跨詞注意力（<strong>${Math.round(
        topTargetIdx.w * 100
      )}%</strong>），展示自注意力機制如何依語境動態連結相關概念。`;

    tokenRow.querySelectorAll(".token-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedIdx = Number(btn.dataset.idx);
        renderAttention();
      });
    });
  };

  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activePreset = btn.dataset.preset;
      selectedIdx = ATTENTION_PRESETS[activePreset].defaultIdx;
      presetBtns.forEach((b) => b.classList.toggle("active", b.dataset.preset === activePreset));
      renderAttention();
    });
  });

  renderAttention();
}

/* --------------------------------------------------------------------------
   6. Interactive Scaling Laws Chart (Compute FLOPs & Parameters, Log Scale)
   Data grounded in Epoch AI & Published Papers (2012 - 2026)
   -------------------------------------------------------------------------- */
const SCALING_MODELS = [
  { name: "AlexNet", year: 2012, era: "dl", flopsExp: 18.0, flopsLabel: "~1.0 × 10¹⁸", paramsB: 0.06, paramsLabel: "60M (CNN)", note: "GPU 深度學習大爆發起點" },
  { name: "ResNet-50", year: 2015, era: "dl", flopsExp: 18.58, flopsLabel: "~3.8 × 10¹⁸", paramsB: 0.0255, paramsLabel: "25.5M (CNN)", note: "殘差網路突破超深層瓶頸" },
  { name: "Transformer", year: 2017, era: "llm", flopsExp: 18.3, flopsLabel: "~2.0 × 10¹⁸", paramsB: 0.065, paramsLabel: "65M (Base)", note: "《Attention Is All You Need》" },
  { name: "BERT-Base", year: 2018, era: "llm", flopsExp: 19.0, flopsLabel: "~1.0 × 10¹⁹", paramsB: 0.11, paramsLabel: "110M (Encoder)", note: "雙向預訓練席捲 NLP 基準" },
  { name: "GPT-2", year: 2019, era: "llm", flopsExp: 21.1, flopsLabel: "~1.3 × 10²¹", paramsB: 1.5, paramsLabel: "1.5B (Decoder)", note: "展現零樣本連貫長文生成" },
  { name: "GPT-3", year: 2020, era: "llm", flopsExp: 23.5, flopsLabel: "~3.14 × 10²³", paramsB: 175, paramsLabel: "175B (Dense)", note: "湧現 Few-Shot 與 Scaling Laws" },
  { name: "Chinchilla", year: 2022, era: "llm", flopsExp: 23.76, flopsLabel: "~5.8 × 10²³", paramsB: 70, paramsLabel: "70B (1.4T Tokens)", note: "改寫算力最優配比（資料與參數並重）" },
  { name: "Llama 3 405B", year: 2024, era: "llm", flopsExp: 25.58, flopsLabel: "3.8 × 10²⁵", paramsB: 405, paramsLabel: "405B (Dense)", note: "開源權重正式追平閉源前沿" },
  { name: "DeepSeek-R1", year: 2025, era: "llm", flopsExp: 24.56, flopsLabel: "~3.6 × 10²⁴", paramsB: 671, paramsLabel: "671B MoE (37B 激活)", note: "MoE 高效訓練 + RL 推理大突破" },
  { name: "Frontier 推理世代", year: 2026, era: "llm", flopsExp: 26.2, flopsLabel: ">10²⁶ (含推理算力)", paramsB: 1200, paramsLabel: ">1T 級 (Dense/MoE)", note: "測試期算力擴展 + 原生全模態" }
];

function initScalingChart() {
  const container = document.getElementById("scalingChartSvg");
  const tooltip = document.getElementById("scalingTooltip");
  const modeBtns = document.querySelectorAll("[data-scale-mode]");
  let mode = "flops"; // 'flops' | 'params'

  const render = () => {
    const W = 680;
    const H = 310;
    const pad = { top: 26, right: 30, bottom: 42, left: 64 };
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top - pad.bottom;

    const minYear = 2011.5;
    const maxYear = 2026.8;
    const xOf = (yr) => pad.left + ((yr - minYear) / (maxYear - minYear)) * plotW;

    const minY = mode === "flops" ? 17.5 : -2.0; // log10(B): 0.01B = -2
    const maxY = mode === "flops" ? 27.0 : 3.5;  // log10(B): ~3000B = 3.5
    const valOf = (m) => (mode === "flops" ? m.flopsExp : Math.log10(m.paramsB));
    const yOf = (v) => pad.top + plotH - ((v - minY) / (maxY - minY)) * plotH;

    // Grid lines
    const yTicks =
      mode === "flops"
        ? [18, 20, 22, 24, 26].map((e) => ({ v: e, label: `10^${e}` }))
        : [
            { v: -2, label: "10M" },
            { v: -1, label: "100M" },
            { v: 0, label: "1B" },
            { v: 1, label: "10B" },
            { v: 2, label: "100B" },
            { v: 3, label: "1T" }
          ];

    const xTicks = [2012, 2015, 2018, 2020, 2022, 2024, 2026];

    let svgHtml = `
      <defs>
        <linearGradient id="scaleLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0D9488"/>
          <stop offset="45%" stop-color="#4F46E5"/>
          <stop offset="100%" stop-color="#EA580C"/>
        </linearGradient>
        <linearGradient id="scaleAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.20"/>
          <stop offset="100%" stop-color="#4F46E5" stop-opacity="0.01"/>
        </linearGradient>
      </defs>
    `;

    // Horizontal grid & Y labels
    yTicks.forEach((t) => {
      const y = yOf(t.v);
      svgHtml += `
        <line x1="${pad.left}" y1="${y}" x2="${W - pad.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.09" stroke-dasharray="3 4"/>
        <text x="${pad.left - 10}" y="${y + 4}" text-anchor="end" font-size="11" font-family="var(--font-mono)" fill="currentColor" opacity="0.65">${t.label}</text>
      `;
    });

    // EU AI Act 10^25 threshold line when in flops mode
    if (mode === "flops") {
      const y25 = yOf(25);
      svgHtml += `
        <line x1="${pad.left}" y1="${y25}" x2="${W - pad.right}" y2="${y25}" stroke="#EA580C" stroke-opacity="0.55" stroke-width="1.2" stroke-dasharray="6 4"/>
        <text x="${W - pad.right - 4}" y="${y25 - 6}" text-anchor="end" font-size="10.5" font-weight="600" fill="#EA580C">歐盟 AI 法案系統性風險門檻 (10²⁵ FLOPs)</text>
      `;
    }

    // X ticks
    xTicks.forEach((yr) => {
      const x = xOf(yr);
      svgHtml += `
        <text x="${x}" y="${H - 12}" text-anchor="middle" font-size="11" font-family="var(--font-mono)" fill="currentColor" opacity="0.65">${yr}</text>
      `;
    });

    // Polyline path & area
    const pts = SCALING_MODELS.map((m) => [xOf(m.year), yOf(valOf(m))]);
    const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
    const areaD = `${pathD} L ${pts[pts.length - 1][0].toFixed(1)} ${(pad.top + plotH).toFixed(1)} L ${pts[0][0].toFixed(1)} ${(pad.top + plotH).toFixed(1)} Z`;

    svgHtml += `<path d="${areaD}" fill="url(#scaleAreaGrad)"/>`;
    svgHtml += `<path d="${pathD}" fill="none" stroke="url(#scaleLineGrad)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`;

    // Points & interactive hit targets
    SCALING_MODELS.forEach((m, idx) => {
      const [cx, cy] = pts[idx];
      const dotColor = m.era === "dl" ? "#4F46E5" : m.name === "DeepSeek-R1" ? "#0D9488" : "#EA580C";
      const labelDy = idx % 2 === 0 ? -12 : 18;
      svgHtml += `
        <g class="scale-node" data-idx="${idx}" style="cursor:pointer;">
          <circle cx="${cx}" cy="${cy}" r="12" fill="transparent"/>
          <circle cx="${cx}" cy="${cy}" r="5.5" fill="${dotColor}" stroke="var(--bg-surface)" stroke-width="2.2"/>
          <text x="${cx}" y="${cy + labelDy}" text-anchor="middle" font-size="10.2" font-weight="600" fill="currentColor" opacity="0.82">${m.name}</text>
        </g>
      `;
    });

    container.setAttribute("viewBox", `0 0 ${W} ${H}`);
    container.innerHTML = svgHtml;

    container.querySelectorAll(".scale-node").forEach((node) => {
      node.addEventListener("mouseenter", (e) => {
        const m = SCALING_MODELS[Number(node.dataset.idx)];
        const rect = container.getBoundingClientRect();
        const [cx, cy] = pts[Number(node.dataset.idx)];
        const px = (cx / W) * rect.width;
        const py = (cy / H) * rect.height;

        tooltip.innerHTML = `
          <div style="font-weight:700; font-size:0.88rem; margin-bottom:4px;">${m.name} (${m.year})</div>
          <div>算力：<span style="font-family:var(--font-mono); color:#FBBF24;">${m.flopsLabel} FLOPs</span></div>
          <div>規模：<span style="font-family:var(--font-mono); color:#818CF8;">${m.paramsLabel}</span></div>
          <div style="margin-top:4px; color:#CBD5E1; font-size:0.76rem;">${m.note}</div>
        `;
        tooltip.style.left = `${Math.max(100, Math.min(rect.width - 100, px))}px`;
        tooltip.style.top = `${Math.max(40, py)}px`;
        tooltip.classList.add("visible");
      });

      node.addEventListener("mouseleave", () => {
        tooltip.classList.remove("visible");
      });
    });
  };

  modeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      mode = btn.dataset.scaleMode;
      modeBtns.forEach((b) => b.classList.toggle("active", b.dataset.scaleMode === mode));
      render();
    });
  });

  render();
}

/* --------------------------------------------------------------------------
   7. Interactive 6-Axis Radar Comparison Chart (ML vs DL vs LLM)
   -------------------------------------------------------------------------- */
function initRadarChart() {
  const svg = document.getElementById("radarChartSvg");
  const legendItems = document.querySelectorAll(".radar-toggle");

  const axes = [
    "可解釋性",
    "表格資料效能",
    "算力效率(低門檻)",
    "非結構化理解",
    "跨領域泛化",
    "複雜推理與生成"
  ];

  const series = {
    ml: { label: "機器學習 (ML)", color: "#0D9488", values: [92, 95, 94, 30, 35, 22], visible: true },
    dl: { label: "深度學習 (DL)", color: "#4F46E5", values: [36, 72, 48, 92, 65, 50], visible: true },
    llm: { label: "大型語言模型 (LLM)", color: "#EA580C", values: [30, 62, 18, 95, 96, 95], visible: true }
  };

  const render = () => {
    const cx = 185;
    const cy = 152;
    const R = 104;
    const n = axes.length;

    const pt = (axisIdx, pct) => {
      const angle = (Math.PI * 2 * axisIdx) / n - Math.PI / 2;
      const r = (pct / 100) * R;
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    };

    let out = "";
    // Concentric webs
    [25, 50, 75, 100].forEach((lvl) => {
      const pts = axes.map((_, i) => pt(i, lvl).join(",")).join(" ");
      out += `<polygon points="${pts}" fill="none" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
    });

    // Spokes & labels
    axes.forEach((label, i) => {
      const [x, y] = pt(i, 100);
      const [lx, ly] = pt(i, 123);
      out += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="currentColor" stroke-opacity="0.12"/>`;
      out += `<text x="${lx}" y="${ly + 4}" text-anchor="middle" font-size="11" font-weight="600" fill="currentColor" opacity="0.82">${label}</text>`;
    });

    // Series polygons
    Object.values(series).forEach((s) => {
      if (!s.visible) return;
      const pts = s.values.map((v, i) => pt(i, v).join(",")).join(" ");
      out += `<polygon points="${pts}" fill="${s.color}" fill-opacity="0.16" stroke="${s.color}" stroke-width="2.4"/>`;
      s.values.forEach((v, i) => {
        const [x, y] = pt(i, v);
        out += `<circle cx="${x}" cy="${y}" r="3.6" fill="${s.color}"/>`;
      });
    });

    svg.setAttribute("viewBox", "0 0 370 304");
    svg.innerHTML = out;
  };

  legendItems.forEach((item) => {
    item.addEventListener("click", () => {
      const k = item.dataset.series;
      series[k].visible = !series[k].visible;
      item.style.opacity = series[k].visible ? "1" : "0.38";
      render();
    });
  });

  render();
}

/* --------------------------------------------------------------------------
   8. Benchmark Progression Chart (MMLU & GPQA-Diamond)
   -------------------------------------------------------------------------- */
function initBenchmarkChart() {
  const box = document.getElementById("benchmarkList");
  const rows = [
    { name: "GPT-3 (2020・175B)", mmlu: 43.9, gpqa: 0, gpqaText: "尚未發布基準" },
    { name: "Llama 3 405B (2024・開源旗艦)", mmlu: 87.7, gpqa: 51.1, gpqaText: "51.1%" },
    { name: "DeepSeek-R1 (2025・671B MoE 推理)", mmlu: 90.8, gpqa: 71.5, gpqaText: "71.5% (Diamond)" },
    { name: "人類領域博士基準 (參考線)", mmlu: 89.8, gpqa: 65.0, gpqaText: "~65% (無網路查證)" }
  ];

  box.innerHTML = rows
    .map(
      (r) => `
      <div>
        <div class="bench-row-head">
          <span>${r.name}</span>
          <span style="font-size:0.78rem; color:var(--text-muted);">MMLU ${r.mmlu}% ｜ GPQA ${r.gpqaText}</span>
        </div>
        <div class="bench-bars">
          <div class="bench-track" title="MMLU: ${r.mmlu}%">
            <div class="bench-fill mmlu" style="width:${r.mmlu}%;"></div>
          </div>
          <div class="bench-track" title="GPQA Diamond: ${r.gpqaText}">
            <div class="bench-fill gpqa" style="width:${r.gpqa}%;"></div>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

/* --------------------------------------------------------------------------
   9. Filterable Historical Timeline (1943 – 2026)
   -------------------------------------------------------------------------- */
const TIMELINE_EVENTS = [
  { year: "1943", cat: "dl", title: "McCulloch-Pitts 人工神經元模型", desc: "首度以數學邏輯閘模擬生物神經元運作，種下類神經網路的理論種子。" },
  { year: "1958", cat: "ml", title: "感知器 Perceptron 誕生", desc: "Frank Rosenblatt 提出首個可從資料學習權重的二元分類器，掀開機器學習序幕。" },
  { year: "1986", cat: "dl", title: "反向傳播 (Backpropagation) 普及", desc: "Rumelhart、Hinton 與 Williams 發表經典論文，解決多層神經網路訓練的梯度更新瓶頸。" },
  { year: "1989", cat: "dl", title: "LeNet-5 卷積神經網路", desc: "Yann LeCun 將 CNN 成功應用於美國郵政手寫郵遞區號辨識，證實卷積架構威力。" },
  { year: "1995", cat: "ml", title: "支援向量機 (SVM) 與隨機森林崛起", desc: "統計學習理論成熟，核方法與集成樹模型在 1990–2000 年代稱霸結構化資料任務。" },
  { year: "1997", cat: "dl", title: "LSTM 長短期記憶網路", desc: "Hochreiter 與 Schmidhuber 引入閘控記憶單元，大幅緩解 RNN 梯度消失問題。" },
  { year: "2012", cat: "dl", title: "AlexNet 引爆深度學習革命", desc: "運用 GPU 訓練與 ReLU 激活函數在 ImageNet 競賽以懸殊差距奪冠，開啟現代 AI 紀元。" },
  { year: "2014–2015", cat: "ml", title: "XGBoost 與 ResNet 雙雄並進", desc: "XGBoost 成為表格資料競賽神兵；ResNet 靠殘差跳躍連接讓深層 CNN 突破 150 層。" },
  { year: "2017", cat: "llm", title: "Transformer《Attention Is All You Need》", desc: "Google 團隊發表純自注意力架構，徹底解放平行訓練算力，奠定所有 LLM 的共同基礎。" },
  { year: "2018–2020", cat: "llm", title: "BERT、GPT-3 與 Scaling Laws", desc: "預訓練典範成型；175B 參數的 GPT-3 展現驚人湧現能力，驗證算力與表現的冪律擴展關係。" },
  { year: "2022–2023", cat: "llm", title: "Chinchilla、RLHF 與 ChatGPT 浪潮", desc: "RLHF 對齊技術讓模型化身為流暢對話助理；GPT-4、Claude、Gemini 引領生成式 AI 普及全球。" },
  { year: "2024–2026", cat: "llm", title: "開源平權、原生全模態與推理模型時代", desc: "Llama 3 405B 與 DeepSeek-R1 實現開源追平；o 系列與 RL 思維鏈開啟「測試期算力擴展」與自主 Agent 新紀元。" }
];

function initTimeline() {
  const grid = document.getElementById("timelineGrid");
  const btns = document.querySelectorAll(".filter-btn");

  const badgeMap = {
    ml: { label: "機器學習", cls: "pill-ml" },
    dl: { label: "深度學習", cls: "pill-dl" },
    llm: { label: "大型語言模型", cls: "pill-llm" }
  };

  const render = (filter) => {
    const list = filter === "all" ? TIMELINE_EVENTS : TIMELINE_EVENTS.filter((e) => e.cat === filter);
    grid.innerHTML = list
      .map(
        (ev) => `
        <article class="timeline-card">
          <div class="timeline-top">
            <span class="timeline-year">${ev.year}</span>
            <span class="pill ${badgeMap[ev.cat].cls}">${badgeMap[ev.cat].label}</span>
          </div>
          <h4>${ev.title}</h4>
          <p>${ev.desc}</p>
        </article>
      `
      )
      .join("");
  };

  btns.forEach((b) => {
    b.addEventListener("click", () => {
      btns.forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      render(b.dataset.filter);
    });
  });

  render("all");
}

/* --------------------------------------------------------------------------
   10. Interactive Technology Decision Advisor
   -------------------------------------------------------------------------- */
const ADVISOR_SCENARIOS = [
  {
    id: "fraud",
    title: "即時信用卡詐欺偵測",
    sub: "結構化交易表格・毫秒延遲",
    rec: "首選：機器學習 (ML)",
    pillClass: "pill-ml",
    models: "XGBoost / LightGBM / 隔離森林 (Isolation Forest)",
    reason: "金融交易屬於高維度表格資料，需在數毫秒內完成判別並能向法遵解釋拒絕原因。梯度提升樹（GBDT）在此類任務上比大型模型更準、更快且硬體成本極低。"
  },
  {
    id: "medical",
    title: "醫療 X 光 / MRI 病灶辨識",
    sub: "高解析度影像・空間特徵",
    rec: "首選：深度學習 (DL)",
    pillClass: "pill-dl",
    models: "ResNet / ConvNeXt / Vision Transformer (ViT) / U-Net",
    reason: "醫療影像為高度非結構化像素資料，人工難以設計有效紋理特徵。CNN 與 ViT 透過端對端訓練可精準自動分割微小腫瘤與異常組織。"
  },
  {
    id: "rag",
    title: "企業內部知識庫問答助理",
    sub: "萬份 PDF 手冊與規章檢索",
    rec: "首選：大型語言模型 (LLM + RAG)",
    pillClass: "pill-llm",
    models: "Frontier LLM + 向量檢索增強生成 (RAG)",
    reason: "透過嵌入模型（Embedding）將內部文件向量化檢索，再由 LLM 結合上下文生成精準附帶引用的回答，免去高昂重訓成本並大幅降低幻覺。"
  },
  {
    id: "maintenance",
    title: "工廠機台預測性維護",
    sub: "感測器數值・溫度與震動時序",
    rec: "首選：機器學習或輕量深度學習",
    pillClass: "pill-ml",
    models: "隨機森林 / LightGBM（表格特徵）或 LSTM / 1D-CNN（高頻波形）",
    reason: "若以分鐘級統計指標為主，傳統 ML 模型訓練快且易於部署在工廠邊緣端；若直接輸入高採樣率震動聲學波形，則適合輕量深度學習時序網路。"
  },
  {
    id: "coding",
    title: "複雜程式碼重構與數學推導",
    sub: "跨檔案除錯・多步驟邏輯驗證",
    rec: "首選：推理型大型語言模型 (Reasoning LLM)",
    pillClass: "pill-llm",
    models: "推理模型（如 o 系列、DeepSeek-R1、Gemini / Claude 前沿推理模式）",
    reason: "此類任務需要 System-2 慢思考能力：透過測試期算力擴展與內部思維鏈（CoT）自我驗證假設、追蹤相依性並執行工具測試，遠勝單次快答模型。"
  },
  {
    id: "segment",
    title: "電商顧客分群與精準行銷",
    sub: "無標註消費紀錄・探索族群",
    rec: "首選：非監督式機器學習 (ML)",
    pillClass: "pill-ml",
    models: "K-Means 分群 / DBSCAN / PCA 降維",
    reason: "在缺乏預先定義標籤的情況下，非監督式分群演算法能在數秒內自動將數百萬筆會員依購買頻率、客單價與品類偏好切分出可執行的行銷族群。"
  }
];

function initDecisionAdvisor() {
  const grid = document.getElementById("scenarioGrid");
  const result = document.getElementById("advisorResult");

  const renderResult = (id) => {
    const s = ADVISOR_SCENARIOS.find((x) => x.id === id) || ADVISOR_SCENARIOS[0];
    grid.querySelectorAll(".scenario-btn").forEach((b) => b.classList.toggle("active", b.dataset.id === s.id));
    result.innerHTML = `
      <span class="advisor-badge pill ${s.pillClass}">${s.rec}</span>
      <div>
        <div style="font-weight:700; font-size:1.02rem; margin-bottom:6px;">推薦技術棧：<span style="font-family:var(--font-mono); font-size:0.9rem;">${s.models}</span></div>
        <p style="margin:0; font-size:0.92rem; color:var(--text-secondary);">${s.reason}</p>
      </div>
    `;
  };

  grid.innerHTML = ADVISOR_SCENARIOS.map(
    (s) => `
    <button class="scenario-btn" data-id="${s.id}">
      <strong>${s.title}</strong>
      <span>${s.sub}</span>
    </button>
  `
  ).join("");

  grid.querySelectorAll(".scenario-btn").forEach((btn) => {
    btn.addEventListener("click", () => renderResult(btn.dataset.id));
  });

  renderResult("fraud");
}

/* --------------------------------------------------------------------------
   11. Searchable AI Glossary
   -------------------------------------------------------------------------- */
const GLOSSARY_TERMS = [
  { term: "特徵工程 Feature Engineering", cat: "ml", desc: "由領域專家將原始資料轉換為更能代表問題本質的輸入特徵，是傳統機器學習成敗的關鍵。" },
  { term: "梯度提升 Gradient Boosting", cat: "ml", desc: "如 XGBoost、LightGBM，透過序列式建立多棵決策樹，每一棵專門修正前一棵的預測殘差。" },
  { term: "反向傳播 Backpropagation", cat: "dl", desc: "利用微積分鏈鎖律將輸出誤差逐層回傳，計算每個神經元權重的梯度以驅動學習的核心演算法。" },
  { term: "殘差連接 Residual Connection", cat: "dl", desc: "ResNet 提出的跳躍捷徑（y = F(x) + x），讓梯度能無阻礙地深層回傳，解決梯度消失問題。" },
  { term: "自注意力機制 Self-Attention", cat: "llm", desc: "Transformer 的心臟，透過 Query、Key、Value 矩陣運算平行衡量序列中任兩詞元的關聯強度。" },
  { term: "詞元 Token & Context Window", cat: "llm", desc: "LLM 處理文字的基本單位（字根或字詞）；上下文視窗則決定模型單次能同時記住與處理的資訊長度（現已達百萬級）。" },
  { term: "擴展定律 Scaling Laws", cat: "llm", desc: "描述模型損失隨算力（C）、參數量（N）與資料量（D）呈冪律穩定下降的經驗法則，C ≈ 6ND。" },
  { term: "RLHF 人類回饋強化學習", cat: "llm", desc: "透過人類偏好標註訓練獎勵模型，再用強化學習將基礎語言模型「對齊」成安全、有幫助的對話助理。" },
  { term: "檢索增強生成 RAG", cat: "llm", desc: "在生成答案前先從外部資料庫檢索即時權威段落塞入提示詞，有效降低幻覺並整合企業私有知識。" },
  { term: "混合專家 MoE", cat: "llm", desc: "將龐大模型切分為多個專家模組，每次推論僅動態啟動少數專家，兼顧兆級知識容量與高效推論速度。" },
  { term: "測試期算力 Test-Time Compute", cat: "llm", desc: "2025–2026 推理模型核心典範：讓模型在回答前投入更多推論算力進行思維鏈搜尋、反覆驗證與自我修正。" },
  { term: "原生全模態 Native Multimodal", cat: "llm", desc: "將文字、影像、音訊與影片統一詞元化進入同一個神經骨幹處理，不再依賴拼裝式轉接器。" }
];

function initGlossary() {
  const input = document.getElementById("glossarySearch");
  const grid = document.getElementById("glossaryGrid");

  const badgeMap = {
    ml: { label: "ML", cls: "pill-ml" },
    dl: { label: "DL", cls: "pill-dl" },
    llm: { label: "LLM", cls: "pill-llm" }
  };

  const render = (q = "") => {
    const query = q.trim().toLowerCase();
    const filtered = GLOSSARY_TERMS.filter(
      (item) =>
        item.term.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.cat.includes(query)
    );

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="color:var(--text-muted); padding:20px 0;">找不到符合「${q}」的關鍵詞，請試著搜尋 Transformer、XGBoost、RAG 或 MoE。</div>`;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (item) => `
        <div class="glossary-card">
          <h4>
            <span>${item.term}</span>
            <span class="pill ${badgeMap[item.cat].cls}" style="font-size:0.7rem; padding:2px 8px;">${badgeMap[item.cat].label}</span>
          </h4>
          <p>${item.desc}</p>
        </div>
      `
      )
      .join("");
  };

  input.addEventListener("input", (e) => render(e.target.value));
  render();
}


/* ==========================================================================
   12. ML Deep-Dive: Bias–Variance Tradeoff & Overfitting Simulator
   ========================================================================== */
function initBiasVarianceLab() {
  const slider = document.getElementById("mlComplexitySlider");
  const readout = document.getElementById("mlComplexityVal");
  const fitSvg = document.getElementById("mlFitSvg");
  const errSvg = document.getElementById("mlErrorSvg");
  const commentary = document.getElementById("mlBvCommentary");
  if (!slider || !fitSvg || !errSvg) return;

  // Fixed noisy samples along y = 0.5 + 0.32*sin(1.4*pi*x)
  const samples = [
    { x: 0.06, y: 0.58 }, { x: 0.14, y: 0.77 }, { x: 0.22, y: 0.85 },
    { x: 0.30, y: 0.74 }, { x: 0.38, y: 0.86 }, { x: 0.46, y: 0.65 },
    { x: 0.54, y: 0.44 }, { x: 0.62, y: 0.29 }, { x: 0.70, y: 0.20 },
    { x: 0.78, y: 0.31 }, { x: 0.86, y: 0.19 }, { x: 0.94, y: 0.42 }
  ];

  const trueFn = (x) => 0.52 + 0.30 * Math.sin(2.0 * Math.PI * x);

  // Smooth curve approximation for complexity c = 1..10
  const predFn = (x, c) => {
    if (c === 1) return 0.76 - 0.50 * x; // linear underfit
    if (c === 2) return 0.66 - 0.30 * x + 0.18 * Math.sin(Math.PI * x);
    if (c === 3) return 0.54 + 0.24 * Math.sin(1.9 * Math.PI * x);
    if (c === 4 || c === 5) return trueFn(x) + (c === 5 ? 0.015 * Math.sin(7 * Math.PI * x) : 0);
    // High complexity c=6..10 progressively interpolates noise
    const amp = (c - 5) * 0.038;
    return trueFn(x) + amp * Math.sin((10 + c * 2.1) * Math.PI * x) + amp * 0.55 * Math.cos((7 + c) * Math.PI * x);
  };

  // Precomputed conceptual Train / Val error for c = 1..10
  const trainErr = [0, 0.72, 0.52, 0.31, 0.20, 0.16, 0.12, 0.08, 0.05, 0.03, 0.015];
  const valErr   = [0, 0.78, 0.56, 0.35, 0.24, 0.23, 0.31, 0.44, 0.60, 0.78, 0.94];

  const render = (c) => {
    readout.textContent = `複雜度 ${c} / 10`;

    // ---- Left SVG: Curve Fitting ----
    const W = 420, H = 225, pad = { l: 38, r: 16, t: 18, b: 30 };
    const pW = W - pad.l - pad.r, pH = H - pad.t - pad.b;
    const xMap = (x) => pad.l + x * pW;
    const yMap = (y) => pad.t + (1 - Math.max(0.02, Math.min(0.98, y))) * pH;

    let truePts = [], predPts = [];
    for (let i = 0; i <= 80; i++) {
      const x = i / 80;
      truePts.push(`${i === 0 ? "M" : "L"} ${xMap(x).toFixed(1)} ${yMap(trueFn(x)).toFixed(1)}`);
      predPts.push(`${i === 0 ? "M" : "L"} ${xMap(x).toFixed(1)} ${yMap(predFn(x, c)).toFixed(1)}`);
    }

    const fitColor = c <= 2 ? "#D97706" : c <= 5 ? "#0D9488" : "#EF4444";
    fitSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    fitSvg.innerHTML = `
      <line x1="${pad.l}" y1="${H - pad.b}" x2="${W - pad.r}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.2"/>
      <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.2"/>
      <path d="${truePts.join(" ")}" fill="none" stroke="currentColor" stroke-opacity="0.32" stroke-width="1.8" stroke-dasharray="5 4"/>
      <path d="${predPts.join(" ")}" fill="none" stroke="${fitColor}" stroke-width="2.8" stroke-linecap="round"/>
      ${samples.map(s => `<circle cx="${xMap(s.x).toFixed(1)}" cy="${yMap(s.y).toFixed(1)}" r="4.2" fill="#4F46E5" stroke="var(--bg-surface)" stroke-width="1.5"/>`).join("")}
      <text x="${W - pad.r}" y="${pad.t + 8}" text-anchor="end" font-size="10" fill="currentColor" opacity="0.6">虛線＝真實規律｜實線＝模型預測</text>
      <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="10.5" fill="currentColor" opacity="0.65">輸入特徵 X</text>
    `;

    // ---- Right SVG: Bias-Variance U-Curve ----
    const ex = (k) => pad.l + ((k - 1) / 9) * pW;
    const ey = (e) => pad.t + (1 - e) * pH;
    const trainPath = trainErr.slice(1).map((e, i) => `${i === 0 ? "M" : "L"} ${ex(i + 1).toFixed(1)} ${ey(e).toFixed(1)}`).join(" ");
    const valPath   = valErr.slice(1).map((e, i) => `${i === 0 ? "M" : "L"} ${ex(i + 1).toFixed(1)} ${ey(e).toFixed(1)}`).join(" ");
    const curX = ex(c);

    errSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    errSvg.innerHTML = `
      <rect x="${ex(3.5)}" y="${pad.t}" width="${ex(5.5) - ex(3.5)}" height="${pH}" fill="rgba(13,148,136,0.10)"/>
      <text x="${ex(4.5)}" y="${pad.t + 14}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#0D9488">最佳泛化區</text>
      <line x1="${pad.l}" y1="${H - pad.b}" x2="${W - pad.r}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.2"/>
      <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.2"/>
      <path d="${trainPath}" fill="none" stroke="#0D9488" stroke-width="2.4"/>
      <path d="${valPath}" fill="none" stroke="#EA580C" stroke-width="2.6"/>
      <line x1="${curX}" y1="${pad.t}" x2="${curX}" y2="${H - pad.b}" stroke="${fitColor}" stroke-width="1.8" stroke-dasharray="4 3"/>
      <circle cx="${curX}" cy="${ey(trainErr[c])}" r="5" fill="#0D9488" stroke="var(--bg-surface)" stroke-width="1.8"/>
      <circle cx="${curX}" cy="${ey(valErr[c])}" r="5" fill="#EA580C" stroke="var(--bg-surface)" stroke-width="1.8"/>
      <text x="${W - pad.r}" y="${ey(valErr[10]) + 14}" text-anchor="end" font-size="10" font-weight="700" fill="#EA580C">測試誤差 (Validation)</text>
      <text x="${W - pad.r}" y="${ey(trainErr[10]) - 6}" text-anchor="end" font-size="10" font-weight="700" fill="#0D9488">訓練誤差 (Train)</text>
      <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="10.5" fill="currentColor" opacity="0.65">模型複雜度（左：高偏差 ｜ 右：高變異）</text>
    `;

    // ---- Dynamic Text Commentary ----
    let statusTitle, statusText, tips;
    if (c <= 2) {
      statusTitle = "⚠️ 目前狀態：欠擬合 Underfitting（高偏差 High Bias）";
      statusText = "模型結構過於簡單（例如僅用一條直線擬合彎曲規律），連訓練資料的基本趨勢都抓不住，因此「訓練誤差」與「測試誤差」同時居高不下。這代表模型尚未充分學習資料特徵。";
      tips = [
        "增加模型表達能力（提高多項式次數、改用非線性樹模型或核函數 SVM）。",
        "進行更深入的特徵工程，加入交互特徵或領域衍生欄位。",
        "適度降低過強的正則化懲罰係數（λ）。"
      ];
    } else if (c <= 5) {
      statusTitle = "✅ 目前狀態：最佳泛化平衡點（Optimal Bias–Variance Sweet Spot）";
      statusText = "模型精準捕捉真實訊號曲線（灰色虛線），同時忽略隨機量測雜訊。此時測試誤差（橘線）處於 U 型曲線最低谷，面對從未見過的新資料時預測最穩健！";
      tips = [
        "使用 K 折交叉驗證（K-Fold Cross-Validation）客觀確認最佳複雜度。",
        "實務上常透過 Bagging（隨機森林）降變異，或 Boosting（XGBoost）降偏差。",
        "保留獨立的測試集（Hold-out Test Set）避免驗證集過度調參。"
      ];
    } else {
      statusTitle = "🚨 目前狀態：過擬合 Overfitting（高變異 High Variance）";
      statusText = "模型過度複雜，開始「死背」訓練樣本中的隨機雜訊！雖然左圖曲線幾乎穿過每個點、訓練誤差（綠線）逼近 0，但右圖測試誤差（橘線）急劇飆升，一換新資料就嚴重失準。";
      tips = [
        "加入正則化懲罰：L1（Lasso 促進稀疏特徵篩選）或 L2（Ridge 限制權重過大）。",
        "限制決策樹最大深度（max_depth）、增加葉節點最小樣本數或啟用早停（Early Stopping）。",
        "擴充更多高品質訓練樣本，稀釋單點雜訊影響。"
      ];
    }

    commentary.innerHTML = `
      <div>
        <h4>${statusTitle}</h4>
        <p>${statusText}</p>
        <div class="formula-chip">泛化誤差分解：E[Error] = Bias²（偏差平方） + Variance（變異數） + σ²（不可消減雜訊）</div>
      </div>
      <div class="key-points-box">
        <strong>📌 實務工程解方</strong>
        <ul>${tips.map(t => `<li>${t}</li>`).join("")}</ul>
      </div>
    `;
  };

  slider.addEventListener("input", () => render(Number(slider.value)));
  render(Number(slider.value));
}

/* ==========================================================================
   13. ML Deep-Dive: Classical Algorithm Map (Interpretability vs Expressiveness)
   ========================================================================== */
function initMlAlgoMap() {
  const svg = document.getElementById("mlAlgoMapSvg");
  const detail = document.getElementById("mlAlgoDetail");
  if (!svg || !detail) return;

  const algos = [
    { id: "linear", name: "線性 / 邏輯迴歸", x: 22, y: 92, r: 15, color: "#0D9488", type: "監督式・線性基準",
      intuition: "尋找權重向量 w 使線性組合 y = w·x + b（或經 Sigmoid 轉為機率）最小化誤差。",
      pro: "訓練極快、每個欄位權重具直接商業因果解讀力，金融信用評分首選基準。",
      con: "無法直接捕捉複雜非線性交互關係，容易受離群值影響。" },
    { id: "tree", name: "決策樹 Decision Tree", x: 46, y: 82, r: 14, color: "#14B8A6", type: "監督式・規則切分",
      intuition: "依資訊增益或吉尼不純度（Gini）反覆以 if-else 條件將資料切分為最純淨的子群。",
      pro: "視覺化規則連非技術主管都能看懂，不需對特徵做標準化縮放。",
      con: "單棵樹極易過擬合，資料微小變動可能導致整棵樹結構重排。" },
    { id: "kmeans", name: "K-Means 分群", x: 35, y: 66, r: 14, color: "#0284C7", type: "非監督式・分群",
      intuition: "反覆迭代「指派資料至最近質心 → 重新計算群組平均中心」直到收斂。",
      pro: "無需人工標註即可從海量資料挖掘潛在族群（如會員分群、異常點探勘）。",
      con: "需事先指定群數 K，對非球狀分佈與極端值敏感。" },
    { id: "svm", name: "支援向量機 SVM", x: 70, y: 42, r: 15, color: "#6366F1", type: "監督式・最大邊界",
      intuition: "尋找讓兩類樣本間隔（Margin）最大化的超平面，並用核技巧（Kernel Trick）映射至高維解決非線性分類。",
      pro: "在高維小樣本場景（如生醫基因分類、早期文本分類）表現極其穩健。",
      con: "面對數百萬筆超大資料時訓練時間與記憶體成本飆升。" },
    { id: "rf", name: "隨機森林 Random Forest", x: 78, y: 54, r: 17, color: "#0F766E", type: "集成學習・Bagging",
      intuition: "透過自助抽樣（Bootstrap）平行訓練數百棵去相關的決策樹，以多數決或平均大幅降低變異數。",
      pro: "幾乎不需繁瑣調參就能取得高水準效能，抗雜訊且可輸出特徵重要性。",
      con: "模型體積較大、推論延遲略高於單棵樹，且可解釋性下降。" },
    { id: "xgb", name: "XGBoost / LightGBM", x: 92, y: 36, r: 19, color: "#EA580C", type: "集成學習・Gradient Boosting",
      intuition: "以序列式建立新決策樹，每一棵樹專門擬合前面所有樹留下的「負梯度（殘差）」，並內建 L1/L2 樹結構正則化。",
      pro: "Kaggle 表格資料競賽與金融/電商實務的絕對霸主，兼顧極致精度與高速訓練。",
      con: "超參數較多需細緻調校，對不規則非結構化影像/純文本不擅長。" }
  ];

  const W = 500, H = 260, pad = { l: 54, r: 24, t: 22, b: 40 };
  const pW = W - pad.l - pad.r, pH = H - pad.t - pad.b;
  const xOf = (v) => pad.l + (v / 100) * pW;
  const yOf = (v) => pad.t + (1 - v / 100) * pH;

  let activeId = "xgb";

  const render = () => {
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.innerHTML = `
      <rect x="${pad.l}" y="${pad.t}" width="${pW}" height="${pH}" fill="transparent" stroke="currentColor" stroke-opacity="0.12"/>
      <line x1="${pad.l + pW / 2}" y1="${pad.t}" x2="${pad.l + pW / 2}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.1" stroke-dasharray="4 4"/>
      <line x1="${pad.l}" y1="${pad.t + pH / 2}" x2="${W - pad.r}" y2="${pad.t + pH / 2}" stroke="currentColor" stroke-opacity="0.1" stroke-dasharray="4 4"/>
      <text x="${W / 2}" y="${H - 8}" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7">非線性擬合與預測效能 →</text>
      <text x="16" y="${H / 2}" text-anchor="middle" font-size="11" fill="currentColor" opacity="0.7" transform="rotate(-90 16 ${H / 2})">模型可解釋性 →</text>
      ${algos.map(a => {
        const cx = xOf(a.x), cy = yOf(a.y);
        const sel = a.id === activeId;
        return `
          <g class="ml-algo-node" data-id="${a.id}" style="cursor:pointer;">
            <circle cx="${cx}" cy="${cy}" r="${sel ? a.r + 4 : a.r}" fill="${a.color}" fill-opacity="${sel ? 0.92 : 0.35}" stroke="${a.color}" stroke-width="${sel ? 3 : 1.8}"/>
            <text x="${cx}" y="${cy - a.r - 7}" text-anchor="middle" font-size="10.8" font-weight="${sel ? 700 : 600}" fill="currentColor">${a.name}</text>
          </g>
        `;
      }).join("")}
    `;

    const cur = algos.find(a => a.id === activeId);
    detail.innerHTML = `
      <span class="pill pill-ml" style="margin-bottom:10px;">${cur.type}</span>
      <h4 style="margin:0 0 8px; font-size:1.12rem;">${cur.name}</h4>
      <p style="margin:0 0 12px; font-size:0.88rem; color:var(--text-secondary);"><strong>核心數學直覺：</strong>${cur.intuition}</p>
      <div class="arch-stat-row">
        <div class="arch-stat" style="border-left-color:var(--ml-color);"><strong>優勢：</strong>${cur.pro}</div>
        <div class="arch-stat warn"><strong>限制：</strong>${cur.con}</div>
      </div>
    `;

    svg.querySelectorAll(".ml-algo-node").forEach(node => {
      node.addEventListener("click", () => {
        activeId = node.dataset.id;
        render();
      });
    });
  };

  render();
}

/* ==========================================================================
   14. DL Deep-Dive: Gradient Descent & Learning Rate Dynamics
   ========================================================================== */
function initGradientDescentLab() {
  const btns = document.querySelectorAll("[data-gd-mode]");
  const landSvg = document.getElementById("gdLandscapeSvg");
  const lossSvg = document.getElementById("gdLossSvg");
  const commentary = document.getElementById("gdCommentary");
  if (!landSvg || !lossSvg) return;

  // Convex bowl L(w) = 0.5 * w^2, dL/dw = w, start w0 = -3.2
  const modes = {
    small: {
      label: "學習率過小 (η = 0.08)",
      eta: 0.08,
      color: "#0D9488",
      title: "🐢 學習率過小：步伐太保守，收斂極度緩慢",
      desc: "每次沿負梯度只跨出一小步，訓練 14 個週期仍離谷底甚遠。在動輒數十億參數的深度網路中，過小學習率不只浪費昂貴 GPU 電費，還容易卡在局部平坦區域（Saddle Point）動彈不得。",
      points: [
        "左圖可見紅點密集擠在左側山坡，移動距離微乎其微。",
        "右圖損失曲線（實線）下降斜率平緩，遠落後於最佳收斂基準（虛線）。",
        "實務對策：透過 Learning Rate Finder 測試適當起始值，或改用自適應優化器 AdamW。"
      ]
    },
    optimal: {
      label: "黃金學習率 (η = 0.35)",
      eta: 0.35,
      color: "#4F46E5",
      title: "🎯 黃金學習率：大步下坡、精準煞停在谷底",
      desc: "初期斜率大因此跨步迅速降低誤差，越接近最低點時梯度自然變小，步伐也隨之縮短並平穩收斂至全域最小損失 w* = 0。",
      points: [
        "左圖軌跡以流暢步伐直指拋物線谷底，幾乎無多餘回彈。",
        "右圖損失曲線呈現經典平滑 L 型指數下降，是最理想的訓練訊號。",
        "實務標準：搭配「線性 Warmup + Cosine Annealing 餘弦退火」，後期進一步微調精度。"
      ]
    },
    large: {
      label: "學習率過大 (η = 1.92)",
      eta: 1.92,
      color: "#EF4444",
      title: "💥 學習率過大：跨越谷底來回劇烈震盪，甚至發散爆炸",
      desc: "單次更新步幅超過谷底寬度，參數在左右兩側山壁間劇烈反彈！若學習率再稍高（η > 2.0），損失值將呈指數發散並出現 NaN 崩潰。",
      points: [
        "左圖可見鋸齒狀劇烈跳躍橫跨兩側山坡，始終無法安穩落地。",
        "右圖損失曲線居高不下且下降極慢（更高時會直接衝破天花板）。",
        "實務對策：立即調降學習率、啟用梯度裁剪（Gradient Clipping）並加入 LayerNorm 穩定數值。"
      ]
    },
    adam: {
      label: "AdamW 自適應動量優化",
      eta: 0.45,
      isAdam: true,
      color: "#D97706",
      title: "⚡ AdamW（動量 + 自適應縮放）：現代深度學習與 LLM 絕對標配",
      desc: "結合一階動量（Momentum，記憶慣性方向衝過平坦鞍點）與二階梯度平方移動平均（為每個參數獨立調整專屬步長），並解耦權重衰減正則化，在複雜高維非凸地形上收斂最快最穩。",
      points: [
        "前幾步快速累積下坡慣性，極速逼近最小損失區域。",
        "不需對數億個權重手工統一調參，對稀疏梯度（如文字詞嵌入）格外友善。",
        "幾乎所有前沿 Transformer 與 LLM（GPT、Llama、DeepSeek）皆採用 AdamW。"
      ]
    }
  };

  let active = "optimal";

  const simulate = (cfg) => {
    const steps = 12;
    const ws = [-3.2];
    const losses = [0.5 * (-3.2) ** 2];
    let w = -3.2, m = 0, v = 0;
    for (let t = 1; t <= steps; t++) {
      const g = w;
      if (cfg.isAdam) {
        m = 0.72 * m + 0.28 * g;
        v = 0.9 * v + 0.1 * g * g;
        const mHat = m / (1 - Math.pow(0.72, t));
        const vHat = v / (1 - Math.pow(0.9, t));
        w = w - 0.62 * mHat / (Math.sqrt(vHat) + 1e-6);
      } else {
        w = w - cfg.eta * g;
      }
      ws.push(w);
      losses.push(0.5 * w * w);
    }
    return { ws, losses };
  };

  const optSim = simulate(modes.optimal);

  const render = () => {
    const cfg = modes[active];
    const sim = simulate(cfg);
    btns.forEach(b => b.classList.toggle("active", b.dataset.gdMode === active));

    // ---- Left SVG: Loss Landscape ----
    const W = 420, H = 225, pad = { l: 38, r: 16, t: 18, b: 30 };
    const pW = W - pad.l - pad.r, pH = H - pad.t - pad.b;
    const xW = (w) => pad.l + ((w + 3.6) / 7.2) * pW;
    const yL = (l) => pad.t + (1 - Math.min(6.2, l) / 6.2) * pH;

    let bowl = [];
    for (let i = 0; i <= 72; i++) {
      const w = -3.5 + (i / 72) * 7.0;
      bowl.push(`${i === 0 ? "M" : "L"} ${xW(w).toFixed(1)} ${yL(0.5 * w * w).toFixed(1)}`);
    }

    const stepPath = sim.ws.map((w, i) => `${i === 0 ? "M" : "L"} ${xW(w).toFixed(1)} ${yL(sim.losses[i]).toFixed(1)}`).join(" ");

    landSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    landSvg.innerHTML = `
      <line x1="${pad.l}" y1="${H - pad.b}" x2="${W - pad.r}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.2"/>
      <line x1="${xW(0)}" y1="${pad.t}" x2="${xW(0)}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.14" stroke-dasharray="3 3"/>
      <path d="${bowl.join(" ")}" fill="none" stroke="currentColor" stroke-opacity="0.30" stroke-width="2.2"/>
      <path d="${stepPath}" fill="none" stroke="${cfg.color}" stroke-width="2.2" stroke-dasharray="4 2"/>
      ${sim.ws.map((w, i) => `<circle cx="${xW(w).toFixed(1)}" cy="${yL(sim.losses[i]).toFixed(1)}" r="${i === 0 || i === sim.ws.length - 1 ? 5.2 : 3.4}" fill="${cfg.color}" stroke="var(--bg-surface)" stroke-width="1.4"/>`).join("")}
      <text x="${xW(0)}" y="${H - 8}" text-anchor="middle" font-size="10.5" fill="currentColor" opacity="0.7">最優權重 w*</text>
      <text x="${xW(-3.2)}" y="${yL(5.12) - 8}" text-anchor="start" font-size="10" font-weight="700" fill="${cfg.color}">起點 w₀</text>
    `;

    // ---- Right SVG: Loss vs Epoch ----
    const xE = (e) => pad.l + (e / 12) * pW;
    const baseCurve = optSim.losses.map((l, i) => `${i === 0 ? "M" : "L"} ${xE(i).toFixed(1)} ${yL(l).toFixed(1)}`).join(" ");
    const curCurve  = sim.losses.map((l, i) => `${i === 0 ? "M" : "L"} ${xE(i).toFixed(1)} ${yL(l).toFixed(1)}`).join(" ");

    lossSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    lossSvg.innerHTML = `
      <line x1="${pad.l}" y1="${H - pad.b}" x2="${W - pad.r}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.2"/>
      <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.2"/>
      <path d="${baseCurve}" fill="none" stroke="currentColor" stroke-opacity="0.25" stroke-width="1.8" stroke-dasharray="4 4"/>
      <path d="${curCurve}" fill="none" stroke="${cfg.color}" stroke-width="2.8" stroke-linecap="round"/>
      ${sim.losses.map((l, i) => `<circle cx="${xE(i).toFixed(1)}" cy="${yL(l).toFixed(1)}" r="3.2" fill="${cfg.color}"/>`).join("")}
      <text x="${W - pad.r}" y="${pad.t + 10}" text-anchor="end" font-size="10" fill="currentColor" opacity="0.6">虛線＝標準收斂參考線</text>
      <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="10.5" fill="currentColor" opacity="0.65">訓練迭代步數 (Steps 0 → 12)</text>
    `;

    commentary.innerHTML = `
      <div>
        <h4>${cfg.title}</h4>
        <p>${cfg.desc}</p>
        <div class="formula-chip">參數更新公式：θ(t+1) = θ(t) − η · ∇L(θ) ｜ 目前最終 Loss = ${sim.losses[sim.losses.length - 1].toFixed(3)}</div>
      </div>
      <div class="key-points-box">
        <strong>📌 圖表解讀重點</strong>
        <ul>${cfg.points.map(p => `<li>${p}</li>`).join("")}</ul>
      </div>
    `;
  };

  btns.forEach(b => b.addEventListener("click", () => { active = b.dataset.gdMode; render(); }));
  render();
}

/* ==========================================================================
   15. DL Deep-Dive: Activation Functions & Derivatives Dual Plot
   ========================================================================== */
function initActivationChart() {
  const btns = document.querySelectorAll("[data-act-fn]");
  const fnSvg = document.getElementById("actFnSvg");
  const derSvg = document.getElementById("actDerSvg");
  const commentary = document.getElementById("actCommentary");
  if (!fnSvg || !derSvg) return;

  const erfApprox = (x) => {
    const sign = x >= 0 ? 1 : -1;
    const ax = Math.abs(x);
    const t = 1 / (1 + 0.3275911 * ax);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax);
    return sign * y;
  };

  const fns = {
    sigmoid: {
      name: "Sigmoid", color: "#0D9488",
      f: (x) => 1 / (1 + Math.exp(-x)),
      df: (x) => { const s = 1 / (1 + Math.exp(-x)); return s * (1 - s); },
      formula: "σ(x) = 1 / (1 + e⁻ˣ) ｜ 最大導數僅 0.25",
      title: "Sigmoid：早期機率壓縮經典，卻也是「梯度消失」元兇",
      desc: "能將任意實數平滑壓縮至 (0, 1) 區間，極適合二元分類輸出層。但觀察右圖導數曲線：當 |x| > 4 時導數近乎 0，且連中心點最大梯度都僅有 0.25！深層網路反向傳播每乘一層就縮水至少 4 倍，十層後梯度幾乎歸零。",
      points: [
        "優點：輸出具明確機率語意，平滑可微。",
        "致命缺陷：飽和區梯度趨近於 0，導致深層網路前幾層無法學習。",
        "現代定位：不再用於隱藏層，僅保留在二元分類輸出層與 LSTM 閘控單元。"
      ]
    },
    tanh: {
      name: "Tanh", color: "#0284C7",
      f: (x) => Math.tanh(x),
      df: (x) => 1 - Math.tanh(x) ** 2,
      formula: "tanh(x) = (eˣ − e⁻ˣ) / (eˣ + e⁻ˣ) ｜ 零中心對稱",
      title: "Tanh：零中心對稱改良版，但極端區間依然飽和",
      desc: "將數值映射至 (-1, 1) 且以 0 為中心，解決了 Sigmoid 輸出恆正造成梯度更新鋸齒震盪的問題，中心最大導數也提升到 1.0。但在極大/極小輸入時，右圖導數曲線依然會掉回 0。",
      points: [
        "優點：零中心化（Zero-Centered），比 Sigmoid 收斂更快。",
        "限制：兩端飽和區梯度仍會消失，計算指數函數成本較高。",
        "常見場景：傳統 RNN / LSTM 隱藏狀態更新。"
      ]
    },
    relu: {
      name: "ReLU", color: "#4F46E5",
      f: (x) => Math.max(0, x),
      df: (x) => (x > 0 ? 1 : 0),
      formula: "ReLU(x) = max(0, x) ｜ 正半軸導數恆等於 1",
      title: "ReLU：點燃 2012 深度學習大爆發的極簡神兵",
      desc: "只要輸入大於 0 就原樣通過、小於 0 直接截斷為 0。觀察右圖：整個正半軸導數恆等於 1！梯度無損穿透數十甚至上百層，加上計算只需一次比較運算，讓 AlexNet 與 ResNet 訓練速度飆升數倍。",
      points: [
        "優點：徹底緩解正區間梯度消失、計算極快、自帶稀疏激活效果。",
        "缺點：負半軸導數為 0，可能出現部分神經元永久停止更新（Dying ReLU）。",
        "常見場景：CNN 視覺骨幹（ResNet、VGG）與高效邊緣端深度網路。"
      ]
    },
    gelu: {
      name: "GELU", color: "#EA580C",
      f: (x) => 0.5 * x * (1 + erfApprox(x / Math.SQRT2)),
      df: (x) => {
        const cdf = 0.5 * (1 + erfApprox(x / Math.SQRT2));
        const pdf = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
        return cdf + x * pdf;
      },
      formula: "GELU(x) = x · Φ(x) ｜ BERT、GPT 與前沿 Transformer 標配",
      title: "GELU：結合隨機正則化直覺的平滑曲線，現代 LLM 的首選",
      desc: "Gaussian Error Linear Unit 依據輸入值落於標準常態分佈的機率進行平滑加權。觀察左、右圖：它在 x = 0 附近沒有 ReLU 的尖銳折角，且對微小負值保留平滑非零梯度，讓超大型 Transformer 訓練更加穩定流暢。",
      points: [
        "優點：處處平滑可微、避免 Dead Neuron、表達能力優於傳統 ReLU。",
        "延伸演進：Llama 3 與 DeepSeek 等前沿 LLM 進一步採用結合門控機制的 SwiGLU。",
        "常見場景：BERT、GPT 系列、ViT 與幾乎所有現代大型語言模型。"
      ]
    }
  };

  let active = "gelu";

  const drawPlot = (svg, keys, isDeriv) => {
    const W = 420, H = 220, pad = { l: 42, r: 16, t: 18, b: 28 };
    const pW = W - pad.l - pad.r, pH = H - pad.t - pad.b;
    const xMin = -4.5, xMax = 4.5;
    const yMin = isDeriv ? -0.25 : -1.4;
    const yMax = isDeriv ? 1.35 : 3.2;

    const xOf = (x) => pad.l + ((x - xMin) / (xMax - xMin)) * pW;
    const yOf = (y) => pad.t + (1 - (Math.max(yMin, Math.min(yMax, y)) - yMin) / (yMax - yMin)) * pH;

    let paths = "";
    keys.forEach((k) => {
      const obj = fns[k];
      const fn = isDeriv ? obj.df : obj.f;
      const pts = [];
      for (let i = 0; i <= 120; i++) {
        const x = xMin + (i / 120) * (xMax - xMin);
        pts.push(`${i === 0 ? "M" : "L"} ${xOf(x).toFixed(1)} ${yOf(fn(x)).toFixed(1)}`);
      }
      const isFocus = active === "all" || active === k;
      paths += `<path d="${pts.join(" ")}" fill="none" stroke="${obj.color}" stroke-width="${isFocus ? 2.8 : 1.4}" stroke-opacity="${isFocus ? 1 : 0.22}"/>`;
    });

    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.innerHTML = `
      <line x1="${pad.l}" y1="${yOf(0)}" x2="${W - pad.r}" y2="${yOf(0)}" stroke="currentColor" stroke-opacity="0.22"/>
      <line x1="${xOf(0)}" y1="${pad.t}" x2="${xOf(0)}" y2="${H - pad.b}" stroke="currentColor" stroke-opacity="0.22"/>
      ${isDeriv ? `<line x1="${pad.l}" y1="${yOf(1)}" x2="${W - pad.r}" y2="${yOf(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-dasharray="4 3"/><text x="${pad.l - 6}" y="${yOf(1) + 4}" text-anchor="end" font-size="10" font-family="var(--font-mono)" fill="currentColor" opacity="0.65">1.0</text>` : ""}
      ${isDeriv ? `<line x1="${pad.l}" y1="${yOf(0.25)}" x2="${W - pad.r}" y2="${yOf(0.25)}" stroke="#0D9488" stroke-opacity="0.3" stroke-dasharray="3 3"/><text x="${pad.l - 6}" y="${yOf(0.25) + 4}" text-anchor="end" font-size="9.5" font-family="var(--font-mono)" fill="#0D9488">0.25</text>` : ""}
      <text x="${pad.l - 6}" y="${yOf(0) + 4}" text-anchor="end" font-size="10" font-family="var(--font-mono)" fill="currentColor" opacity="0.65">0</text>
      ${paths}
      <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="10.5" fill="currentColor" opacity="0.65">神經元加權輸入 x ∈ [-4.5, 4.5]</text>
    `;
  };

  const render = () => {
    btns.forEach(b => b.classList.toggle("active", b.dataset.actFn === active));
    const allKeys = ["sigmoid", "tanh", "relu", "gelu"];
    drawPlot(fnSvg, allKeys, false);
    drawPlot(derSvg, allKeys, true);

    if (active === "all") {
      commentary.innerHTML = `
        <div>
          <h4>📊 四大激活函數全景對比：為什麼非線性決定深度學習的威力？</h4>
          <p>若神經網路完全不加激活函數，無論疊加 100 層矩陣相乘，數學上都等價於單一層線性變換，無法畫出彎曲決策邊界。從 Sigmoid → Tanh → ReLU → GELU 的演進，核心目標正是<strong>「在保留豐富非線性表達的同時，讓右圖的梯度能無損貫穿數百層深度」</strong>。</p>
          <div class="formula-chip">綠＝Sigmoid ｜ 藍＝Tanh ｜ 紫＝ReLU ｜ 橘＝GELU</div>
        </div>
        <div class="key-points-box">
          <strong>📌 一眼看懂右圖（梯度曲線）關鍵</strong>
          <ul>
            <li>Sigmoid 最高峰僅 0.25，連乘 10 層梯度即萎縮至百萬分之一。</li>
            <li>ReLU 與 GELU 在正區間導數皆維持 ≈ 1.0，成功解鎖百層以上深層網路。</li>
            <li>GELU 憑藉原點附近平滑微凹曲線，成為 Transformer 與現代 LLM 首選。</li>
          </ul>
        </div>
      `;
    } else {
      const c = fns[active];
      commentary.innerHTML = `
        <div>
          <h4>${c.title}</h4>
          <p>${c.desc}</p>
          <div class="formula-chip">${c.formula}</div>
        </div>
        <div class="key-points-box">
          <strong>📌 核心特性與適用位置</strong>
          <ul>${c.points.map(p => `<li>${p}</li>`).join("")}</ul>
        </div>
      `;
    }
  };

  btns.forEach(b => b.addEventListener("click", () => { active = b.dataset.actFn; render(); }));
  render();
}

/* ==========================================================================
   16. LLM Deep-Dive: Next-Token Prediction & Temperature Probability Simulator
   ========================================================================== */
function initTemperatureLab() {
  const slider = document.getElementById("llmTempSlider");
  const readout = document.getElementById("llmTempVal");
  const barsSvg = document.getElementById("llmProbSvg");
  const commentary = document.getElementById("llmTempCommentary");
  if (!slider || !barsSvg) return;

  // Raw logits for prompt: "在未來的臨床醫療中，人工智慧最能協助醫師___"
  const candidates = [
    { token: "判讀影像", logit: 4.8, tag: "高度合理" },
    { token: "分析病歷", logit: 4.3, tag: "高度合理" },
    { token: "預測風險", logit: 3.6, tag: "合理延伸" },
    { token: "擬定療程", logit: 2.9, tag: "中等機率" },
    { token: "編寫詩集", logit: 0.7, tag: "偏離語境" },
    { token: "星際探險", logit: -0.4, tag: "明顯幻覺" }
  ];

  const render = (T) => {
    readout.textContent = `T = ${T.toFixed(2)}`;

    // Softmax with temperature
    const scaled = candidates.map(c => c.logit / T);
    const maxS = Math.max(...scaled);
    const exps = scaled.map(v => Math.exp(v - maxS));
    const sumE = exps.reduce((a, b) => a + b, 0);
    const probs = exps.map(e => e / sumE);

    // Shannon Entropy (bits)
    const entropy = -probs.reduce((acc, p) => acc + (p > 1e-9 ? p * Math.log2(p) : 0), 0);

    // Determine Top-p (0.90) nucleus set
    let cum = 0;
    const inTopP = probs.map((p) => {
      const keep = cum < 0.90;
      cum += p;
      return keep;
    });

    const W = 560, H = 225, pad = { l: 92, r: 86, t: 16, b: 18 };
    const pW = W - pad.l - pad.r;
    const rowH = (H - pad.t - pad.b) / candidates.length;

    let bars = "";
    candidates.forEach((c, i) => {
      const y = pad.t + i * rowH;
      const p = probs[i];
      const barW = Math.max(2, p * pW);
      const isHalluc = i >= 4;
      const color = isHalluc ? "#EF4444" : inTopP[i] ? "#D97706" : "#94A3B8";
      const pctText = (p * 100).toFixed(1) + "%";
      const badge = inTopP[i] ? "Top-p 納入" : "已截斷";
      bars += `
        <text x="${pad.l - 10}" y="${y + rowH * 0.62}" text-anchor="end" font-size="12.5" font-weight="700" fill="currentColor">${c.token}</text>
        <rect x="${pad.l}" y="${y + 6}" width="${pW}" height="${rowH - 12}" rx="6" fill="currentColor" fill-opacity="0.06"/>
        <rect x="${pad.l}" y="${y + 6}" width="${barW.toFixed(1)}" height="${rowH - 12}" rx="6" fill="${color}" fill-opacity="${inTopP[i] ? 0.92 : 0.40}"/>
        <text x="${pad.l + barW + 8}" y="${y + rowH * 0.62}" font-size="11.5" font-family="var(--font-mono)" font-weight="700" fill="currentColor">${pctText}</text>
        <text x="${W - 6}" y="${y + rowH * 0.62}" text-anchor="end" font-size="10" fill="${inTopP[i] ? (isHalluc ? "#EF4444" : "#0D9488") : "currentColor"}" opacity="${inTopP[i] ? 0.95 : 0.45}">${badge}</text>
      `;
    });

    barsSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    barsSvg.innerHTML = bars;

    let title, desc, recs;
    if (T <= 0.35) {
      title = `🎯 低溫精準模式（T = ${T.toFixed(2)} ｜ 資訊熵 H = ${entropy.toFixed(2)} bits）`;
      desc = `機率幾乎全部集中於分數最高的「判讀影像 (${(probs[0] * 100).toFixed(1)}%)」，輸出近乎確定性（Deterministic）。這能將胡言亂語機率壓至極低，但多次提問的回答會高度相似。`;
      recs = [
        "最適場景：程式碼生成、SQL 查詢、醫療/法規文件擷取、JSON 結構化抽取。",
        "風險提醒：過低溫度在創意寫作或腦力激盪時容易顯得呆板重複。"
      ];
    } else if (T <= 0.95) {
      title = `⚖️ 平衡自然模式（T = ${T.toFixed(2)} ｜ 資訊熵 H = ${entropy.toFixed(2)} bits）`;
      desc = `前三個高度合理詞元（「判讀影像」「分析病歷」「預測風險」）各自保有健康抽樣機率，而 Top-p = 0.90 核採樣安全地截斷了尾部的離題詞，兼具流暢自然與事實可靠性。`;
      recs = [
        "最適場景：日常對話助理、技術部落格撰寫、摘要翻譯與教學解釋。",
        "實務技巧：多數 API 預設 T = 0.7 搭配 Top-p = 0.9 作為最佳平衡點。"
      ];
    } else {
      title = `🎨 高溫發散模式（T = ${T.toFixed(2)} ｜ 資訊熵 H = ${entropy.toFixed(2)} bits）`;
      desc = `高溫將原本懸殊的 Logit 差距強行拉平！原本幾乎不可能出現的「編寫詩集 (${(probs[4] * 100).toFixed(1)}%)」與「星際探險 (${(probs[5] * 100).toFixed(1)}%)」竟也進入 Top-p 候選池，極易引發語意跳脫與「幻覺」。`;
      recs = [
        "最適場景：極具實驗性的小說構思、廣告標語發散、破框靈感聯想。",
        "風險提醒：切勿在嚴謹事實問答、數學計算或客服機器人使用高溫參數！"
      ];
    }

    commentary.innerHTML = `
      <div>
        <h4>${title}</h4>
        <p>${desc}</p>
        <div class="formula-chip">Softmax 溫度縮放：P(wᵢ) = exp(zᵢ / T) / Σ exp(zⱼ / T)</div>
      </div>
      <div class="key-points-box">
        <strong>📌 實務參數調校建議</strong>
        <ul>${recs.map(r => `<li>${r}</li>`).join("")}</ul>
      </div>
    `;
  };

  slider.addEventListener("input", () => render(Number(slider.value)));
  render(Number(slider.value));
}

/* ==========================================================================
   17. LLM Deep-Dive: Test-Time Compute Scaling Curve (System-1 vs System-2)
   ========================================================================== */
function initTestTimeComputeChart() {
  const svg = document.getElementById("testTimeSvg");
  if (!svg) return;

  // Conceptual scaling curve grounded in o-series & DeepSeek-R1 test-time scaling reports
  const pts = [
    { tok: "256", logX: 0, sys1: 34, sys2: 38 },
    { tok: "1K",  logX: 1, sys1: 37, sys2: 53 },
    { tok: "4K",  logX: 2, sys1: 38, sys2: 68 },
    { tok: "16K", logX: 3, sys1: 38.5, sys2: 79 },
    { tok: "32K", logX: 4, sys1: 39, sys2: 86 }
  ];

  const W = 520, H = 235, pad = { l: 50, r: 28, t: 24, b: 40 };
  const pW = W - pad.l - pad.r, pH = H - pad.t - pad.b;
  const xOf = (lx) => pad.l + (lx / 4) * pW;
  const yOf = (acc) => pad.t + (1 - (acc - 20) / 75) * pH;

  const p1 = pts.map((d, i) => `${i === 0 ? "M" : "L"} ${xOf(d.logX).toFixed(1)} ${yOf(d.sys1).toFixed(1)}`).join(" ");
  const p2 = pts.map((d, i) => `${i === 0 ? "M" : "L"} ${xOf(d.logX).toFixed(1)} ${yOf(d.sys2).toFixed(1)}`).join(" ");

  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.innerHTML = `
    ${[30, 50, 70, 90].map(v => `
      <line x1="${pad.l}" y1="${yOf(v)}" x2="${W - pad.r}" y2="${yOf(v)}" stroke="currentColor" stroke-opacity="0.1" stroke-dasharray="3 4"/>
      <text x="${pad.l - 8}" y="${yOf(v) + 4}" text-anchor="end" font-size="10.5" font-family="var(--font-mono)" fill="currentColor" opacity="0.65">${v}%</text>
    `).join("")}
    ${pts.map(d => `
      <text x="${xOf(d.logX)}" y="${H - 12}" text-anchor="middle" font-size="10.5" font-family="var(--font-mono)" fill="currentColor" opacity="0.7">${d.tok}</text>
    `).join("")}
    <path d="${p1}" fill="none" stroke="#64748B" stroke-width="2.4" stroke-dasharray="6 4"/>
    <path d="${p2}" fill="none" stroke="#EA580C" stroke-width="3" stroke-linecap="round"/>
    ${pts.map(d => `
      <circle cx="${xOf(d.logX)}" cy="${yOf(d.sys1)}" r="4" fill="#64748B"/>
      <circle cx="${xOf(d.logX)}" cy="${yOf(d.sys2)}" r="5" fill="#EA580C" stroke="var(--bg-surface)" stroke-width="1.8"/>
      <text x="${xOf(d.logX)}" y="${yOf(d.sys2) - 10}" text-anchor="middle" font-size="10" font-weight="700" fill="#EA580C">${d.sys2}%</text>
    `).join("")}
    <text x="${W - pad.r}" y="${yOf(39) - 10}" text-anchor="end" font-size="10.5" font-weight="600" fill="#64748B">傳統快答模型 (System-1)</text>
    <text x="${pad.l + 10}" y="${pad.t + 10}" text-anchor="start" font-size="10.5" font-weight="700" fill="#EA580C">推理模型 (System-2：允許思維鏈自我驗證)</text>
    <text x="${W / 2}" y="${H - 0}" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.55">推論期思考詞元預算 (Thinking Tokens，對數尺度)</text>
  `;
}
