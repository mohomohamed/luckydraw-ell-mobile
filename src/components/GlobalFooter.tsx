import React from "react";

export default function GlobalFooter() {
  return (
    <footer className="bg-black text-[#86868b] text-[11px] leading-[1.45] border-t border-white/[0.12] pt-8 pb-12 px-6">
      <div className="max-w-[1024px] mx-auto">
        {/* Footnotes */}
        <section className="pb-5 border-b border-white/[0.12] mb-6 space-y-2.5">
          <p>
            1. The iPhone 18 Pro Launch Day Lucky Draw is conducted exclusively by ELL Mobile for verified customers residing in the Republic of Maldives. One grand prize winner will be chosen at random from the 86 qualifying registrant submissions.
          </p>
          <p>
            2. Hardware specifications, finish names, and product descriptions reflect promotional units provided by ELL Mobile. Prize redemption requires presentation of matching national identification (National Identity Card or Passport) corresponding to registration records.
          </p>
          <p>
            3. Trade-in values and launch day eligibility may vary. Cellular connectivity is subject to local carrier network availability and carrier settings.
          </p>
        </section>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-7 text-xs text-[#f5f5f7]">
          <a href="#" className="text-[#86868b] hover:text-[#f5f5f7] transition-colors" aria-label="Apple Home">
            <svg height="14" viewBox="0 0 14 44" width="14" xmlns="http://www.w3.org/2000/svg" className="fill-current inline-block">
              <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7846 9.7846 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.1877 3.1877 0 0 0 .7-2.2824 3.2829 3.2829 0 0 0 -2.1222 1.0948 3.0518 3.0518 0 0 0 -.7124 2.2514 2.89 2.89 0 0 0 2.1346-1.0638z" />
            </svg>
          </a>
          <span className="text-[#6e6e73]">&rsaquo;</span>
          <a href="#" className="text-[#86868b] hover:text-[#f5f5f7] transition-colors">iPhone</a>
          <span className="text-[#6e6e73]">&rsaquo;</span>
          <a href="#" className="text-[#86868b] hover:text-[#f5f5f7] transition-colors">iPhone 18 Pro</a>
          <span className="text-[#6e6e73]">&rsaquo;</span>
          <span className="text-[#f5f5f7]">Launch Day Lucky Draw</span>
        </nav>

        {/* Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pb-7 text-[12px]">
          <div>
            <h4 className="font-semibold text-[#f5f5f7] mb-2.5">Shop and Learn</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Store</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mac</a></li>
              <li><a href="#" className="hover:text-white transition-colors">iPad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">iPhone</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Watch</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vision</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AirPods</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#f5f5f7] mb-2.5">Account</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Manage Your Apple ID</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apple Store Account</a></li>
              <li><a href="#" className="hover:text-white transition-colors">iCloud.com</a></li>
            </ul>
            <h4 className="font-semibold text-[#f5f5f7] mt-5 mb-2.5">Entertainment</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Apple TV+</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apple Music</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apple Arcade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#f5f5f7] mb-2.5">Apple Store</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Find a Store</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Genius Bar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Today at Apple</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apple Camp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#f5f5f7] mb-2.5">For Business</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Apple and Business</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shop for Business</a></li>
            </ul>
            <h4 className="font-semibold text-[#f5f5f7] mt-5 mb-2.5">Apple Values</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Environment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#f5f5f7] mb-2.5">About Apple</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apple Leadership</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Opportunities</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ethics &amp; Compliance</a></li>
              <li><a href="#" className="text-[#e5c158] font-medium hover:underline">ELL Mobile Partner Portal</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Row */}
        <div className="pt-6 border-t border-white/[0.12] flex flex-col md:flex-row md:items-center justify-between gap-3 text-[#86868b]">
          <div>
            Copyright &copy; 2026 Apple Inc. All rights reserved. In partnership with ELL Mobile, Maldives.
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Sales Policy</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Site Map</a>
          </div>
          <div className="text-white font-medium">Maldives</div>
        </div>
      </div>
    </footer>
  );
}
