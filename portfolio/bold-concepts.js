const stageData = {
  clinical: {
    kicker: "Clinic Command",
    title: "迷わない受付ダッシュボード",
    body: "トップページを受付窓口のように見せ、診療状況・症状別導線・持ち物を一画面で整理します。",
    score: "電話負担を下げる設計"
  },
  dental: {
    kicker: "Cinematic Counseling",
    title: "自由診療を物語として相談へ運ぶ",
    body: "費用・痛み・仕上がりの不安をチャプター化し、カウンセリング予約まで上品に誘導します。",
    score: "高単価相談の心理ハードルを下げる"
  },
  rehab: {
    kicker: "Conversion Sprint",
    title: "30秒で予約判断させる広告LP",
    body: "症状、料金、空き確認を強く見せ、SNSや広告から来た人をLINE予約へつなげます。",
    score: "初回体験への転換を狙う"
  },
  nursing: {
    kicker: "Care Map",
    title: "相談者ごとに入口を分ける",
    body: "家族、ケアマネ、病院、採用候補者がそれぞれ必要な情報へ進めるケアマップ型です。",
    score: "紹介と採用の両方に効く設計"
  },
  wellness: {
    kicker: "Private Deck",
    title: "会員体験として高単価を見せる",
    body: "単品メニュー比較を避け、検査・美容・栄養・継続管理をプライベート体験として提示します。",
    score: "価格競争から離れる設計"
  }
};

const stage = document.querySelector("[data-stage]");

if (stage) {
  const card = stage.querySelector(".console-card");
  const kicker = stage.querySelector("[data-stage-kicker]");
  const title = stage.querySelector("[data-stage-title]");
  const body = stage.querySelector("[data-stage-body]");
  const score = stage.querySelector("[data-stage-score]");

  stage.querySelectorAll("[data-stage-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = stageData[button.dataset.key];
      if (!item) return;

      stage.querySelectorAll("[data-stage-button]").forEach((tab) => {
        tab.classList.toggle("is-active", tab === button);
      });

      card.classList.add("is-changing");
      window.setTimeout(() => {
        kicker.textContent = item.kicker;
        title.textContent = item.title;
        body.textContent = item.body;
        score.textContent = item.score;
        card.classList.remove("is-changing");
      }, 140);
    });
  });
}

document.querySelectorAll("[data-symptom-lab]").forEach((lab) => {
  const output = lab.querySelector(".symptom-output");
  const title = lab.querySelector("[data-symptom-title]");
  const price = lab.querySelector("[data-symptom-price]");
  const copy = lab.querySelector("[data-symptom-copy]");

  lab.querySelectorAll("[data-symptom-button]").forEach((button) => {
    button.addEventListener("click", () => {
      lab.querySelectorAll("[data-symptom-button]").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      output.classList.add("is-changing");
      window.setTimeout(() => {
        title.textContent = button.dataset.title || "";
        price.textContent = button.dataset.price || "";
        copy.textContent = button.dataset.copy || "";
        output.classList.remove("is-changing");
      }, 140);
    });
  });
});

document.querySelectorAll("[data-private-deck]").forEach((deck) => {
  deck.querySelectorAll("[data-deck-card]").forEach((card) => {
    card.addEventListener("click", () => {
      deck.querySelectorAll("[data-deck-card]").forEach((item) => {
        item.classList.toggle("is-active", item === card);
      });
    });
  });
});
