import UploadPanel from "@/components/UploadPanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dff4d6_0,#f7faf4_32%,#ffffff_100%)]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-farm-leaf text-lg font-black text-white shadow-soft">
              F
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-farm-leaf">
                FARMAI
              </p>
              <p className="text-xs text-slate-500">AI produce grading prototype</p>
            </div>
          </div>
          <span className="rounded-full border border-farm-leaf/20 bg-white/70 px-4 py-2 text-sm font-medium text-farm-leaf">
            REST API + Mock AI
          </span>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-xl">
            <p className="mb-4 inline-flex rounded-full bg-farm-field px-4 py-2 text-sm font-semibold text-farm-leaf">
              농산물 품질 판정을 더 빠르게
            </p>
            <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              FARMAI
              <span className="block text-farm-leaf">이미지 판정 프로토타입</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              농산물 이미지를 업로드하면 FastAPI 백엔드가 임시 AI 판정 결과를 생성하고,
              프론트엔드는 등급과 추천 조치를 깔끔한 카드로 보여줍니다.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {["업로드", "AI 판정", "결과 카드"].map((item) => (
                <div
                  className="rounded-lg border border-slate-200 bg-white/75 px-3 py-4 shadow-sm"
                  key={item}
                >
                  <p className="text-sm font-bold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <UploadPanel />
        </div>
      </section>
    </main>
  );
}
