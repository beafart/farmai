"use client";

import { ChangeEvent, useEffect, useState } from "react";
import ResultCard, { PredictionResult } from "./ResultCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function UploadPanel() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 사용자가 다른 이미지를 고르면 브라우저 메모리에 임시 미리보기 URL을 만듭니다.
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setResult(null);
    setErrorMessage(null);
  }

  async function handlePredict() {
    if (!selectedFile) {
      setErrorMessage("먼저 농산물 이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // multipart/form-data 요청으로 이미지를 FastAPI /predict 엔드포인트에 전송합니다.
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.detail ?? "AI 판정 요청에 실패했습니다.");
      }

      const data = (await response.json()) as PredictionResult;
      setResult(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white/85 p-5 shadow-soft backdrop-blur sm:p-6">
      <div className="rounded-lg border-2 border-dashed border-farm-leaf/25 bg-farm-field/50 p-5">
        <label
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white px-5 py-8 text-center transition hover:bg-slate-50"
          htmlFor="produce-image"
        >
          <span className="text-base font-bold text-slate-900">농산물 이미지 업로드</span>
          <span className="mt-2 text-sm text-slate-500">
            JPG, PNG, WEBP 파일을 선택할 수 있습니다.
          </span>
          <span className="mt-5 rounded-full bg-farm-leaf px-5 py-3 text-sm font-bold text-white">
            이미지 선택
          </span>
          <input
            accept="image/*"
            className="sr-only"
            id="produce-image"
            onChange={handleFileChange}
            type="file"
          />
        </label>
      </div>

      {previewUrl ? (
        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <img
            alt="업로드한 농산물 미리보기"
            className="h-72 w-full object-cover"
            src={previewUrl}
          />
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <p className="truncate text-sm font-medium text-slate-700">{selectedFile?.name}</p>
            <p className="shrink-0 text-xs text-slate-500">
              {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : ""}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex h-72 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500">
          선택한 이미지 미리보기가 여기에 표시됩니다.
        </div>
      )}

      {errorMessage ? (
        <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        className="mt-5 w-full rounded-lg bg-slate-950 px-5 py-4 text-base font-bold text-white transition hover:bg-farm-leaf disabled:cursor-not-allowed disabled:bg-slate-300"
        disabled={isLoading || !selectedFile}
        onClick={handlePredict}
        type="button"
      >
        {isLoading ? "AI 판정 중..." : "AI 판정하기"}
      </button>

      {result ? (
        <div className="mt-5">
          <ResultCard result={result} />
        </div>
      ) : null}
    </div>
  );
}
