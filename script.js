const characters = [
  { id:'luna', name:'樱小路露娜', ruby:'桜小路 ルナ', series:'近月少女的礼仪', group:'moon', image:'./assets/navel-luna.jpg', color:'#e99ab7', quote:'才华若值得被承认，就把它完整地呈现在我面前。', note:'樱公馆的主人，也是菲利亚女子学院备受瞩目的学生。', wiki:'https://zh.moegirl.org.cn/zh-hans/%E6%A8%B1%E5%B0%8F%E8%B7%AF%E9%9C%B2%E5%A8%9C' },
  { id:'asahi', name:'小仓朝日', ruby:'小倉 朝日', series:'近月少女的礼仪', group:'moon', image:'./assets/navel-asahi.jpg', color:'#8d79c6', quote:'为了追寻服装设计的梦想，我来到了这里。', note:'以女仆身份在樱公馆工作，并进入服饰专修学院学习。', wiki:'https://zh.moegirl.org.cn/zh-hans/%E5%B0%8F%E4%BB%93%E6%9C%9D%E6%97%A5' },
  { id:'resona', name:'大藏里想奈', ruby:'大蔵 りそな', series:'近月少女的礼仪', group:'moon', image:'./assets/navel-resona.jpg', color:'#b18bd4', quote:'我会帮助哥哥，因为那是我自己做出的选择。', note:'游星小一岁的异母妹妹，也是将哥哥引向新生活的重要之人。', wiki:'https://zh.moegirl.org.cn/zh-hans/%E5%A4%A7%E8%97%8F%E9%87%8C%E6%83%B3%E5%A5%88' },
  { id:'saika', name:'樱小路才华', ruby:'桜小路 才華 / 小倉 朝陽', series:'近月少女的礼仪2', group:'moon', image:'./assets/navel-saika.jpg', color:'#d58ba8', quote:'即使背负着耀眼的名字，也要亲手完成自己的作品。', note:'以“小仓朝阳”的身份进入服装设计科，真正身份是樱小路才华。', wiki:'https://zh.moegirl.org.cn/zh-hans/%E5%B0%8F%E4%BB%93%E6%9C%9D%E9%98%B3' },
  { id:'shiroha', name:'鸣濑白羽', ruby:'鳴瀬 しろは', series:'Summer Pockets RB', group:'summer', image:'./assets/summer-shiroha.png', color:'#78bde3', quote:'我不太擅长和人相处，也许这样反而更轻松。', note:'住在鸟白岛上的少女，安静而略显疏离。', wiki:'https://zh.moegirl.org.cn/zh-hans/%E9%B8%A3%E6%BF%91%E7%99%BD%E7%BE%BD' },
  { id:'ao', name:'空门苍', ruby:'空門 蒼', series:'Summer Pockets RB', group:'summer', image:'./assets/summer-ao.png', color:'#8d86d4', quote:'岛上的夏天很短，所以才不能浪费每一天。', note:'在岛上寻找特殊蝴蝶的少女，爽朗中藏着细腻心绪。', wiki:'https://zh.moegirl.org.cn/zh-hans/%E7%A9%BA%E9%97%A8%E8%8B%8D' },
  { id:'kamome', name:'久岛鸥', ruby:'久島 鴎', series:'Summer Pockets RB', group:'summer', image:'./assets/summer-kamome.png', color:'#ef9cae', quote:'去寻找宝藏吧，在这个只属于我们的夏天。', note:'带着行李箱来到岛上的少女，喜欢冒险与藏宝图。', wiki:'https://zh.moegirl.org.cn/zh-hans/%E4%B9%85%E5%B2%9B%E9%B8%A5' },
  { id:'tsumugi', name:'紬文德斯', ruby:'紬 ヴェンダース', series:'Summer Pockets RB', group:'summer', image:'./assets/summer-tsumugi.png', color:'#f3c366', quote:'我正在寻找想要做的事情，也寻找这个夏天的答案。', note:'在岛上寻找自我的少女，举止天然又认真。', wiki:'https://zh.moegirl.org.cn/zh-hans/%E4%8C%B7%E6%96%87%E5%BE%B7%E6%96%AF' },
]

