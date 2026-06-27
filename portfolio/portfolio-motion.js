const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setChoicePanel(group, button) {
  const panel = group.querySelector("[data-choice-panel]");
  const title = group.querySelector("[data-choice-title]");
  const body = group.querySelector("[data-choice-body]");
  const list = group.querySelector("[data-choice-list]");

  if (!panel || !title || !body || !list) return;

  group.querySelectorAll("[data-choice-button]").forEach((item) => {
    item.classList.toggle("is-active", item === button);
    item.setAttribute("aria-selected", String(item === button));
  });

  const update = () => {
    title.textContent = button.dataset.title || "";
    body.textContent = button.dataset.body || "";
    list.replaceChildren(...(button.dataset.points || "")
      .split("|")
      .filter(Boolean)
      .map((point) => {
        const item = document.createElement("li");
        item.textContent = point;
        return item;
      }));
    panel.classList.remove("is-changing");
  };

  if (reduceMotion) {
    update();
    return;
  }

  panel.classList.add("is-changing");
  window.setTimeout(update, 140);
}

document.querySelectorAll("[data-choice-group]").forEach((group) => {
  const buttons = group.querySelectorAll("[data-choice-button]");
  buttons.forEach((button) => {
    button.setAttribute("role", "tab");
    button.addEventListener("click", () => setChoicePanel(group, button));
  });
});

const planData = [
  {
    title: "Basic Checkup",
    price: "月額 22,000円",
    body: "検査結果の継続管理とオンライン相談。まず予防医療を始めたい方へ。"
  },
  {
    title: "Premium Longevity",
    price: "月額 55,000円",
    body: "年2回の詳細検査、栄養指導、優先予約。継続管理を希望する方へ。"
  },
  {
    title: "Private Concierge",
    price: "個別見積",
    body: "美容・予防・紹介医療まで含めた専用設計。完全個別対応を求める方へ。"
  }
];

document.querySelectorAll("[data-plan-selector]").forEach((selector) => {
  const range = selector.querySelector("[data-plan-range]");
  const output = selector.querySelector(".plan-output");
  const title = selector.querySelector("[data-plan-title]");
  const price = selector.querySelector("[data-plan-price]");
  const body = selector.querySelector("[data-plan-body]");

  if (!range || !output || !title || !price || !body) return;

  function updatePlan() {
    const plan = planData[Number(range.value)] || planData[0];
    const apply = () => {
      title.textContent = plan.title;
      price.textContent = plan.price;
      body.textContent = plan.body;
      output.classList.remove("is-changing");
    };

    if (reduceMotion) {
      apply();
      return;
    }

    output.classList.add("is-changing");
    window.setTimeout(apply, 140);
  }

  range.addEventListener("input", updatePlan);
});

const revealTargets = document.querySelectorAll(".motion-reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  revealTargets.forEach((target) => revealObserver.observe(target));
}
