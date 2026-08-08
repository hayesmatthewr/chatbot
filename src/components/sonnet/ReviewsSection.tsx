import { StarIcon } from "./icons";

const SUMMARY_TOPICS = [
  { label: "Sleep Quality Difference", pct: 5, desc: "It was observed by customers that the product made a huge difference in their sleep quality and performance." },
  { label: "Sleep Aid Effectiveness", pct: 4, desc: "It was observed by customers that the supplement helped them fall asleep faster and return to sleep easier." },
  { label: "Sleep Experience", pct: 54, desc: "A significant amount of customers expressed appreciation for the good sleep they experienced with Proper Core Sleep." },
  { label: "Sleep Improvement Results", pct: 5, desc: "Customers raved about the results they achieved with the product, stating that it significantly improved their sleep." },
  { label: "Sleep Improvement", pct: 7, desc: "Customers expressed appreciation for the improvement they have experienced since using the Core sleep product in their sleep." },
];

const HIGHLIGHTS = [
  { quote: "Not waking up groggy is a bonus and I am really enjoying a good night's sleep!", author: "Kellyann R." },
  { quote: "works well to help me get a restful night's sleep", author: "Nancy" },
  { quote: "Core sleep almost immediately improved my sleep initiation.", author: "William S." },
];

const REVIEWS = [
  { title: "Transformative", body: "Taking Core Sleep for a month now after trying two other formulas has been transformative. I've been sleeping through the night and if I wake up to go to the bathroom, it's easy to fall asleep. I'm feeling rested and ready for the day.", author: "Jason P.", rating: 5 },
  { title: "Would highly recommend to anybody", body: "Would highly recommend to anybody looking to boost their sleep quality. I tried it for 30 days to see how my sleep performance would compare vs. 30 days prior (I track on Whoop). The results were pretty meaningful! REM sleep accounted for 22% of my total sleep while using Sonnet vs. 17% the 30 days prior. That's about 20 extra minutes of REM per night, without any grogginess the next day.", author: "Gerardo G.", rating: 5 },
  { title: "It Works!", body: "I have tried so many sleep aids I cannot count them. Core Sleep really works and helps me sleep through the night. Even when I wake up, I'm able to get back to sleep quickly. It has been a life changer!", author: "Kenneth T.", rating: 5 },
  { title: "A 10 hour snooze", body: "I gave my friend two Core pills last night. She has major trouble sleeping. She slept 10 hours. So excited I could share it with her.", author: "John A.", rating: 5 },
  { title: "Core Sleep is an excellent", body: "Core Sleep is an excellent product for sleep. It's especially good for putting you to sleep. If you have difficulty staying asleep try Sleep and Calm. You may take both together.", author: "Susan", rating: 5 },
  { title: "Works well", body: "After taking this for a few days it started working well but as time went on it's not as effective. Still helps but waking up more. I do like that I am not drowsy from it the next day.", author: "Mary W.", rating: 4 },
  { title: "Does not work", body: "Does not work", author: "Debbie", rating: 1 },
  { title: "Best sleep ever", body: "This really works. I sleep all night and don't wake up groggy.", author: "Cindy B.", rating: 5 },
  { title: "Game changer for sleep!", body: "Game changer for sleep!", author: "Tammatha", rating: 5 },
];

function Stars({ rating, className = "text-[#221D35]" }: { rating: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < rating} className="w-4 h-4" />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Stars rating={5} className="text-[#345E9E] w-5 h-5" />
          <span className="font-semibold">4.6 / 5</span>
          <span className="text-[#221D35]/60">from 217 reviews</span>
        </div>

        <div className="bg-[#EEF1EA] rounded-2xl p-8 lg:p-10 mb-12">
          <h2 className="text-xl font-semibold mb-3">AI Generated Review Summary</h2>
          <p className="text-[#221D35]/80 leading-relaxed max-w-3xl">
            Customers have reported significant improvements in sleep quality and performance with Core Sleep, noting
            that it helps them fall asleep faster, maintain deep sleep, and wake up feeling refreshed. While some
            customers experienced relief from sleep issues, others had differing viewpoints on the product&apos;s
            effectiveness. Overall, the supplement is appreciated for its positive impact on sleep.
          </p>

          <h3 className="font-semibold mt-8 mb-3">Summary topics</h3>
          <ul className="space-y-2 text-sm text-[#221D35]/80">
            {SUMMARY_TOPICS.map((t) => (
              <li key={t.label}>
                <strong>
                  {t.label} ({t.pct}%):
                </strong>{" "}
                {t.desc}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mt-8 mb-3">Review highlights</h3>
          <ul className="space-y-2 text-sm text-[#221D35]/80">
            {HIGHLIGHTS.map((h) => (
              <li key={h.author}>
                &ldquo;{h.quote}&rdquo; — {h.author}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.title + r.author} className="border border-black/10 rounded-xl p-6">
              <Stars rating={r.rating} />
              <h4 className="font-semibold mt-3 mb-2">{r.title}</h4>
              <p className="text-sm text-[#221D35]/70 leading-relaxed">&ldquo;{r.body}&rdquo;</p>
              <p className="text-sm text-[#221D35]/50 mt-3">
                — {r.author} ({r.rating}/5)
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
