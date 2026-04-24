import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-36">
        <p className="text-sm font-medium text-[#8B8378] tracking-widest uppercase mb-4">
          FADE
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-[#2D2D2D] leading-tight mb-6 max-w-2xl">
          사랑하는 분을 잃은 후,<br />
          해야 할 일들을 함께 정리해드립니다.
        </h1>
        <p className="text-base md:text-lg text-[#4A4A4A] mb-10 max-w-xl leading-relaxed">
          상속 행정은 복잡하고 기한이 촉박합니다.<br />
          FADE가 단계별로 안내하고, 놓치는 것이 없도록 도와드립니다.
        </p>
        <Link
          href="/onboarding/step-1"
          className="inline-block bg-[#8B8378] hover:bg-[#7a7268] text-white text-sm font-medium px-8 py-3 rounded-lg transition-colors"
        >
          지금 시작하기 — 무료
        </Link>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-4">
            상속 행정, 왜 이렇게 어려울까요?
          </h2>
          <p className="text-[#4A4A4A] mb-12 max-w-2xl mx-auto">
            슬픔을 추스르기도 전에 처리해야 할 행정 절차가 밀려옵니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "수십 가지 처리 사항",
                body: "사망신고부터 금융 조회, 부동산 등기까지 — 어디서부터 시작해야 할지 막막합니다.",
              },
              {
                title: "촉박한 법적 기한",
                body: "상속포기는 3개월, 상속세 신고는 6개월. 기한을 놓치면 불이익이 발생합니다.",
              },
              {
                title: "흩어진 정보",
                body: "정부 사이트, 법원, 세무서, 은행 — 각각 찾아다니며 정보를 모아야 합니다.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#F9F8F6] rounded-xl p-6 border border-[#E0E0E0]"
              >
                <h3 className="font-semibold text-[#2D2D2D] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#F9F8F6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-12">
            FADE가 해드리는 것
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              {
                title: "맞춤형 체크리스트",
                body: "가족 구성과 자산 현황에 맞게 해야 할 일을 자동으로 정리해드립니다.",
              },
              {
                title: "기한 알림",
                body: "법적 기한이 가까운 항목을 우선순위로 표시하여 놓치지 않도록 돕습니다.",
              },
              {
                title: "상속세 자동 계산",
                body: "복잡한 상속세를 간단하게 미리 계산해보고, 절세 방법도 안내받으세요.",
              },
              {
                title: "단계별 가이드",
                body: "각 항목별로 어떻게 진행해야 하는지 상세한 가이드를 제공합니다.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 border border-[#E0E0E0]"
              >
                <h3 className="font-semibold text-[#2D2D2D] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#8B8378] py-20 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          지금 바로 시작해보세요
        </h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          복잡한 상속 행정을 FADE와 함께라면 하나씩 해결할 수 있습니다.
        </p>
        <Link
          href="/onboarding/step-1"
          className="inline-block bg-white text-[#8B8378] font-semibold px-8 py-3 rounded-lg hover:bg-[#F2EFE9] transition-colors"
        >
          무료로 시작하기
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E0E0E0] py-8 px-4 text-center">
        <p className="text-sm text-[#4A4A4A]">© 2026 FADE. All rights reserved.</p>
      </footer>
    </div>
  );
}
