const labels = {
  NS: "자극추구",
  HA: "위험회피",
  RD: "사회적 민감성",
  P: "인내력",
  SD: "자율성",
  C: "연대감",
  ST: "자기초월",
};

const ranges = Array.from(document.querySelectorAll('input[type="range"]'));
const chart = document.querySelector("#bar-chart");
const insights = document.querySelector("#insights");

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

function render() {
  const scores = getScores();

  ranges.forEach((input) => {
    input.nextElementSibling.value = input.value;
  });

  chart.innerHTML = Object.entries(scores)
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

  insights.innerHTML = buildInsights(scores)
    .map((item) => `<li>${item}</li>`)
    .join("");
}

ranges.forEach((input) => input.addEventListener("input", render));
render();
