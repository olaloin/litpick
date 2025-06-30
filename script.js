
const questions = [
  {
    q: "Q1. 어떤 이야기에 더 끌리시나요?",
    options: [
      { text: "현실을 사실적으로 담은 이야기", type: "realist" },
      { text: "상상력이 느껴지는 상징적인 이야기", type: "fantasy" }
    ]
  },
  {
    q: "Q2. 어떤 문장이 더 좋으신가요?",
    options: [
      { text: "그는 조용히 눈을 감았다. 그리고 아무 일도 일어나지 않았다.", type: "realist" },
      { text: "그의 눈꺼풀은 무거운 밤하늘을 닮아 천천히 내려앉았다.", type: "fantasy" }
    ]
  },
  {
    q: "Q3. 어떤 주제를 선호하시나요?",
    options: [
      { text: "사회의 구조, 불평등, 여성, 노동", type: "social" },
      { text: "개인의 감정, 가족, 일상, 관계", type: "daily" }
    ]
  },
  {
    q: "Q4. 전개 방식은?",
    options: [
      { text: "빠르고 명확한 전개", type: "social" },
      { text: "서정적이고 여운 있는 서술", type: "daily" }
    ]
  },
  {
    q: "Q5. 주로 끌리는 배경은?",
    options: [
      { text: "현재 혹은 근미래", type: "realist" },
      { text: "과거 혹은 비현실적 시간", type: "fantasy" }
    ]
  }
];

const books = {
  teen: {
    realist: [
      { title: "손원평 『아몬드』", image: "https://image.yes24.com/goods/40936880/XL", description: "감정을 느끼지 못하는 소년 윤재의 성장 이야기." },
      { title: "이희영 『페인트』", image: "https://image.yes24.com/goods/72816757/XL", description: "국가 부모 제도 속에서 자신만의 진짜 가족을 찾는 이야기." }
    ],
    fantasy: [
      { title: "정세랑 『시선으로부터』", image: "https://image.yes24.com/goods/74638817/XL", description: "현대 사회 속에서 성장하는 청춘들의 이야기." },
      { title: "김초엽 『우리가 빛의 속도로 갈 수 없다면』", image: "https://image.yes24.com/goods/75252075/XL", description: "가상의 세계를 배경으로 한 과학적 사색." }
    ]
  },
  twenties: {
    realist: [
      { title: "김애란 『두근두근 내 인생』", image: "https://image.yes24.com/goods/76431527/XL", description: "세상과 소통하는 감성적인 이야기." },
      { title: "김금희 『경애의 마음』", image: "https://image.yes24.com/goods/82842175/XL", description: "갈등과 이해의 경계에서 인물들의 감정을 그린 소설." }
    ],
    fantasy: [
      { title: "황정은 『디 디의 우산』", image: "https://image.yes24.com/goods/70153298/XL", description: "과거와 미래를 넘나드는 신비로운 이야기." },
      { title: "정세랑 『시선으로부터』", image: "https://image.yes24.com/goods/74638817/XL", description: "청춘들의 내면을 탐구하는 몽환적인 이야기." }
    ]
  },
  thirties: {
    realist: [
      { title: "박완서 『그 많던 싱아는 누가 다 먹었을까』", image: "https://image.yes24.com/goods/73797876/XL", description: "소박한 일상의 감동을 담은 이야기." },
      { title: "최은영 『쇼코의 미소』", image: "https://image.yes24.com/goods/74642453/XL", description: "가족과의 관계 속에서 그려지는 성숙한 성장 이야기." }
    ],
    fantasy: [
      { title: "류시화 『지금 알고 있는 걸 그때도 알았더라면』", image: "https://image.yes24.com/goods/72874185/XL", description: "깊은 인생 철학을 담은 시집." },
      { title: "김초엽 『우리가 빛의 속도로 갈 수 없다면』", image: "https://image.yes24.com/goods/75252075/XL", description: "미래와 상상을 통해 감정의 본질을 탐구하는 이야기." }
    ]
  }
};

let current = 0;
let selectedAgeGroup = '';
let selectedScores = { realist: 0, fantasy: 0, social: 0, daily: 0 };

function startQuiz(ageGroup) {
  selectedAgeGroup = ageGroup;
  document.getElementById("age-selection").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function showQuestion() {
  if (current >= questions.length) {
    showResult();
    return;
  }
  const q = questions[current];
  document.getElementById("question").innerHTML = `<h2>${q.q}</h2>`;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.text;
    btn.onclick = () => {
      selectedScores[opt.type]++;
      current++;
      showQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";

  let type = selectedScores.social >= 2 ? 'social' : (selectedScores.daily >= 2 ? 'daily' : (selectedScores.fantasy >= 2 ? 'fantasy' : 'realist'));
  const recommendedBooks = books[selectedAgeGroup][type];
  
  let resultDescription = `${type === 'realist' ? "감성적 리얼리스트" : type === 'fantasy' ? "몽환적 사색가" : type === 'social' ? "사회비판적 탐구자" : "따뜻한 일상 관찰자"}에 가까운 당신에게 추천하는 작품입니다!`;
  document.getElementById("result-description").innerText = resultDescription;

  const recommendedDiv = document.getElementById("recommended-books");
  recommendedBooks.forEach(book => {
    recommendedDiv.innerHTML += `
      <div>
        <img src="${book.image}" alt="${book.title}" />
        <h4>${book.title}</h4>
        <p>${book.description}</p>
      </div>
    `;
  });
}
