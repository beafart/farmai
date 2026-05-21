export type PredictionResult = {
  grade: string;
  confidence: number;
  recommendation: string;
};

type ResultCardProps = {
  result: PredictionResult;
};

const gradeStyles: Record<string, string> = {
  "A급": "border-emerald-200 bg-emerald-50 text-emerald-800",
  "B급": "border-sky-200 bg-sky-50 text-sky-800",
  "가공 추천": "border-amber-200 bg-amber-50 text-amber-800",
  "폐기 위험": "border-rose-200 bg-rose-50 text-rose-800",
};

export default function ResultCard({ result }: ResultCardProps) {
  const gradeStyle =
    gradeStyles[result.grade] ?? "border-slate-200 bg-slate-50 text-slate-800";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">AI 판정 결과</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">{result.grade}</h2>
        </div>
        <span className={`rounded-full border px-4 py-2 text-sm font-bold ${gradeStyle}`}>
          {result.confidence}% 신뢰도
        </span>
      </div>

      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-farm-leaf transition-all"
            style={{ width: `${result.confidence}%` }}
          />
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-500">추천 조치</p>
        <p className="mt-2 leading-7 text-slate-700">{result.recommendation}</p>
      </div>
    </section>
  );
}
