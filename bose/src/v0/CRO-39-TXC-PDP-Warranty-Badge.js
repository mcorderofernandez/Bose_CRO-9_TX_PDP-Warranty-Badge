(function() {

    const EXPERIMENT_PREFIX = 'exp-9';

    function track(action, optlabel = null) {

        const params = {
            'acn_eventaction': action,
            'acn_eventcategory': EXPERIMENT_PREFIX,
            'event': 'acn_experience'
        };

        if (optlabel) {
            params.acn_eventlabel = optlabel
                .toLowerCase()
                .replaceAll(' ', '_')
                .replaceAll("'", '');

        }

        dataLayer.push(params);
    }

    function customGoals() {
        // Review Clicks  v0 , v1 
        // Fires when a user clicks on the review stars below the title of the product that anchors them down to the review section 
        var review = document.getElementById('data-bv-show');
        if (review!=null){ 
            review.addEventListener('click', e => { track('review_click'); }); 
        }

        // Image Carousel Scroll  v0 , v1 
        // Fires when a user scrolls through the images in the carousel 
        document.querySelectorAll('.primary-images__controls button').forEach(pill => {
            pill.addEventListener('click', e => {
                track('carousel_image_scroll');
            });
        });

        // Read More Product Detail  v0 , v1 
        // Fires when a user clicks ?read more? in the product details section to expand the text. 
        document.querySelectorAll('.read-more').forEach(pill => {
            pill.addEventListener('click', e => {
                track('read_more_copy');
            });
        });

        // View More Product Detail  v0 , v1 
        // Fires when a user clicks ?view more? in the product details section that expands the icons of the product features 
        document.querySelectorAll('.product-features__view-more').forEach(pill => {
            pill.addEventListener('click', e => {
                track('view_more_icons');
            });
        });

        // Sticky Add to Cart Clicks  v0 , v1 
        // Fires when a user clicks on the add to cart CTA that appears as sticky at the bottom of the PDP when the user scrolls down. 
        document.querySelectorAll('.buy-panel--sticky-in .add-to-cart').forEach(pill => {
            pill.addEventListener('click', e => {
                track('sticky_add_to_cart');
            });
        });
    }

    // ProductID list
    // Eligible for Bose 2 year - 1 badge on top
    const badge1 = [
        "CMSP-BM500-NAPL-BASSMODULE-BBLK",
        "CMSP-BM700-NAPL-BASSMODULE-ARWHT",
        "CMSP-BM700-NAPL-BASSMODULE-BBLK",
        "MUAMP-AMPLIFIER-BLK-120V-AST",
        "NC700-HEADPHONEARN-BLK-WW",
        "NC700-HEADPHONEARN-LUXSIL-WW",
        "PORTSS-SPEAKERWIRELESS-LUXSIL-120V-US",
        "PORTSS-SPEAKERWIRELESS-TRPBLK-120V-US",
        "QC45-HEADPHONEARN-BLK-WW",
        "QC45-HEADPHONEARN-ECLPS",
        "QC45-HEADPHONEARN-MDBLU",
        "QC45-HEADPHONEARN-WHTSM-WW",
        "QCEARBII-HEADPHONEIN-ECLPS-WW",
        "QCEARBII-HEADPHONEIN-MDBLU-WW",
        "QC-HEADPHONEARN-BLK-WW",
        "QC-HEADPHONEARN-CYGRN-WW",
        "QC-HEADPHONEARN-WHTSM-WW",
        "QCUE-HEADPHONEIN-BLK-WW",
        "QCUE-HEADPHONEIN-WHTSM-WW",
        "QCUH-HEADPHONEARN-BLK-WW",
        "QCUH-HEADPHONEARN-WHTSM-WW",
        "SSB300-SOUNDBAR-BLK-NAPL-AMER",
        "SSB600-SOUNDBAR-BLK-120V-AST",
        "SSB700-SOUNDBAR-ARWHT-120V-AST",
        "SSB700-SOUNDBAR-BBLK-120V-AST",
        "SSB900-SOUNDBAR-ARWHT-120V-AST",
        "SSB900-SOUNDBAR-BLK-120V-AST",
        "HS500-SPEAKERWIRELESS-LUXSIL-120V-US",
        "HS500-SPEAKERWIRELESS-TRPBLK-120V-US",
        "SUSB-SOUNDBAR-ARWHT-120V-AMER",
        "SUSB-SOUNDBAR-BLK-120V-AMER",
        "SLFLX-SPEAKERWIRELESS-BLK-WW",
        "SLFLX-SPEAKERWIRELESS-CARRED-WW",
        "SLFLX-SPEAKERWIRELESS-CHLILAC-WW",
        "SLFLX-SPEAKERWIRELESS-CYGRN-WW",
        "SLFLX-SPEAKERWIRELESS-STNBLU-WW",
        "SLFLX-SPEAKERWIRELESS-WHTSM-WW",
        "SLMC-SPEAKERWIRELESS-BLK-WW",
        "SLMC-SPEAKERWIRELESS-MDBLU-WW",
        "SLMC-SPEAKERWIRELESS-STNBLU-WW",
        "SLMC-SPEAKERWIRELESS-WHTSM-WW",
        "SLMINIISE-SPEAKERWIRELESS-LUXSIL-WW",
        "SLMINIISE-SPEAKERWIRELESS-TRPBLK-WW",
        "SLRVII-SPEAKERWIRELESS-LUXSIL",
        "SLRVII-SPEAKERWIRELESS-TRPBLK",
        "SLRVPII-SPEAKERWIRELESS-LUXSIL-120V-US",
        "SLRVPII-SPEAKERWIRELESS-TRPBLK-120V-US",
        "SS-SPEAKERWIRELESS-ARWHT-120V-AST",
        "SS-SPEAKERWIRELESS-BBLK-120V-AST",
        "SS700-SPEAKERWIRELESS-ARWHT-120V-AST",
        "SS700-SPEAKERWIRELESS-BBLK-120V-AST",
        "TVSPKR-SOUNDBAR-BBLK-AST"
    ];

    // Eligible for Bose 2 year - 2 badges
    const badge2 = [
        "QC-HEADPHONEARN-MSBL-WW",
        "QCUE-HEADPHONEIN-MSBL-WW",
        "QCUH-HEADPHONEARN-SDSTN-WW"
    ];

    function changes(){
        var productId = document.querySelector('.product-detail').getAttribute('data-pid');

        if( badge1.includes(productId) ){
            customGoals();
        }else{
            if( badge2.includes(productId) ){
                customGoals();
            }
        }
    }

    function apply(context, template) {

        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
        return Evergage.DisplayUtils
            .pageElementLoaded(contentZoneSelector)
            .then((element) => {
                const html = template(context);
                Evergage.cashDom(element).html(html);

                changes();
            });
    }

    function reset(context, template) {

        /** Remove the template from the DOM to reset the template. */
        Evergage.cashDom("#evg-new-template").remove();
    }

    function control(context) {

        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
        return Evergage.DisplayUtils
            .pageElementLoaded(contentZoneSelector)
            .then((element) => {
                Evergage.cashDom(element).attr({
                    "data-evg-campaign-id": context.campaign,
                    "data-evg-experience-id": context.experience,
                    "data-evg-user-group": context.userGroup
                });
            });
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();

