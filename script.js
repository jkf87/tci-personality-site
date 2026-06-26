const labels = {
  NS: "자극추구",
  HA: "위험회피",
  RD: "사회적 민감성",
  P: "인내력",
  SD: "자율성",
  C: "연대감",
  ST: "자기초월",
};

const questions = [
  { key: "NS", text: "새로운 장소나 활동을 보면 금방 해보고 싶어진다." },
  { key: "NS", text: "계획이 조금 바뀌어도 흥미롭다면 바로 움직이는 편이다." },
  { key: "NS", text: "반복적인 일보다 변화가 많은 일을 더 선호한다." },
  { key: "NS", text: "재미있어 보이면 결과를 깊게 따지기 전에 시작할 때가 있다." },
  { key: "HA", text: "일이 잘못될 가능성을 미리 자주 생각한다." },
  { key: "HA", text: "낯선 상황에서는 긴장하거나 조심스러워진다." },
  { key: "HA", text: "중요한 결정을 할 때 걱정이 오래 남는 편이다." },
  { key: "HA", text: "위험해 보이는 선택은 가능하면 피하려고 한다." },
  { key: "RD", text: "주변 사람의 반응이나 인정이 내 기분에 꽤 영향을 준다." },
  { key: "RD", text: "가까운 사람과 정서적으로 연결되어 있다고 느끼는 것이 중요하다." },
  { key: "RD", text: "상대가 서운해할까 봐 내 결정을 조정할 때가 있다." },
  { key: "RD", text: "관계에서 따뜻한 표현과 애착을 중요하게 여긴다." },
  { key: "P", text: "어려운 과제라도 끝까지 붙잡고 해결하려는 편이다." },
  { key: "P", text: "성과가 늦게 나와도 목표가 분명하면 계속 밀고 간다." },
  { key: "P", text: "한번 맡은 일은 지치더라도 마무리하려고 한다." },
  { key: "P", text: "반복 연습이나 꾸준한 루틴을 비교적 잘 유지한다." },
  { key: "SD", text: "내 선택의 결과를 스스로 책임지려고 한다." },
  { key: "SD", text: "문제가 생기면 탓하기보다 해결 방법을 먼저 찾는다." },
  { key: "SD", text: "내가 어떤 방향으로 살고 싶은지 비교적 분명하다." },
  { key: "SD", text: "감정이 흔들려도 해야 할 일을 조절해 나가려 한다." },
  { key: "C", text: "다른 사람의 입장을 이해하려고 노력한다." },
  { key: "C", text: "갈등 상황에서도 상대와 협력할 방법을 찾으려 한다." },
  { key: "C", text: "나와 생각이 다른 사람도 존중하려고 한다." },
  { key: "C", text: "공동체나 팀에 도움이 되는 선택을 중요하게 생각한다." },
  { key: "ST", text: "음악, 자연, 예술, 종교적 경험 등에 깊이 몰입할 때가 있다." },
  { key: "ST", text: "삶이 개인의 성공보다 더 큰 의미와 연결되어 있다고 느낄 때가 있다." },
  { key: "ST", text: "직관이나 영감이 내 판단에 영향을 주는 편이다." },
  { key: "ST", text: "나와 세계가 하나로 이어져 있다는 감각을 경험한 적이 있다." },
];

const dimensionOrder = ["NS", "HA", "RD", "P", "SD", "C", "ST"];
const ranges = Array.from(document.querySelectorAll('.controls input[type="range"]'));
const chart = document.querySelector("#bar-chart");
const insights = document.querySelector("#insights");
const questionList = document.querySelector("#question-list");
const testForm = document.querySelector("#test-form");
const testChart = document.querySelector("#test-chart");
const testInsights = document.querySelector("#test-insights");
const answeredCount = document.querySelector("#answered-count");
const resetTest = document.querySelector("#reset-test");

function level(value) {
  if (value >= 67) return "높음";
  if (value <= 33) return "낮음";
  return "중간";
}

function getScores() {
  return ranges.reduce((scores, input) => {
    scores[input.dataset.key] = Number(input.value);
    return scores;
  }, {});
}

