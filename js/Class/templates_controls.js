var templates_controls = Class.extend({
  init: function (opt) {
    $.extend(this, opt);
    this.define_templates();
    this.uniqueId();
    this.get_template_by_name();
    this.make();
  },

  make: function () {
    // console.log("this => ", this);
  },

  get_template_by_name: function () {
    var me = this;
    me.$wrapper = $(`#${me.temp_name}`);
    switch (me.temp_name) {
      case "template_properties":
        me.$wrapper.append(me.templates[me.temp_name]);
        break;
      case "invoice_head":
        me.$wrapper.append(me.templates[me.temp_name]);

        break;
      case "elements_table":
        me.$wrapper.append(me.templates[me.temp_name]);

        break;
      case "elements_footer":
        me.$wrapper.append(me.templates[me.temp_name]);

        break;
    }
  },

  define_templates: function () {
    var me = this;
    me.templates = {
      template_properties: `<div class="template-controls-inner">
                                <h4 class="title">Template Properties</h4>

                                <div class="input-container">
                                  <label for="template-name">Template Name</label>
                                  <input type="text" id="template-name" name="template-name">
                                </div>

                                <div class="input-container">
                                  <label for="paper-size">Paper Size</label>
                                  <select id="paper-size" name="paper-size">
                                    <option value="A4">A4</option>
                                    <option value="A5">A5</option>
                                  </select>
                                </div>

                                <div class="input-container">
                                  <label for="direction">Direction</label>
                                  <select id="direction" name="direction">
                                    <option value="rtl">rtl</option>
                                    <option value="ltr">ltr</option>.
                                  </select>
                                </div>
                              </div>`,
      invoice_head: `<div class="template-controls-inner">
                              
                              <div class="input-container">
                                <label for="company-logo-appearance">Company Logo</label>
                                <select id="company-logo-appearance" name="company-logo-appearance">
                                  <option value="apparent">Apparent</option>
                                  <option value="hidden">Hidden</option>
                                </select>
                              </div>

                              <div class="input-container">
                                <label for="logo-size">Logo Size</label>
                                <div class="range-container">
                                  <input type="range" id="logo-size" name="logo-size">
                                </div>
                              </div>

                              <div class="input-container">
                                <label for="company-name-address-appearance">The Name & Address of the Comapany</label>
                                <select id="company-name-address-appearance" name="company-name-address-appearance">
                                  <option value="apparent">Apparent</option>
                                  <option value="hidden">Hidden</option>
                                </select>
                              </div>

                              <div class="input-container">
                                <label for="background-color">Background Color</label>
                                <select id="background-color" name="background-color">
                                  <option value="#FFF">White</option>
                                  <option value="#F4F7FC">White 2</option>
                                  <option value="#C9C9C9">Gray</option>
                                </select>
                              </div>

                              <h4 class="title">Document Information</h4>

                              <div class="input-container checkbox-input">
                                <label class="container-checkbox">
                                  <input type="checkbox" checked="checked">
                                  <span class="checkmark"></span>
                                </label>
                                <input type="text" id="fname" name="firstname" placeholder="فاتورة مبيعات |">
                              </div>

                              <div class="input-container checkbox-input">
                                <label class="container-checkbox">
                                  <input type="checkbox" checked="checked">
                                  <span class="checkmark"></span>
                                </label>
                                <input type="text" id="fname" name="firstname" placeholder="اسم المؤسسه وعنوانها |">
                              </div>

                              <div class="input-container checkbox-input">
                                <label class="container-checkbox">
                                  <input type="checkbox" checked="checked">
                                  <span class="checkmark"></span>
                                </label>
                                <input type="text" id="fname" name="firstname" placeholder="تاريخ الفاتورة |">
                              </div>

                              <div class="input-container checkbox-input">
                                <label class="container-checkbox">
                                  <input type="checkbox" checked="checked">
                                  <span class="checkmark"></span>
                                </label>
                                <input type="text" id="fname" name="firstname" placeholder="رقم الإستحقاق |">
                              </div>

                              <div class="input-container checkbox-input">
                                <label class="container-checkbox">
                                  <input type="checkbox" checked="checked">
                                  <span class="checkmark"></span>
                                </label>
                                <input type="text" id="fname" name="firstname" placeholder="العنوان |">
                              </div>

                            </div>`,
      elements_table: `<div class="template-controls-inner">
                              
                            <div class="input-container">
                              <label for="company-logo-appearance">Company Logo</label>
                              <select id="company-logo-appearance" name="company-logo-appearance">
                                <option value="apparent">Apparent</option>
                                <option value="hidden">Hidden</option>
                              </select>
                            </div>

                            <div class="input-container">
                              <label for="logo-size">Logo Size</label>
                              <div class="range-container">
                                <input type="range" id="logo-size" name="logo-size">
                              </div>
                            </div>

                            <div class="input-container">
                              <label for="company-name-address-appearance">The Name & Address of the Comapany</label>
                              <select id="company-name-address-appearance" name="company-name-address-appearance">
                                <option value="apparent">Apparent</option>
                                <option value="hidden">Hidden</option>
                              </select>
                            </div>

                            <div class="input-container">
                              <label for="background-color">Background Color</label>
                              <select id="background-color" name="background-color">
                                <option value="#FFF">White</option>
                                <option value="#F4F7FC">White 2</option>
                                <option value="#C9C9C9">Gray</option>
                              </select>
                            </div>

                            <h4 class="title">Document Information</h4>

                            <div class="input-container checkbox-input">
                              <label class="container-checkbox">
                                <input type="checkbox" checked="checked">
                                <span class="checkmark"></span>
                              </label>
                              <input type="text" id="fname" name="firstname" placeholder="فاتورة مبيعات |">
                            </div>

                            <div class="input-container checkbox-input">
                              <label class="container-checkbox">
                                <input type="checkbox" checked="checked">
                                <span class="checkmark"></span>
                              </label>
                              <input type="text" id="fname" name="firstname" placeholder="اسم المؤسسه وعنوانها |">
                            </div>

                            <div class="input-container checkbox-input">
                              <label class="container-checkbox">
                                <input type="checkbox" checked="checked">
                                <span class="checkmark"></span>
                              </label>
                              <input type="text" id="fname" name="firstname" placeholder="تاريخ الفاتورة |">
                            </div>

                            <div class="input-container checkbox-input">
                              <label class="container-checkbox">
                                <input type="checkbox" checked="checked">
                                <span class="checkmark"></span>
                              </label>
                              <input type="text" id="fname" name="firstname" placeholder="رقم الإستحقاق |">
                            </div>

                            <div class="input-container checkbox-input">
                              <label class="container-checkbox">
                                <input type="checkbox" checked="checked">
                                <span class="checkmark"></span>
                              </label>
                              <input type="text" id="fname" name="firstname" placeholder="العنوان |">
                            </div>

                          </div>`,
    };
  },

  uniqueId: function () {
    var me = this;
    var id = me.random();
    while (
      typeof document.getElementById(id) != "undefined" &&
      document.getElementById(id) != null
    ) {
      id = me.random();
    }
    me.unique_id = id;
  },

  random: function () {
    var str = "0123456789abcdefghijklmnopqrstuvwxyz";
    var id = "";
    for (var i = 0; i < 6; i++) {
      id += str[Math.floor(Math.random() * 36)];
    }
    return id;
  },
});
