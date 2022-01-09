var template_file_upload = Class.extend({
  init: function (opt) {
    $.extend(this, opt);
    this.define_templates();
    this.uniqueId();
    this.get_template_by_name();
    this.make();
  },

  make: function () {
    console.log("this => ", this);
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
