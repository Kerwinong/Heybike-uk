window.theme = window.theme || {};
theme.Sections = function Sections() {
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

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = (instance.id === evt.detail.sectionId);

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

window.slate = window.slate || {};

/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {

  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';
    $element.first().attr('tabIndex', '-1').focus().addClass(focusClass).one('blur', callback);
    function callback() {
      $element.first().removeClass(focusClass).removeAttr('tabindex');
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function() {
    $('a[href*=#]').on('click', function(evt) {
      this.pageLinkFocus($(evt.currentTarget.hash));
    }.bind(this));
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).off('focusin');

    $(document).on(eventName, function(evt) {
      if (options.$container[0] !== evt.target && !options.$container.has(evt.target).length) {
        options.$container.focus();
      }
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
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

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

theme.Images = (function() {

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  function loadImage(path) { new Image().src = path; }


  function switchImage(image, element, callback) {
    var size = this.imageSize(element.src);
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element); // eslint-disable-line callback-return
    } else {
      element.src = imageUrl;
    }
  }

  function imageSize(src) {
    var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);

    if (match !== null) {
      return match[1];
    } else {
      return null;
    }
  }

  function getSizedImageUrl(src, size) {
    if (size == null) { return src; }
    if (size === 'master') { return this.removeProtocol(src); }

    var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

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

/**
 * Currency Helpers
 */

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
 * @namespace variants
 */

slate.Variants = (function() {

  /**
   * Variant constructor
   * @param {object} options - Settings from `product.js`
   */
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

    /**
     * Get the currently selected options from add-to-cart form. Works with all
     */
    _getCurrentOptions: function() {
      var currentOptions = _.map($(this.singleOptionSelector, this.$container), function(element) {
        var $element = $(element);
        var type = $element.attr('type');
        var currentOption = {};

        if (type === 'radio' || type === 'checkbox') {
          if ($element[0].checked) {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');
			 $("."+currentOption.index).find(".slVariant").text(currentOption.value);
            return currentOption;
          } else {
            return false;
          }
        } else {
          currentOption.value = $element.val();
          currentOption.index = $element.data('index');
		  $("."+currentOption.index).find(".slVariant").text(currentOption.value);
          return currentOption;
        }
      });

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = _.compact(currentOptions);

      return currentOptions;
    },

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

    _onSelectChange: function() {
      var variant = this._getVariantFromOptions();

      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
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

    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    _updatePrice: function(variant) {
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price) {
        return;
      }

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    _updateSKU: function(variant) {
      if (variant.sku === this.currentVariant.sku) {
        return;
      }

      this.$container.trigger({
        type: 'variantSKUChange',
        variant: variant
      });
    },

    _updateHistoryState: function(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    },

    _updateMasterSelect: function(variant) {
      $(this.originalSelectorId, this.$container).val(variant.id);
    }
  });

  return Variants;
})();



/*================ SECTIONS ================*/

/* eslint-disable no-new */
theme.Product = (function(){
  function Product(container){
    this.container = container;
    var $container = this.$container = $(container),
    	sectionId = $container.attr('data-section-id');

    this.settings={
      mediaQueryMediumUp: 'screen and (min-width: 768px)',
      mediaQuerySmall: 'screen and (max-width: 767px)',
      bpSmall: false,
      enableHistoryState: $container.data('enable-history-state') || false,
      imageSize: null,
      namespace: '.slideshow-' + sectionId,
      sectionId: sectionId
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
      singleOptionSelector: '.single-option-selector-' + sectionId,
      productMediaWrapper: '[data-product-single-media-wrapper]',
      productMediaTypeModel: '[data-product-media-type-model]'
    }
    
    if (!$('#ProductJson-quickView').html()){
      return;
    }

    this.productSingleObject = JSON.parse(document.getElementById('ProductJson-quickView').innerHTML);
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

  Product.prototype = _.assignIn({}, Product.prototype,{
    _stringOverrides: function(){
      theme.productStrings = theme.productStrings || {};
      $.extend(theme.strings, theme.productStrings);
    },

    _initBreakpoints: function(){
      var self = this;

      enquire.register(this.settings.mediaQuerySmall,{
        match: function(){
          // destroy image zooming if enabled
          if (self.settings.zoomEnabled){
            _destroyZoom($(self.selectors.imgWrap));
          }
          self.settings.bpSmall = true;
        },
        unmatch: function(){
          self.settings.bpSmall = false;
        }
      });

      enquire.register(this.settings.mediaQueryMediumUp,{
        match: function(){
          if (self.settings.zoomEnabled){
            _enableZoom($(self.selectors.imgWrap));
          }
        }
      });
    },

    _initVariants: function(){
      var options={
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
      $(this.selectors.thumbImg).on('click', function(evt){
        evt.preventDefault();
        var $el = $(this),
        	imageSrc = $el.attr('href'),
        	zoomSrc = $el.data('zoom');
        self._setActiveThumbnail(imageSrc);
      });
    },
    
    _setActiveThumbnail: function(src){
      if (typeof src === 'undefined'){
        src = $('.pr_photo.activeSlide').attr('data-src');
      }
      var slideno = $('.pr_photo[data-src="' + src + '"]').index();
      $(this.selectors.primgsl).flickity('select', slideno);
    },

    _initThumbnailSlider: function(){
        var option = $('.pisquickView').attr("data-flickity") || '{}';
        $('.pisquickView').flickity(JSON.parse(option));
        var $primgsl = $(this.selectors.primgsl);
        
       $(window).on('load', function(e){
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

    _updateAddToCart: function(evt){
      var variant = evt.variant;

      if (variant){

        if (variant.available){
          var quantity = $("#pvr-"+variant.id).text(),
          	  maxquantity = $("#quantity_message").data('qty');
          
          $(this.selectors.addToCart).prop('disabled', false);
          if(quantity < 1 && variant.inventory_management == "shopify"){
          	$(this.selectors.addToCart).find('.txt').text(theme.strings.preOrder);
            console.log('pre');
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
      fetch(this.selectors.purl+'?variant='+variant.id+'&section_id=quick-view').then((response) => response.text()).then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById('pricequickView');
        const source = html.getElementById('pricequickView');
        if (source && destination) destination.innerHTML = source.innerHTML;
        if (theme.mlcurrency){ currenciesChange(this.selectors.productPrices+" span.money"); }
      });
    },

    _updateSKU: function(evt){
      var variant = evt.variant;
      $(this.selectors.SKU).html(variant.sku);
    },

    onUnload: function(){
      this.$container.off(this.settings.namespace);
    }
  });
  return Product;
})();

theme.ProductModel = (function(){
  var modelJsonSections={};
  var models={};
  var xrButtons={};

  var selectors = {
    mediaGroup: '[data-product-single-media-group]',
    xrButton: '[data-shopify-xr]'
  };

  function init(modelViewerContainers, sectionId){
    modelJsonSections[sectionId] = {
      loaded: false
    };

    modelViewerContainers.forEach(function(modelViewerContainer, index){
      var mediaId = modelViewerContainer.getAttribute('data-media-id');
      var modelViewerElement = modelViewerContainer.querySelector('model-viewer');
      var modelId = modelViewerElement.getAttribute('data-model-id');

      if (index === 0){
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
    theme.LibraryLoader.load();
  }

  function setupShopifyXr(errors){
    if (errors) return;

    if (!window.ShopifyXR){
      document.addEventListener('shopify_xr_initialized', function(){
        setupShopifyXr();
      });
      return;
    }

    for (var sectionId in modelJsonSections){
      if (modelJsonSections.hasOwnProperty(sectionId)){
        var modelSection = modelJsonSections[sectionId];

        if (modelSection.loaded) continue;
        var modelJson = document.querySelector('#ModelJson-' + sectionId);

        window.ShopifyXR.addModels(JSON.parse(modelJson.innerHTML));
        modelSection.loaded = true;
      }
    }
    window.ShopifyXR.setupXRElements();
  }

  function setupModelViewerUi(errors){
    if (errors) return;

    for (var key in models){
      if (models.hasOwnProperty(key)){
        var model = models[key];
        if (!model.modelViewerUi){
          model.modelViewerUi = new Shopify.ModelViewerUI(model.element);
        }
        setupModelViewerListeners(model);
      }
    }
  }
  
  function setupModelViewerListeners(model){
    var xrButton = xrButtons[model.sectionId];

    model.container.addEventListener('mediaVisible', function(){
      xrButton.element.setAttribute('data-shopify-model3d-id', model.modelId);
      model.modelViewerUi.play();
    });

    model.container.addEventListener('mediaHidden', function(){
      xrButton.element.setAttribute('data-shopify-model3d-id',xrButton.defaultId);
      model.modelViewerUi.pause();
    });

    model.container.addEventListener('xrLaunch', function(){
      model.modelViewerUi.pause();
    });
  }

  function removeSectionModels(sectionId){
    for (var key in models){
      if (models.hasOwnProperty(key)){
        var model = models[key];
        if (model.sectionId === sectionId){
          models[key].modelViewerUi.destroy();
          delete models[key];
        }
      }
    }
    delete modelJsonSections[sectionId];
  }

  return{
    init: init,
    removeSectionModels: removeSectionModels
  };
})();

theme.LibraryLoader = (function(){
  var status ={
    requested: 'requested',
    loaded: 'loaded'
  };

  var libraries={};

  function load(libraryName, callback){
    var library = libraries[libraryName];

    if (!library) return;
    if (library.status === status.requested) return;

    callback = callback || function(){};
    if (library.status === status.loaded){
      callback();
      return;
    }
    library.status = status.requested;
    var tag = createScriptTag(library, callback);
    tag.id = library.tagId;
    library.element = tag;
  }

  function createScriptTag(library, callback){
    var tag = document.createElement('script');
    tag.src = library.src;
    tag.addEventListener('load', function(){
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  return{load:load};
})();

$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('quickView', theme.Product);
});