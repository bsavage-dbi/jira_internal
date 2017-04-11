var commentTabsAreAlreadyShowing = false;
var commentTabClicked = false;
setInterval(function(){
    var tabs = jQuery(".sd-comment-buttons");
    if (tabs.size() > 0 && !commentTabsAreAlreadyShowing) {
        commentTabsAreAlreadyShowing = true;
        jQuery(".sd-internal-submit").parent("span").insertBefore(".sd-comment-buttons span:first");
        jQuery(".sd-internal-submit").addClass("aui-button-primary");
        jQuery(".sd-external-submit").removeClass("aui-button-primary");
    }
    else if (tabs.size() === 0) {
        commentTabsAreAlreadyShowing = false;
    }

    var updateTab = jQuery(".js-sd-internal-comment");
    if (updateTab.size() && !commentTabClicked) {
        commentTabClicked = true;
        jQuery(".js-sd-internal-comment").removeClass('inactive').addClass('active');
        jQuery(".js-sd-external-comment").removeClass('active').addClass('inactive');
        jQuery('.sd-comment-message').html('<div class="sd-comment-message"><span class="aui-icon aui-icon-small aui-iconfont-locked">Locked</span>Your comments will not be visible to customers on the portal.<input name="commentProperty" type="hidden" value="[{key: \'sd.public.comment\', value: {internal: \'true\'}}]"></div>');
        var externalTab = jQuery(".js-sd-external-comment");

        function fixBindings() {
            updateTab.click();
            $(this).off('click', fixBindings);
            $(this).click();
        }
        externalTab.on('click', fixBindings);
    }
    if (!updateTab.size() && commentTabClicked) {
        commentTabClicked = false;
        commentTabSwitched = false;
    }
}, 100);