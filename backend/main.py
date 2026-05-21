from random import randint, choice

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="FARMAI Prediction API")

# Next.js 개발 서버(localhost:3000)가 FastAPI(localhost:8000)에 접근할 수 있도록 CORS를 허용합니다.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionResponse(BaseModel):
    grade: str
    confidence: int
    recommendation: str


def mock_predict(filename: str) -> PredictionResponse:
    """실제 AI 모델 대신 랜덤 판정 결과를 반환하는 임시 함수입니다."""
    candidates = [
        {
            "grade": "A급",
            "recommendation": "품질이 우수합니다. 신선 판매 채널에 우선 배정하세요.",
        },
        {
            "grade": "B급",
            "recommendation": "일반 판매에 적합합니다. 포장 전 외관을 한 번 더 확인하세요.",
        },
        {
            "grade": "가공 추천",
            "recommendation": "외관 품질이 낮을 수 있습니다. 주스, 절임, 소스 등 가공용으로 분류하세요.",
        },
        {
            "grade": "폐기 위험",
            "recommendation": "변질 가능성이 있습니다. 작업자가 직접 확인한 뒤 폐기 여부를 결정하세요.",
        },
    ]
    result = choice(candidates)

    # filename은 지금은 기록/디버깅 용도로만 남겨둡니다. 실제 모델에서는 이미지 메타데이터와 함께 활용할 수 있습니다.
    _ = filename

    return PredictionResponse(
        grade=result["grade"],
        confidence=randint(72, 98),
        recommendation=result["recommendation"],
    )


@app.get("/")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "FARMAI Prediction API"}


@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)) -> PredictionResponse:
    """업로드된 이미지 파일을 받아 mock AI 판정 결과를 반환합니다."""
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="이미지 파일만 업로드할 수 있습니다.")

    # 프로토타입에서는 파일을 저장하지 않고 읽기만 합니다. 나중에 필요하면 여기에서 스토리지 저장을 추가할 수 있습니다.
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="빈 파일은 판정할 수 없습니다.")

    return mock_predict(file.filename or "uploaded-image")