const app = document.querySelector('#app')
const themeSwitch = document.querySelector('#themeSwitch')
const heroSide = document.querySelector('#heroSide')
const heroLine = document.querySelector('#heroLine')
const characterRail = document.querySelector('#characterRail')
const characterDetail = document.querySelector('#characterDetail')
let currentFilter = 'all'
let selectedId = 'luna'

function renderCharacters() {
  const visible = currentFilter === 'all' ? characters : characters.filter((item) => item.group === currentFilter)
  if (!visible.some((item) => item.id === selectedId)) selectedId = visible[0].id
  const selected = characters.find((item) => item.id === selectedId)
  characterDetail.style.setProperty('--character-color', selected.color)
  characterDetail.innerHTML = `<div class="detail-image ${selected.group}"><img src="${selected.image}" alt="${selected.name}官方角色图"></div><div class="detail-copy"><span>${selected.series}</span><h3>${selected.name}</h3><p class="ruby">${selected.ruby}</p><blockquote>“${selected.quote}”</blockquote><p>${selected.note}</p><a class="wiki-link" href="${selected.wiki}" target="_blank" rel="noreferrer" aria-label="在萌娘百科查看${selected.name}">前往萌娘百科 <span aria-hidden="true">↗</span></a></div>`
  characterRail.innerHTML = visible.map((item, index) => `<button class="character-thumb ${item.group} ${item.id === selectedId ? 'active' : ''}" data-id="${item.id}"><span class="thumb-index">0${index + 1}</span><span class="thumb-image"><img src="${item.image}" alt=""></span><span class="thumb-name"><strong>${item.name}</strong><small>${item.series}</small></span></button>`).join('')
}

function applyTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme
  app.classList.toggle('theme-summer', theme === 'summer')
  app.classList.toggle('theme-moon', theme === 'moon')
  themeSwitch.querySelectorAll('span').forEach((span) => span.classList.toggle('active', span.dataset.theme === theme))
  themeSwitch.setAttribute('aria-label', `切换到${theme === 'summer' ? '月夜' : '盛夏'}主题`)
  heroSide.textContent = theme === 'summer' ? 'SUMMER SIDE' : 'MOON SIDE'
  heroLine.textContent = theme === 'summer' ? '那年夏天的蓝，至今仍然清晰。' : '月光落在樱花与礼服之间。'
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'summer' ? '#fffaf6' : '#0c1020')
  if (persist) {
    try { localStorage.setItem('moon-summer-theme', theme) } catch { /* file:// 等受限环境下忽略持久化 */ }
  }
}

themeSwitch.addEventListener('click', (event) => {
  const target = event.target.closest('[data-theme]')
  const theme = target?.dataset.theme || (app.classList.contains('theme-summer') ? 'moon' : 'summer')
  if (document.startViewTransition) document.startViewTransition(() => applyTheme(theme))
  else applyTheme(theme)
})

document.querySelector('#filters').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]')
  if (!button) return
  currentFilter = button.dataset.filter
  document.querySelectorAll('[data-filter]').forEach((item) => { item.classList.toggle('active', item === button); item.setAttribute('aria-selected', item === button ? 'true' : 'false') })
  renderCharacters()
})

characterRail.addEventListener('click', (event) => {
  const button = event.target.closest('[data-id]')
  if (!button) return
  selectedId = button.dataset.id
  renderCharacters()
})

const nav = document.querySelector('#nav')
document.querySelector('#menuButton').addEventListener('click', () => nav.classList.toggle('open'))
nav.addEventListener('click', () => nav.classList.remove('open'))

const lightbox = document.querySelector('#lightbox')
const closeLightbox = () => { lightbox.hidden = true; document.body.style.overflow = '' }
document.querySelectorAll('.memory').forEach((item) => item.addEventListener('click', () => {
  document.querySelector('#lightboxImage').src = item.dataset.image
  document.querySelector('#lightboxImage').alt = item.dataset.title
  document.querySelector('#lightboxTitle').textContent = item.dataset.title
  lightbox.hidden = false
  document.body.style.overflow = 'hidden'
}))
document.querySelector('#lightboxClose').addEventListener('click', closeLightbox)
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox() })
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox() })

let savedTheme = null
try { savedTheme = localStorage.getItem('moon-summer-theme') } catch { /* 仍可正常切换主题 */ }
applyTheme(savedTheme === 'moon' ? 'moon' : 'summer', false)
renderCharacters()
