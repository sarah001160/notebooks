const tarotCards = [
    {
        name: '愚者',
        symbol: '🃏',
        keywords: '新開始、冒險、純真',
        meaning:
            '代表新的開始與無限可能。這是一個充滿希望的時刻，鼓勵你勇敢踏出第一步，擁抱未知的冒險。',
    },
    {
        name: '魔術師',
        symbol: '🎩',
        keywords: '創造力、技能、行動',
        meaning:
            '象徵著你擁有實現夢想的所有資源和能力。現在是將想法化為現實的最佳時機，相信自己的力量。',
    },
    {
        name: '女祭司',
        symbol: '🌙',
        keywords: '直覺、智慧、神秘',
        meaning:
            '提醒你傾聽內在的聲音。答案就在你心中，通過冥想和反思，你將找到真正的智慧。',
    },
    {
        name: '皇后',
        symbol: '👑',
        keywords: '豐盛、滋養、創造',
        meaning:
            '代表豐收與滋養的能量。這是關於愛、美麗和創造力的時期，享受生活的豐盛。',
    },
    {
        name: '皇帝',
        symbol: '🏛️',
        keywords: '權威、結構、穩定',
        meaning:
            '象徵秩序與控制。建立穩固的基礎，運用你的領導力和組織能力來達成目標。',
    },
    {
        name: '教皇',
        symbol: '📿',
        keywords: '傳統、信仰、指導',
        meaning:
            '代表傳統智慧和精神指引。尋求導師的建議，或是遵循經過時間考驗的方法。',
    },
    {
        name: '戀人',
        symbol: '💕',
        keywords: '愛情、選擇、和諧',
        meaning:
            '關於重要的選擇和關係。這張牌提醒你在決策時要跟隨內心，並尋求和諧與平衡。',
    },
    {
        name: '戰車',
        symbol: '🏇',
        keywords: '意志、勝利、前進',
        meaning:
            '象徵著通過決心和意志力獲得成功。克服障礙，勇往直前，勝利即將到來。',
    },
    {
        name: '力量',
        symbol: '🦁',
        keywords: '勇氣、耐心、慈悲',
        meaning:
            '代表內在的力量和勇氣。不是通過武力，而是通過溫柔、耐心和自我控制來克服挑戰。',
    },
    {
        name: '隱者',
        symbol: '🕯️',
        keywords: '內省、孤獨、智慧',
        meaning:
            '建議你花時間獨處和反思。通過內省，你將找到深層的智慧和人生方向。',
    },
    {
        name: '命運之輪',
        symbol: '☸️',
        keywords: '變化、命運、循環',
        meaning:
            '提醒你生命的循環本質。變化是不可避免的，接受命運的流轉，把握機會。',
    },
    {
        name: '正義',
        symbol: '⚖️',
        keywords: '公平、真相、因果',
        meaning:
            '代表公平和真理。你的行為將有其後果，誠實和正直將帶來正面的結果。',
    },
    {
        name: '倒吊人',
        symbol: '🙃',
        keywords: '犧牲、等待、新視角',
        meaning:
            '建議從不同角度看待問題。有時停頓和犧牲能帶來更深的理解和智慧。',
    },
    {
        name: '死神',
        symbol: '💀',
        keywords: '結束、轉變、重生',
        meaning:
            '代表轉變和新生。舊的必須結束，才能為新的開始騰出空間，這是自然的循環。',
    },
    {
        name: '節制',
        symbol: '🍶',
        keywords: '平衡、調和、節制',
        meaning:
            '提醒你尋求中庸之道。通過平衡和耐心，你將找到和諧與內心的平靜。',
    },
    {
        name: '惡魔',
        symbol: '😈',
        keywords: '束縛、誘惑、執著',
        meaning:
            '警示你可能被某些事物束縛。認識到這些限制，你就有力量打破枷鎖。',
    },
    {
        name: '高塔',
        symbol: '🏰',
        keywords: '突變、啟示、解放',
        meaning:
            '代表突然的變化和啟示。雖然可能震撼，但這種破壞將帶來必要的改變和真相。',
    },
    {
        name: '星星',
        symbol: '⭐',
        keywords: '希望、靈感、療癒',
        meaning: '象徵希望和靈感。即使在黑暗時刻，也要保持信念，光明即將到來。',
    },
    {
        name: '月亮',
        symbol: '🌙',
        keywords: '幻象、直覺、不確定',
        meaning: '提醒你注意幻象和欺騙。相信你的直覺，但要小心不要被恐懼蒙蔽。',
    },
    {
        name: '太陽',
        symbol: '☀️',
        keywords: '成功、喜悅、活力',
        meaning:
            '代表成功、喜悅和正面能量。這是充滿光明和幸福的時期，盡情享受吧！',
    },
    {
        name: '審判',
        symbol: '📯',
        keywords: '覺醒、重生、召喚',
        meaning: '象徵重大的覺醒和自我評估。這是重生和回應更高召喚的時刻。',
    },
    {
        name: '世界',
        symbol: '🌍',
        keywords: '完成、成就、圓滿',
        meaning:
            '代表完成和成就。一個循環已經結束，你已經達成目標，準備迎接新的開始。',
    },
]

