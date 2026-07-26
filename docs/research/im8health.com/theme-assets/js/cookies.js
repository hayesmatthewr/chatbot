const iso_code=["AT","BE","DK","FN","FR","DE","GR","IE","IT","NL","NO","PT","ES","SE","GB"];function waitForCustomerPrivacy(callback){const interval=setInterval(()=>{window.Shopify&&window.Shopify.customerPrivacy&&(clearInterval(interval),callback(window.Shopify.customerPrivacy))},1e3)}document.addEventListener("DOMContentLoaded",function(){document.getElementById("shopify-pc__banner")||waitForCustomerPrivacy(private2=>{if(!iso_code.includes(private2.getRegion().substring(0,2))&&!localStorage.getItem("cookieConsent")){const consentDiv=document.createElement("div");consentDiv.innerHTML=`
                <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #f9f9f9; padding: 20px; text-align: center; border-top: 1px solid #ccc;">
                    <p>
                        We use cookies to improve your experience. By using our site, you agree to our use of cookies. Learn more in our <a href="/pages/cookie-policy" style="color: #007bff;">Cookies Policy</a>.
                    </p>
                    <button id="dismissCookies" style="
                        background-color: #a52a2a; /* Dark red background */
                        color: white; /* White text */
                        border: none; /* No border */
                        border-radius: 25px; /* Rounded corners */
                        padding: 10px 20px; /* Padding for the button */
                        font-size: 16px; /* Font size */
                        cursor: pointer; /* Pointer cursor on hover */
                        font-weight: bold; /* Bold text */
                        text-transform: uppercase; /* Uppercase text */
                        margin-top: 10px; /* Margin above the button */
                    ">
                        Accept
                    </button>
                </div>
            `,document.body.appendChild(consentDiv),consentDiv.style.zIndex=9999,document.getElementById("dismissCookies").onclick=function(){localStorage.setItem("cookieConsent","accepted"),consentDiv.remove()}}})});
//# sourceMappingURL=/cdn/shop/t/121/assets/cookies.js.map?v=107223299157215628431778054237
