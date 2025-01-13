window.OmegaPopup = {};
$script(['js/index.js', 'js/profiles.js', 'js/keyboard.js'], 'om-main');
$script(['js/i18n.js']);
$script('../js/omega_target_popup.js', 'om-target', function() {
  $script('js/style.js', 'om-style')
  function init(){
    OmegaTargetPopup.getActivePageInfo(function(err, info) {
      window.OmegaPopup.pageInfo = info;
      $script.done('om-page-info');
    });
    OmegaTargetPopup.getState([
      'availableProfiles',
      'currentProfileName',
      'validResultProfiles',
      'isSystemProfile',
      'currentProfileCanAddRule',
      'proxyNotControllable',
      'externalProfile',
      'showExternalProfile',
      'customCss',
    ], function(err, state) {
      window.OmegaPopup.state = state;
      $script.done('om-state');
    });
  }
  const permissionValue = {origins: ["<all_urls>"]}
  if (globalThis.browser && browser.proxy && browser.proxy.onRequest){
    Promise.all([browser.permissions.contains(permissionValue), browser.extension.isAllowedIncognitoAccess()])
    .then(([sitePermissions, isAllowedIncognitoAccess])=>{
      // chrome.contextMenus check is Android or PC,
      // browser.proxy.settings doesn't support Android
      if (sitePermissions && (!chrome.contextMenus || isAllowedIncognitoAccess)) {
        init();
      } else {
        location.href = 'grant_permissions.html'
      }
    })
  } else {
    init();
  }
});