function buildInsights(scores) {
  const result = [];

  if (scores.HA >= 60 && scores.SD <= 50) {
    result.push("HA가 높고 SD가 낮은 조합은 걱정, 예기불안, 무력감이 함께 나타나는지 살펴볼 만합니다.");
  }

  if (scores.NS >= 60 && scores.P <= 50) {
    result.push("NS가 높고 P가 낮으면 시작은 빠르지만 마무리와 지속성 관리가 핵심 포인트가 됩니다.");
  }

  if (scores.RD <= 40 && scores.C <= 45) {
    result.push("RD와 C가 모두 낮으면 독립성이 강한 대신 관계에서 거리감이나 협력 부담이 커질 수 있습니다.");
  }

  if (scores.SD >= 65 && scores.C >= 65) {
    result.push("SD와 C가 함께 높으면 자기조절과 관계 적응이 비교적 안정적인 프로파일로 읽을 수 있습니다.");
  }

  if (scores.ST >= 65 && scores.SD <= 50) {
    result.push("ST가 높고 SD가 낮으면 이상, 몰입, 직관은 강하지만 현실 조절의 균형을 함께 봐야 합니다.");
  }

  if (result.length === 0) {
    result.push("현재 조합은 극단적인 위험 신호보다 각 차원의 균형과 생활 맥락을 함께 확인하는 쪽이 적합합니다.");
  }

  const top = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key, value]) => `${key} ${labels[key]} ${level(value)}`)
    .join(", ");

  result.unshift(`가장 두드러지는 차원은 ${top}입니다.`);
  return result;
}

function renderBars(target, scores) {
  target.innerHTML = Object.entries(scores)
    .map(
      ([key, value]) => `
        <div class="bar-row">
          <span class="bar-label">${key}</span>
          <span class="bar-track" aria-hidden="true">
            <span class="bar-fill" style="width: ${value}%"></span>
          </span>
          <span class="bar-value">${value}</span>
        </div>
      `,
    )
    .join("");
}

function render() {
  const scores = getScores();

  ranges.forEach((input) => {
    input.nextElementSibling.value = input.value;
  });

  renderBars(chart, scores);

  insights.innerHTML = buildInsights(scores)
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderQuestions() {
  questionList.innerHTML = dimensionOrder
    .map((key) => {
      const items = questions
        .map((question, index) => ({ ...question, index }))
        .filter((question) => question.key === key)
        .map(
          (question) => `
            <div class="question-item">
              <p>${question.index + 1}. ${question.text}</p>
              <div class="likert" role="radiogroup" aria-label="${question.text}">
                ${[1, 2, 3, 4, 5]
                  .map(
                    (value) => `
                      <label>
                        <input type="radio" name="q${question.index}" value="${value}" />
                        <span>${value}</span>
                      </label>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          `,
        )
        .join("");

      return `
        <section class="question-group" aria-labelledby="group-${key}">
          <h3 id="group-${key}"><span>${key}</span>${labels[key]}</h3>
          ${items}
        </section>
      `;
    })
    .join("");
}

function updateAnsweredCount() {
  const answered = questions.filter((_, index) => {
    return Boolean(testForm.querySelector(`input[name="q${index}"]:checked`));
  }).length;

  answeredCount.textContent = `${answered}/${questions.length} 응답`;
  return answered;
}

function scoreTest() {
  const totals = Object.fromEntries(dimensionOrder.map((key) => [key, { sum: 0, count: 0 }]));

  questions.forEach((question, index) => {
    const selected = testForm.querySelector(`input[name="q${index}"]:checked`);
    if (!selected) return;
    totals[question.key].sum += Number(selected.value);
    totals[question.key].count += 1;
  });

  return Object.fromEntries(
    dimensionOrder.map((key) => {
      const item = totals[key];
      const score = item.count === 0 ? 0 : Math.round(((item.sum / item.count - 1) / 4) * 100);
      return [key, score];
    }),
  );
}

function applyScoresToExplorer(scores) {
  ranges.forEach((input) => {
    input.value = scores[input.dataset.key];
  });
  render();
}

ranges.forEach((input) => input.addEventListener("input", render));
renderQuestions();
testForm.addEventListener("change", updateAnsweredCount);
testForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answered = updateAnsweredCount();

  if (answered < questions.length) {
    const remaining = questions.length - answered;
    testInsights.innerHTML = `<li>아직 ${remaining}개 문항이 남았습니다. 모든 문항에 답하면 결과를 계산합니다.</li>`;
    return;
  }

  const scores = scoreTest();
  renderBars(testChart, scores);
  applyScoresToExplorer(scores);
  testInsights.innerHTML = buildInsights(scores)
    .map((item) => `<li>${item}</li>`)
    .join("");
});

resetTest.addEventListener("click", () => {
  testForm.reset();
  updateAnsweredCount();
  testChart.innerHTML = "";
  testInsights.innerHTML = "<li>문항에 답한 뒤 결과 보기를 누르면 해석이 표시됩니다.</li>";
});

render();
