window.theme = window.theme || {};
theme.Sections = function Sections(){
  this.constructors = {};
  this.instances = [];
  $(document).on('shopify:section:load', this._onSectionLoad.bind(this));
};
theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor){
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');
    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)){return;}

    var instance = _.assignIn(new constructor(container),{id: id, type: type, container: container });
    this.instances.push(instance);
  },
  _onSectionLoad: function(evt){
    var container = $('[data-section-id]', evt.target)[0];
    if (container){ this._createInstance(container); }
  },
  register: function(type, constructor){
    this.constructors[type] = constructor;
    $('[data-section-type=' + type + ']').each(function(index, container){this._createInstance(container, constructor);}.bind(this));
  }
});
window.slate = window.slate || {};

theme.Currency = (function(){
  var moneyFormat = '${{amount}}';

  function formatMoney(cents, format){
    if (typeof cents === 'string'){
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal){
      precision = precision || 2;
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number == null){ return 0; }
      
      number = (number / 100.0).toFixed(precision);
      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]){
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

slate.Variants = (function(){
  function Variants(options){
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on('change', this._onSelectChange.bind(this));
  }

  Variants.prototype = _.assignIn({}, Variants.prototype, {
    _getCurrentOptions: function(){
      var currentOptions = _.map($(this.singleOptionSelector, this.$container), function(element){
        var $element = $(element);
        var type = $element.attr('type');
        var currentOption = {};
        if (type === 'radio' || type === 'checkbox'){
          if ($element[0].checked){
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
      currentOptions = _.compact(currentOptions);
      return currentOptions;
    },

    _getVariantFromOptions: function(){
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;

      var found = _.find(variants, function(variant){
        return selectedValues.every(function(values){
          return _.isEqual(variant[values.index], values.value);
        });
      });

      return found;
    },
    _onSelectChange: function(){
      var variant = this._getVariantFromOptions();
      this.$container.trigger({type: 'variantChange',variant: variant});
        
      if (!variant){return;}
        
      this._updateMasterSelect(variant);
      this._updatePrice(variant);
      this.currentVariant = variant;
      if (this.enableHistoryState){
        this._updateHistoryState(variant);
      }
    },
    _updatePrice: function(variant){
      if (variant.price === this.currentVariant.price && variant.compare_at_price === this.currentVariant.compare_at_price){
        return;
      }
      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },
    _updateHistoryState: function(variant){
      if (!history.replaceState || !variant){
        return;
      }
      var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
      window.history.replaceState({path: newurl}, '', newurl);
    },
    _updateMasterSelect: function(variant){
      $(this.originalSelectorId, this.$container).val(variant.id);
    }
  });

  return Variants;
})();

theme.Product = (function(){
  function Product(container){
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    this.settings = {
      bpSmall: false,
      enableHistoryState: $container.data('enable-history-state') || false,
      namespace: '.slideshow-' + sectionId,
      sectionId: sectionId
    };
    this.selectors = {
      purl: $container.attr('data-url'),
      mainSec: sectionId,
      addToCart: '#AddToCart-' + sectionId,
      originalSelectorId: '#ProductSelect-' + sectionId,
      productPrices: '#price' + sectionId,
      singleOptionSelector: '.single-option-selector-' + sectionId
    }
    
    if (!$('#quickshopJson-' + sectionId).html()){ return; }

    this.productSingleObject = JSON.parse(document.getElementById('quickshopJson-' + sectionId).innerHTML);
    this._stringOverrides();
    this._initVariants();
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    _stringOverrides: function(){
      theme.productStrings = theme.productStrings || {};
      $.extend(theme.strings, theme.productStrings);
    },
    _initVariants: function(){
      var options = {
        $container: this.$container,
        enableHistoryState: false,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject
      };
      this.variants = new slate.Variants(options);
      this.$container.on('variantChange' + this.settings.namespace, this._updateAddToCart.bind(this));
      this.$container.on('variantPriceChange' + this.settings.namespace, this._updatePrice.bind(this));
    },
    _updateAddToCart: function(evt){
      var variant = evt.variant;
      if (variant.available){
          var quantity = $(".prvQty").data('v'+variant.id);

          $(this.selectors.addToCart).prop('disabled', false);
          
          if(quantity < 1 && variant.inventory_management == "shopify"){
          	$(this.selectors.addToCart).find('.txt').text(theme.strings.preOrder);
          } else {
            $(this.selectors.addToCart).find('.txt').text(theme.strings.addToCart);
          }
        } else {
        $(this.selectors.addToCart).prop('disabled', true).find('.txt').text(theme.strings.unavailable);
      }
    },
    _updatePrice: function(evt){
      var variant = evt.variant;
      fetch(this.selectors.purl+'?variant='+variant.id+'&section_id=quick-shop').then((response) => response.text()).then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById('price'+this.selectors.mainSec);
        const source = html.getElementById('price'+this.selectors.mainSec);
        if (source && destination) destination.innerHTML = source.innerHTML;
        if (theme.mlcurrency){ currenciesChange(this.selectors.productPrices+" span.money"); }
      });
    },
    onUnload: function(){
      this.$container.off(this.settings.namespace);
    }
  });
  return Product;
})();
$(document).ready(function(){
  var sections = new theme.Sections();
  sections.register('quickshop', theme.Product);
});