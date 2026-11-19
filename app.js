(function () {
  const nav = document.querySelector(".nav");
  const menu = document.querySelector(".menu");
  if (menu && nav) menu.addEventListener("click", () => nav.classList.toggle("open"));

  const page = document.body.dataset.page;
  if (page) document.querySelectorAll("[data-page]").forEach((a) => a.classList.toggle("active", a.dataset.page === page));
  if (!document.querySelector(".ticker") && document.querySelector(".masthead")) {
    const ticker = document.createElement("div");
    ticker.className = "ticker";
    ticker.innerHTML = '<span class="ticker-track">RISK INDEX <b>▲ OBSERVE</b> VELOCITY <b>▲ FLOW</b> COMPLIANCE COVERAGE <b>▲ GOVERN</b> DELIVERED VALUE <b>▲ REALIZE</b> · &nbsp; RISK INDEX <b>▲ OBSERVE</b> VELOCITY <b>▲ FLOW</b> COMPLIANCE COVERAGE <b>▲ GOVERN</b> DELIVERED VALUE <b>▲ REALIZE</b></span>';
    document.querySelector(".masthead").appendChild(ticker);
  }

  document.querySelectorAll(".tab").forEach((tab) => tab.addEventListener("click", () => {
    const group = tab.closest("[data-tabs]");
    if (!group) return;
    group.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    group.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const target = group.querySelector("#" + tab.dataset.target);
    if (target) target.classList.add("active");
  }));

  document.querySelectorAll(".issuer-logo").forEach((img) => {
    img.addEventListener("error", () => {
      img.hidden = true;
      img.closest(".issuer-badge")?.classList.add("badge-fallback");
    });
  });

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveal = (el) => {
    el.classList.add("is-visible");
    if (el.dataset.count && !el.dataset.counted) {
      el.dataset.counted = "true";
      const target = Number(el.dataset.count);
      if (reduced) { el.textContent = target.toLocaleString(); return; }
      let n = 0;
      const timer = setInterval(() => {
        n = Math.min(target, n + Math.max(1, Math.ceil(target / 36)));
        el.textContent = n.toLocaleString();
        if (n === target) clearInterval(timer);
      }, 24);
    }
  };
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && reveal(entry.target)), { threshold: .12 });
  document.querySelectorAll(".reveal, [data-count]").forEach((el) => observer.observe(el));

  const scenes = {
    vision: {
      title: "Corporate universe / the operating environment",
      note: "Illustrative systems view — no market or performance claim.",
      visual: `<div class="universe-scene"><div class="orbit orbit-a"></div><div class="orbit orbit-b"></div><div class="universe-core">JAYARAMSRK<br><small>DECISION SIGNAL</small></div><span class="scene-node node-market">MARKET<br><small>FORCES</small></span><span class="scene-node node-floor">WORKING<br><small>FLOOR</small></span><span class="scene-node node-board">BOARD<br><small>GOVERNANCE</small></span><span class="scene-node node-culture">CULTURE<br><small>CAPABILITY</small></span><span class="scene-node node-trust">TRUST<br><small>COMPLIANCE</small></span></div>`,
      stats: [["09", "core pages"], ["04", "method signals"], ["10", "executive lenses"]]
    },
    business: {
      title: "Value chain / from strategy to outcome",
      note: "Illustrative directional indicators from the existing page content.",
      visual: `<div class="flow-visual"><span>STRATEGY</span><i>→</i><span>PORTFOLIO</span><i>→</i><span>PROGRAMS</span><i>→</i><span class="flow-gold">OUTCOMES</span></div><div class="chart-bars"><b style="--v:82%"><i>Alignment <em>82</em></i></b><b style="--v:74%"><i>Visibility <em>74</em></i></b><b style="--v:68%"><i>Adoption <em>68</em></i></b></div>`,
      stats: [["82", "alignment"], ["74", "visibility"], ["68", "adoption"]]
    },
    technology: {
      title: "Enterprise architecture / resilience by design",
      note: "Conceptual architecture signal; validate against current platform evidence.",
      visual: `<div class="architecture-visual"><span>EXPERIENCE</span><span>CAPABILITY</span><span>DATA &amp; AI</span><span>PLATFORM</span><span>TRUST &amp; SECURITY</span></div>`,
      stats: [["05", "architecture layers"], ["24/7", "resilience mindset"], ["AA", "accessibility target"]]
    },
    ai: {
      title: "AI control tower / governed innovation",
      note: "Illustrative control-tower view. No model inventory is asserted here.",
      visual: `<div class="control-tower"><div class="tower-ring"></div><div class="tower-ring ring-two"></div><div class="tower-center">AI<br><small>CONTROL</small></div><span>INVENTORY</span><span>RISK TIER</span><span>HUMAN OVERSIGHT</span><span>MODEL GATES</span></div>`,
      stats: [["06", "trust principles"], ["06", "control references"], ["01", "human owner"]]
    },
    transformation: {
      title: "Transformation floor / flow, cadence and adoption",
      note: "Illustrative operating-floor scene — designed to make work visible.",
      visual: `<div class="floor-scene"><div class="floor-grid"></div><span class="room room-one">WAR ROOM<br><small>DECIDE</small></span><span class="room room-two">DELIVERY FLOOR<br><small>FLOW</small></span><span class="room room-three">CHANGE HUB<br><small>ADOPT</small></span><div class="floor-line"></div></div>`,
      stats: [["07", "transformation stages"], ["04", "flow signals"], ["01", "shared cadence"]]
    },
    challenges: {
      title: "Risk observatory / see exposure before it compounds",
      note: "Illustrative 5×5 heat map; risk ratings require a verified register.",
      visual: `<div class="risk-visual"><div class="risk-axis"><span>HIGH</span><div class="risk-grid">${Array.from({ length: 25 }, (_, i) => `<i class="risk-${i % 5}"></i>`).join("")}</div><span>LOW</span></div><div class="risk-legend"><b>IMPACT</b><span class="risk-green">CONTROLLED</span><span class="risk-gold">WATCH</span><span class="risk-red">ESCALATE</span></div></div>`,
      stats: [["05×05", "risk grid"], ["04", "challenge lenses"], ["01", "response loop"]]
    },
    frameworks: {
      title: "Delivery cockpit / Scrum · Kanban · Agile · GRC · Risk · Quality",
      note: "Interactive conceptual dashboards; replace sample indicators with live delivery data.",
      visual: `<div class="cockpit" data-cockpit><div class="cockpit-tabs"><button class="cockpit-tab active" data-cockpit-target="scrum">SCRUM</button><button class="cockpit-tab" data-cockpit-target="kanban">KANBAN</button><button class="cockpit-tab" data-cockpit-target="agile">AGILE</button><button class="cockpit-tab" data-cockpit-target="grc">GRC</button><button class="cockpit-tab" data-cockpit-target="risk">RISK</button><button class="cockpit-tab" data-cockpit-target="quality">QUALITY</button></div><div class="cockpit-body" id="cockpit-output"></div></div>`,
      stats: [["06", "operating tools"], ["05", "decision views"], ["01", "shared cockpit"]]
    },
    knowledge: {
      title: "Evidence wall / credentials, learning and application",
      note: "Issuer logos and credential text remain as supplied; visual badges are presentation aids only.",
      visual: `<div class="evidence-wall">${["AI", "AGILE", "QUALITY", "PM", "CLOUD", "DATA", "CYBER", "FINANCE", "RISK", "CHANGE", "STAKEHOLDER", "EFFECTIVENESS"].map((x, i) => `<span style="--i:${i}"><b>${String(i + 1).padStart(2, "0")}</b>${x}</span>`).join("")}</div>`,
      stats: [["12", "chapters"], ["03", "evidence types"], ["01", "capability story"]]
    },
    engagement: {
      title: "Executive briefing / boardroom to working floor",
      note: "Illustrative collaboration scene — no client, venue or event claim.",
      visual: `<div class="boardroom-scene"><div class="board-table"></div><span class="person p-one"></span><span class="person p-two"></span><span class="person p-three"></span><span class="person p-four"></span><div class="board-screen">ALIGN<br><small>SEE · GOVERN · REALIZE</small></div></div>`,
      stats: [["01", "briefing CTA"], ["03", "conversation themes"], ["24h", "response promise"]]
    },
    projects: {
      title: "Portfolio signal deck / six illustrative case patterns",
      note: "Illustrative case data is preserved and clearly labelled.",
      visual: `<div class="portfolio-chart"><span style="--h:42%"><b>42</b><small>SENTINEL</small></span><span style="--h:89%"><b>89</b><small>MERIDIAN</small></span><span style="--h:68%"><b>68</b><small>AEGIS</small></span><span style="--h:78%"><b>78</b><small>NEXUS</small></span></div>`,
      stats: [["06", "project patterns"], ["03", "KPIs per card"], ["100%", "illustrative label"]]
    }
  };

  function cockpitMarkup(type) {
    const views = {
      scrum: ["SPRINT GOAL", "Ship the highest-value slice", ["DONE", "IN PROGRESS", "READY"], ["8", "5", "13"]],
      kanban: ["FLOW BOARD", "WIP limit / 3 active items", ["BACKLOG", "DOING", "DONE"], ["12", "3", "27"]],
      agile: ["AGILE HEALTH", "Feedback loops over ceremony", ["VALUE", "FLOW", "LEARNING"], ["82", "74", "68"]],
      grc: ["CONTROL COVERAGE", "Policy → control → evidence", ["COVERED", "WATCH", "GAP"], ["92", "6", "2"]],
      risk: ["RISK REGISTER", "Top exposure / review cadence", ["LOW", "MEDIUM", "HIGH"], ["14", "7", "3"]],
      quality: ["QUALITY SIGNAL", "Defect prevention before rework", ["PASS", "WATCH", "ACTION"], ["94", "4", "2"]]
    };
    const item = views[type] || views.scrum;
    return `<div class="cockpit-heading"><div><span class="overline">${item[0]}</span><h3>${item[1]}</h3></div><span class="live-dot">● LIVE VIEW</span></div><div class="cockpit-metrics">${item[2].map((label, i) => `<div><b data-count="${item[3][i]}">0</b><span>${label}</span></div>`).join("")}</div><div class="mini-chart">${item[3].map((v, i) => `<i style="--v:${Math.max(14, Number(v))}%"><em>${item[2][i]}</em></i>`).join("")}</div>`;
  }

  if (page && scenes[page] && !document.querySelector(".visual-brief")) {
    const scene = scenes[page];
    const section = document.createElement("section");
    section.className = "section visual-brief";
    section.innerHTML = `<div class="shell"><div class="intro reveal"><div class="overline">Executive visual brief / ${String(Object.keys(scenes).indexOf(page) + 1).padStart(2, "0")}</div><h2>${scene.title}</h2><p>${scene.note}</p></div><div class="visual-brief-grid"><div class="visual-stage reveal">${scene.visual}</div><div class="visual-stat-stack">${scene.stats.map((s) => /^\d+$/.test(s[0]) ? `<div class="visual-stat reveal"><b data-count="${s[0]}">0</b><span>${s[1]}</span></div>` : `<div class="visual-stat reveal"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div></div></div>`;
    document.querySelector("footer")?.before(section);
    section.querySelectorAll(".reveal,[data-count]").forEach((el) => observer.observe(el));
  }

  const cockpit = document.querySelector("[data-cockpit]");
  if (cockpit) {
    const output = cockpit.querySelector("#cockpit-output");
    const render = (type) => { output.innerHTML = cockpitMarkup(type); output.querySelectorAll("[data-count]").forEach((el) => observer.observe(el)); };
    render("scrum");
    cockpit.querySelectorAll(".cockpit-tab").forEach((button) => button.addEventListener("click", () => {
      cockpit.querySelectorAll(".cockpit-tab").forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      render(button.dataset.cockpitTarget);
    }));
  }

  document.querySelectorAll(".credential-card,.panel,.signal-card,.visual-stage").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();