let selectedCards = []
let shuffledDeck = []

// 創建星星背景
function createStars() {
    const starsContainer = document.getElementById('stars')
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.width = Math.random() * 3 + 'px'
        star.style.height = star.style.width
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 3 + 's'
        starsContainer.appendChild(star)
    }
}

function startReading() {
    document.getElementById('deckSection').classList.remove('hidden')
    document.getElementById('startBtn').disabled = true
    shuffledDeck = [...tarotCards].sort(() => Math.random() - 0.5)
    displayDeck()
}

function displayDeck() {
    const deckElement = document.getElementById('cardDeck')
    deckElement.innerHTML = ''
    shuffledDeck.forEach((card, index) => {
        const cardElement = document.createElement('div')
        cardElement.className = 'card'
        cardElement.innerHTML = '<div class="card-back">🔮</div>'
        cardElement.onclick = () => selectCard(index)
        deckElement.appendChild(cardElement)
    })
}

function selectCard(index) {
    if (selectedCards.length >= 3) return

    const card = shuffledDeck[index]
    selectedCards.push(card)

    // 移除已選擇的卡片
    const cardElements = document.querySelectorAll('.card')
    cardElements[index].style.opacity = '0.3'
    cardElements[index].style.pointerEvents = 'none'

    if (selectedCards.length === 3) {
        setTimeout(showResults, 500)
    }
}

function showResults() {
    document.getElementById('deckSection').classList.add('hidden')
    document.getElementById('resultSection').classList.remove('hidden')

    const positions = ['過去', '現在', '未來']
    const selectedCardsElement = document.getElementById('selectedCards')
    selectedCardsElement.innerHTML = ''

    selectedCards.forEach((card, index) => {
        const cardDiv = document.createElement('div')
        cardDiv.className = 'selected-card'
        cardDiv.innerHTML = `
                    <div class="card-label">${positions[index]}</div>
                    <div class="selected-card-container">${card.symbol}</div>
                    <h3>${card.name}</h3>
                    <p style="color: #c9a0ff;">${card.keywords}</p>
                `
        selectedCardsElement.appendChild(cardDiv)
    })

    displayInterpretation()
}

function displayInterpretation() {
    const question = document.getElementById('question').value
    const interpretationElement = document.getElementById('interpretation')

    let html = '<h2>🔮 塔羅解讀</h2>'

    if (question) {
        html += `<div style="text-align: center; margin-bottom: 30px; padding: 20px; background: rgba(255,215,0,0.1); border-radius: 10px;">
                    <p style="color: #ffd700; font-size: 1.2em;">你的問題：${question}</p>
                </div>`
    }

    const positions = [
        {
            title: '過去 - 根源與影響',
            desc: '這張牌揭示了影響當前情況的過去事件和經驗',
        },
        {
            title: '現在 - 當下的狀態',
            desc: '這張牌反映了你目前的處境和需要關注的重點',
        },
        {
            title: '未來 - 可能的發展',
            desc: '這張牌指出了未來可能的方向和結果',
        },
    ]

    selectedCards.forEach((card, index) => {
        html += `
                    <div class="card-meaning">
                        <h3>${card.symbol} ${card.name}</h3>
                        <h4>${positions[index].title}</h4>
                        <p style="color: #c9a0ff; margin-bottom: 10px; font-style: italic;">${positions[index].desc}</p>
                        <p><strong>關鍵字：</strong>${card.keywords}</p>
                        <p style="margin-top: 10px;">${card.meaning}</p>
                    </div>
                `
    })

    html += `
                <div style="margin-top: 30px; padding: 25px; background: rgba(139,92,246,0.2); border-radius: 15px; border: 2px solid rgba(139,92,246,0.4);">
                    <h3 style="color: #ffd700; margin-bottom: 15px; text-align: center;">✨ 整體建議 ✨</h3>
                    <p style="line-height: 1.8; text-align: center;">
                        過去的經歷塑造了現在的你，而現在的選擇將影響未來的道路。
                        塔羅牌為你指引方向，但最終的決定權在你手中。
                        相信自己的直覺，勇敢地走向屬於你的命運。
                    </p>
                </div>
            `

    interpretationElement.innerHTML = html
}

function reset() {
    selectedCards = []
    document.getElementById('question').value = ''
    document.getElementById('startBtn').disabled = false
    document.getElementById('resultSection').classList.add('hidden')
    document.getElementById('deckSection').classList.add('hidden')
}

// 初始化
createStars()
