const LGV_HANDLES=["longevity","product-longevity","longevity-powder"],LGV_OVERLAY_HTML=`<div id="lgv-delay-overlay" class="lgv-overlay">
  <div class="lgv-overlay__backdrop"></div>
  <div class="lgv-popup">
    <button class="lgv-popup__close" aria-label="Close" data-lgv-close>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="lgv-popup__badge">
      <span class="lgv-popup__badge-dot"></span>
      EU Shipping Notice
    </div>
    <h2 class="lgv-popup__title">Delivery Delayed by ~1&nbsp;Week</h2>
    <p class="lgv-popup__desc">
      Due to high demand for <strong>Longevity</strong> across Europe,
      current EU orders are shipping within <strong>approximately 1 week</strong>
      instead of our usual timeframe. Your order will be prioritized and
      shipped as soon as possible.
    </p>
    <div class="lgv-popup__timeline">
      <div class="lgv-popup__timeline-step">
        <div class="lgv-popup__timeline-icon lgv-popup__timeline-icon--order">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3.5 9.5L7 13L14.5 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="lgv-popup__timeline-label">Order</span>
        <span class="lgv-popup__timeline-sub">Today</span>
      </div>
      <div class="lgv-popup__timeline-connector">
        <span class="lgv-popup__timeline-connector-line"></span>
      </div>
      <div class="lgv-popup__timeline-step">
        <div class="lgv-popup__timeline-icon lgv-popup__timeline-icon--prep">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 4.5V9L12 11.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="9" cy="9" r="6.5" stroke="currentColor" stroke-width="1.6"/>
          </svg>
        </div>
        <span class="lgv-popup__timeline-label">Preparation</span>
        <span class="lgv-popup__timeline-sub">~1 week</span>
      </div>
      <div class="lgv-popup__timeline-connector">
        <span class="lgv-popup__timeline-connector-line"></span>
      </div>
      <div class="lgv-popup__timeline-step">
        <div class="lgv-popup__timeline-icon lgv-popup__timeline-icon--deliver">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2.25 5.25L9 2.25L15.75 5.25V12.75L9 15.75L2.25 12.75V5.25Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M9 8.25V15.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M2.25 5.25L9 8.25L15.75 5.25" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="lgv-popup__timeline-label">Delivery</span>
        <span class="lgv-popup__timeline-sub">3&ndash;5 days</span>
      </div>
    </div>
    <button class="lgv-popup__confirm" data-lgv-confirm>
      <span class="loading__spinner hidden"></span>
      <span class="lgv-popup__confirm-text">I Understand &mdash; Add to Cart</span>
    </button>
    <button class="lgv-popup__cancel" data-lgv-cancel>Go back</button>
    <p class="lgv-popup__thanks">Thank you for your patience. We appreciate your support.</p>
  </div>
</div>`;class LongevityDelayPopup{constructor(){this.overlay=document.getElementById("lgv-delay-overlay"),this.popup=this.overlay?this.overlay.querySelector(".lgv-popup"):null,this.pendingFormSubmit=null,this.pendingProductForm=null,this.pendingOtpLink=null,this.interceptedForms=new WeakSet,this.cssLoaded=!!document.querySelector('link[href*="longevity-delay-popup"]'),this.overlay&&this.bindEvents(),this.interceptProductForms(),this.observeDynamicForms()}isLongevityForm(productForm){const productInfo=productForm.closest("product-info");if(!productInfo)return!1;const handle=productInfo.getAttribute("data-product-handle");if(handle)return LGV_HANDLES.includes(handle)||handle.includes("longevity");const url=productInfo.getAttribute("data-url")||"";return LGV_HANDLES.some(h=>url.includes("/products/"+h))}ensureOverlay(){if(this.overlay)return!0;if(!this.cssLoaded){const cssUrl=window.lgvDelayCssUrl;if(cssUrl){const link=document.createElement("link");link.rel="stylesheet",link.href=cssUrl,document.head.appendChild(link)}this.cssLoaded=!0}const temp=document.createElement("div");return temp.innerHTML=LGV_OVERLAY_HTML,this.overlay=temp.firstElementChild,document.body.appendChild(this.overlay),this.popup=this.overlay.querySelector(".lgv-popup"),this.bindEvents(),!0}interceptProductForms(){document.querySelectorAll("product-form").forEach(pf=>this.interceptSingleForm(pf)),this.interceptStickyButton(),this.interceptOneTimePurchase()}interceptSingleForm(productForm){const form=productForm.querySelector("form");!form||this.interceptedForms.has(form)||(this.interceptedForms.add(form),form.addEventListener("submit",evt=>{if(this._confirming||!window.lgvDelayIsEU)return;const isOnLongevityPage=window.lgvDelayPopupEnabled,isHbLongevity=this.isLongevityForm(productForm);!isOnLongevityPage&&!isHbLongevity||(evt.preventDefault(),evt.stopImmediatePropagation(),this.pendingProductForm=productForm,this.pendingFormSubmit=form,this.ensureOverlay(),this.open())},!0))}observeDynamicForms(){new MutationObserver(mutations=>{for(const mutation of mutations)for(const node of mutation.addedNodes)node.nodeType===Node.ELEMENT_NODE&&(node.matches&&node.matches("product-form")&&this.interceptSingleForm(node),node.querySelectorAll&&node.querySelectorAll("product-form").forEach(pf=>this.interceptSingleForm(pf)))}).observe(document.body,{childList:!0,subtree:!0})}interceptStickyButton(){document.querySelectorAll(".sticky-addtocart-button .button, .sticky_addtocart_right_new .button").forEach(btn=>{btn.getAttribute("href")==="#product"||btn.getAttribute("href")?.startsWith("#")||btn.addEventListener("click",evt=>{if(!window.lgvDelayPopupEnabled||!window.lgvDelayIsEU)return;evt.preventDefault(),evt.stopImmediatePropagation();const mainForm=document.querySelector("product-form");mainForm&&(this.pendingProductForm=mainForm,this.pendingFormSubmit=mainForm.querySelector("form")),this.ensureOverlay(),this.open()},!0)})}interceptOneTimePurchase(){document.addEventListener("click",evt=>{if(this._confirming||!window.lgvDelayIsEU)return;const otpLink=evt.target.closest(".one-time-purchase-link");if(!otpLink)return;const productInfo=otpLink.closest("product-info"),isOnLongevityPage=window.lgvDelayPopupEnabled;let isHbLongevity=!1;if(productInfo){const handle=productInfo.getAttribute("data-product-handle");handle&&(isHbLongevity=LGV_HANDLES.includes(handle)||handle.includes("longevity"));const url=productInfo.getAttribute("data-url")||"";isHbLongevity||(isHbLongevity=LGV_HANDLES.some(h=>url.includes("/products/"+h)))}!isOnLongevityPage&&!isHbLongevity||(evt.preventDefault(),evt.stopImmediatePropagation(),this.pendingOtpLink=otpLink,this.pendingProductForm=null,this.pendingFormSubmit=null,this.ensureOverlay(),this.open())},!0)}bindEvents(){if(!this.overlay)return;const closeBtn=this.overlay.querySelector("[data-lgv-close]");closeBtn&&closeBtn.addEventListener("click",()=>this.close());const cancelBtn=this.overlay.querySelector("[data-lgv-cancel]");cancelBtn&&cancelBtn.addEventListener("click",()=>this.close());const backdrop=this.overlay.querySelector(".lgv-overlay__backdrop");backdrop&&backdrop.addEventListener("click",()=>this.close()),document.addEventListener("keydown",e=>{e.key==="Escape"&&this.isOpen()&&this.close()});const confirmBtn=this.overlay.querySelector("[data-lgv-confirm]");confirmBtn&&confirmBtn.addEventListener("click",()=>this.confirmAndSubmit())}open(){this.overlay&&(document.body.style.overflow="hidden",this.overlay.classList.add("lgv-overlay--open"))}close(){if(!this.overlay)return;if(this.overlay.classList.remove("lgv-overlay--open"),document.body.style.overflow="",this.pendingProductForm){const btn=this.pendingProductForm.querySelector('[type="submit"]');btn&&(btn.classList.remove("loading"),btn.removeAttribute("aria-disabled"));const spinner=this.pendingProductForm.querySelector(".loading__spinner");spinner&&spinner.classList.add("hidden")}const stickyBtn=document.querySelector(".product-buy-sticky__button");stickyBtn&&stickyBtn.classList.remove("disabled"),this.pendingFormSubmit=null,this.pendingProductForm=null,this.pendingOtpLink=null}isOpen(){return this.overlay&&this.overlay.classList.contains("lgv-overlay--open")}confirmAndSubmit(){const confirmBtn=this.overlay.querySelector("[data-lgv-confirm]");if(confirmBtn){confirmBtn.classList.add("loading");const spinner=confirmBtn.querySelector(".loading__spinner");spinner&&spinner.classList.remove("hidden")}const wasLgvEnabled=window.lgvDelayPopupEnabled;if(window.lgvDelayPopupEnabled=!1,this._confirming=!0,this.overlay.classList.remove("lgv-overlay--open"),document.body.style.overflow="",this.pendingOtpLink)this.pendingOtpLink.click();else if(this.pendingProductForm){const submitBtn=this.pendingProductForm.querySelector('[type="submit"]');submitBtn&&submitBtn.click()}setTimeout(()=>{if(window.lgvDelayPopupEnabled=wasLgvEnabled,this._confirming=!1,confirmBtn){confirmBtn.classList.remove("loading");const spinner=confirmBtn.querySelector(".loading__spinner");spinner&&spinner.classList.add("hidden")}},2e3),this.pendingFormSubmit=null,this.pendingProductForm=null,this.pendingOtpLink=null}}document.addEventListener("DOMContentLoaded",()=>{window.lgvDelayPopup=new LongevityDelayPopup});
//# sourceMappingURL=/cdn/shop/t/121/assets/longevity-delay-popup.js.map?v=59773309326260352141774608475
