# 종합시험 정복기 — 비교정치 배틀

정치학 대학원 종합시험 대비 AI 학습 앱

## 기능
- 📝 객관식 퀴즈 (기본 / 하드모드 / 기출 스타일)
- ✍️ 설명형 서술 연습 (10분 타이머)
- 📜 논술형 서술 연습 (20분 타이머)  
- 📓 오답노트 (자동 저장 + AI 오답 분석)
- ⭐ XP 시스템 & 스트릭

---

## Netlify 배포 방법

### 1. GitHub에 올리기
```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_NAME/polisci-game.git
git push -u origin main
```

### 2. Netlify 연결
1. [netlify.com](https://netlify.com) 접속 → **Add new site** → **Import from Git**
2. GitHub 저장소 선택
3. Build settings는 자동으로 `netlify.toml`에서 읽힘

### 3. API 키 설정 ⚠️ 필수
Netlify 대시보드에서:
- **Site settings** → **Environment variables** → **Add a variable**
- Key: `ANTHROPIC_API_KEY`
- Value: `sk-ant-...` (Anthropic Console에서 발급)

### 4. 배포
설정 후 자동으로 배포됨. `https://your-site.netlify.app`에서 접속 가능.

---

## 로컬 개발
```bash
npm install -g netlify-cli
netlify dev
```
`.env` 파일에 `ANTHROPIC_API_KEY=sk-ant-...` 추가 후 실행.
