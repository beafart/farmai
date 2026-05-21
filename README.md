# FARMAI Prototype

농산물 이미지를 업로드하면 FastAPI 백엔드가 mock AI 판정 결과를 반환하고, Next.js 프론트엔드가 결과를 카드 UI로 보여주는 간단한 웹 프로토타입입니다.

## 폴더 구조

```text
farmai-prototype/
├─ frontend/
│  ├─ app/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ ResultCard.tsx
│  │  └─ UploadPanel.tsx
│  ├─ next-env.d.ts
│  ├─ next.config.js
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ tailwind.config.ts
│  └─ tsconfig.json
├─ backend/
│  ├─ main.py
│  └─ requirements.txt
└─ README.md
```

## 실행 준비

필요한 도구:

- Python 3.10 이상
- Node.js 18 이상
- npm

터미널을 2개 열고 각각 백엔드와 프론트엔드를 실행합니다.

### 1. 백엔드 실행

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

백엔드 API는 `http://localhost:8000`에서 실행됩니다.

### 2. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

프론트엔드는 `http://localhost:3000`에서 실행됩니다.

## 사용 방법

1. 브라우저에서 `http://localhost:3000`을 엽니다.
2. 농산물 이미지를 선택합니다.
3. 이미지 미리보기를 확인합니다.
4. `AI 판정하기` 버튼을 누릅니다.
5. mock AI 결과 카드에서 등급, 신뢰도, 추천 조치를 확인합니다.

## API

### POST `/predict`

- 요청 형식: `multipart/form-data`
- 필드명: `file`
- 응답 예시:

```json
{
  "grade": "A급",
  "confidence": 92,
  "recommendation": "품질이 우수합니다. 신선 판매 채널에 우선 배정하세요."
}
```

현재 AI Layer는 실제 모델이 아니라 Python mock prediction 함수입니다. 추후 학습된 모델이 준비되면 `backend/main.py`의 `mock_predict` 함수를 실제 추론 함수로 교체하면 됩니다.
