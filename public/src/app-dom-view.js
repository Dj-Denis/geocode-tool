ym.modules.define('app-dom-view', [
  'util.defineClass',
  'event.Manager'
], function (provide, defineClass, EventManager) {

  var DomView = defineClass(function (config) {
    this.events = new EventManager();
    this._form = jQuery('form');
    this._setupListeners();
  }, {
    getData: function () {
      return this._form.serializeArray()
        .reduce(function (obj, item, index, arr) {
          obj[item.name] = item.value;

          return obj;
        }, {});
    },
    setInboxPlaceholder: function (placeholder) {
      this._form.find('#inbox').attr('placeholder', placeholder);

      return this;
    },
    setDelimPlaceholder: function (placeholder) {
      this._form.find('#delim').attr('placeholder', placeholder);

      return this;
    },
    _setupListeners: function () {
      this._form
        .on('change', 'select#data-type', jQuery.proxy(this._onDataTypeChange, this))
        .on('submit', jQuery.proxy(this._onFormSubmit, this));
    },
    _clearListeners: function () {
    },
    _onDataTypeChange: function (e) {
      e.preventDefault();
    },
    _onFormSubmit: function (e) {
      e.preventDefault();

      this.events.fire('formsubmit', {
        target: this,
        fields: this.getData()
      });
    },
    _onFormReset: function (e) {
      e.preventDefault();

      this.events.fire('formreset', {
        target: this
      });
    }
  });

  provide(DomView);
});