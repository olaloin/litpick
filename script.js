
const questions = [
  { q: "1. 어떤 글이 더 끌리나요?", options: [{ text: "삶의 고통을 섬세히 담은 현실적 이야기", type: "realist" }, { text: "상징과 비유가 어우러진 서정적 이야기", type: "poetic" }] },
  { q: "2. 선호하는 배경은?", options: [{ text: "현대 도시 혹은 일상적 공간", type: "realist" }, { text: "시간과 장소를 초월한 분위기", type: "poetic" }] },
  { q: "3. 당신에게 문학이란?", options: [{ text: "사회와 인간에 대한 날카로운 성찰", type: "critical" }, { text: "내면과 감정의 아름다운 기록", type: "lyrical" }] },
  { q: "4. 문체 취향은?", options: [{ text: "단정하고 담백한 문장", type: "realist" }, { text: "음악처럼 흐르는 운율감 있는 문장", type: "poetic" }] },
  { q: "5. 책을 통해 얻고 싶은 것은?", options: [{ text: "세계에 대한 이해", type: "critical" }, { text: "감정에 대한 공감", type: "lyrical" }] },
];

const books = {
  teen: {
    realist: [{ title: "이금이 『사서함 110호의 우편물』", image: "https://image.yes24.com/goods/2731702/XL", description: "십대의 성장과 가족의 의미를 섬세하게 그려낸 작품." }],
    poetic: [{ title: "이해인 『민들레의 영토』", image: "https://image.yes24.com/goods/35584253/XL", description: "소박한 감정과 희망을 담은 시 모음." }]
  },
  twenties: {
    realist: [{ title: "김금희 『경애의 마음』", image: "https://image.yes24.com/goods/82842175/XL", description: "불완전한 사람들의 관계 속에서 피어나는 연대의 이야기." }],
    poetic: [{ title: "문태준 『수런거리는 뒤란』", image: "https://image.yes24.com/goods/62270190/XL", description: "고요한 자연과 삶의 결을 담아낸 현대 시집." }]
  },
  thirties: {
    realist: [{ title: "박완서 『그 많던 싱아는 누가 다 먹었을까』", image: "https://image.yes24.com/goods/73797876/XL", description: "전쟁과 가난 속에서도 피어나는 인간다움의 기록." }],
    poetic: [{ title: "정현종 『떨어져 있는 것들을 사랑하라』", image: "https://image.yes24.com/goods/93396255/XL", description: "존재의 연결과 시적 사유를 담은 시집." }]
  }
};

let current = 0;
let selectedScores = { realist: 0, poetic: 0, critical: 0, lyrical: 0 };
let selectedAgeGroup = '';

function startQuiz(ageGroup) {
  selectedAgeGroup = ageGroup;
  document.getElementById("age-selection").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function showQuestion() {
  if (current >= questions.length) return showResult();

  const q = questions[current];
  const qDiv = document.getElementById("question");
  const optDiv = document.getElementById("options");
  qDiv.innerHTML = `<h2>${q.q}</h2>`;
  optDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.text;
    btn.onclick = () => {
      selectedScores[opt.type]++;
      current++;
      showQuestion();
    };
    optDiv.appendChild(btn);
  });
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  const core = selectedScores.realist >= 2 ? "realist" : "poetic";
  const age = selectedAgeGroup;
  const selectedBooks = books[age][core];

  const resultText = core === "realist" ? "사실적이고 성찰적인 문학 세계를 지향하는 당신" : "감성적이고 상징적인 서사를 사랑하는 당신";
  document.getElementById("result-description").innerText = resultText;

  const bookDiv = document.getElementById("recommended-books");
  bookDiv.innerHTML = "";

  if (selectedBooks && selectedBooks.length > 0) {
    selectedBooks.forEach(book => {
      bookDiv.innerHTML += `
        <div>
          <img src="${book.image}" />
          <h4>${book.title}</h4>
          <p>${book.description}</p>
        </div>
      `;
    });
  } else {
    bookDiv.innerHTML = "<p>추천 작품이 준비 중입니다.</p>";
  }
}
