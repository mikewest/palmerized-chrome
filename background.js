///////////////////////////////////////////////////////////////////////////////
//
//  PRIVACY SETTINGS
//
function turnOffSetting(category, setting) {
  var toSet = chrome.privacy[category][setting];
  toSet.get({}, function (details) {
    if (details.levelOfControl === 'controllable_by_this_extension') {
      toSet.set({ value: false }, function () {
        if (chrome.runtime.lastError)
          console.log("Failed to set `chrome.privacy." + category + "." + setting + "`: " + chrome.runtime.lastError);
      });
    }
  });
}

turnOffSetting("network", "networkPredictionEnabled");

turnOffSetting("services", "alternateErrorPagesEnabled");
turnOffSetting("services", "safeBrowsingEnabled");
turnOffSetting("services", "searchSuggestEnabled");
turnOffSetting("services", "spellingServiceEnabled");
// TODO: Something for DNT.

// EXTRA STUFF palmer@ DIDN'T MENTION BECAUSE WE DON'T HAVE UI FOR IT
turnOffSetting("websites", "hyperlinkAuditingEnabled");
turnOffSetting("websites", "referrersEnabled");

// EXTRA STUFF palmer@ DIDN'T MENTION EVEN THOUGH WE HAVE UI FOR IT
turnOffSetting("services", "hotwordSearchEnabled");
turnOffSetting("services", "safeBrowsingExtendedReportingEnabled");

if (chrome.privacy.websites.protectedContentEnabled)
  turnOffSetting("websites", "protectedContentEnabled");

///////////////////////////////////////////////////////////////////////////////
//
//  CONTENT SETTINGS
//

function setFor(pattern, type, setting) {
  chrome.contentSettings[type].set(
      {
        "primaryPattern": pattern,
        "setting": setting
      }, function () {
        if (chrome.runtime.lastError)
          console.log("Failed to set `chrome.contentSettings.%s`: %o", type, chrome.runtime.lastError);
      });
}

function setForAllURLs(type, setting) {
  setFor("<all_urls>", type, setting);
}

function blockForHTTPAllowForHTTPS(type) {
  setForAllURLs(type, "block");
  setFor("https://*/*", type, "allow");
}

/*
 * Cookies
 */
setForAllURLs("cookies", "session_only");
turnOffSetting("websites", "thirdPartyCookiesAllowed");

/*
 * JavaScript
 */
blockForHTTPAllowForHTTPS("javascript");

/*
 * Plugins
 */
setForAllURLs("plugins", "block");

/*
 * Geolocation
 */
setForAllURLs("location", "block");


/*
 * Notifications
 */
setForAllURLs("notifications", "block");

/*
 * Pointer Lock: TODO
 */

/*
 * Media: TODO
 */

/*
 * Unsandboxed Plugins: TODO
 */

/*
 * Automatic Downloads: TODO
 */

/*
 * Autodetect Language
 */
turnOffSetting("services", "translationServiceEnabled");

/*
 * Ask Where To Download: TODO
 */

/*
 * Certificate Revocation: TODO
 */
