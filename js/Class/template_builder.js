var template_builder = Class.extend({
  init: function (opt) {
    $.extend(this, opt);
    this.uniqueId();
    this.make_main_template_structure();
    this.define_tabs();
    this.build_tabs_togglers_ui();
    this.build_tabs_content_ui();
    this.build_or_get();
    this.add_drag_controls();
    this.make_dragabble_sections();
    this.make();
  },

  make: function () {
    // console.log("this => ", this);
  },

  make_main_template_structure: function () {
    var me = this;
    me.parent = me.parent || $("body");
    me.$wrapper = $(`<div class="_builder">
              <div class="_builder-back-nav">
                  <a>
                      <i class="fal fa-arrow-right mx-2"></i>
                      back
                  </a>
              </div>
              <div class="_builder-tabs-toggler">
                  <ul class="_builder-tabs-toggler-list"></ul>
              </div>
              <div class="_builder-work-area">
                  <div class="_builder-tabs-content">
                      
                  </div>
                  <div class="_builder-template">
                      
                  </div>
              </div>
  
          </div>`).appendTo(me.parent);

    me.$tabs_toggler = me.$wrapper.find("._builder-tabs-toggler");
    me.$tabs_content = me.$wrapper.find("._builder-tabs-content");
    me.$template_wrapper = me.$wrapper.find("._builder-template");
  },

  define_tabs: function () {
    var me = this;
    me.tabs = me.options.tabs || {
      toggler: [
        {
          icon: '<i class="fal fa-file"></i>',
          title: "خصائص القالب",
          is_active: true,
          tab_id: "template_properties",
        },
        {
          icon: '<i class="fal fa-file-invoice"></i>',
          title: "رأس الفاتورة",
          is_active: false,
          tab_id: "invoice_head",
        },
        {
          icon: '<i class="fal fa-file-spreadsheet"></i>',
          title: "جدول العناصر",
          is_active: false,
          tab_id: "elements_table",
        },
        {
          icon: '<i class="fal fa-file-contract"></i>',
          title: "تذييل",
          is_active: false,
          tab_id: "elements_footer",
        },
      ],
    };
  },

  /*
    Drow Tabs Togglers
    */
  build_tabs_togglers_ui: function () {
    var me = this;
    var tabs_ul_content = "";
    tabs_content = "";
    me.tabs_ids = [];
    for (let i = 0; i < me.tabs.toggler.length; i++) {
      tabs_ul_content += `<li class="_builder-tabs-toggler-item">
                  <a href="" data-target="${
                    me.tabs.toggler[i].tab_id
                  }" class="_builder-tabs-toggler-link ${
        me.tabs.toggler[i].is_active ? "active" : ""
      }">
                      ${me.tabs.toggler[i].icon}${me.tabs.toggler[i].title}
                  </a>
              </li>`;
      me.tabs_ids.push(me.tabs.toggler[i].tab_id);

      tabs_content += `<div style="display: ${
        me.tabs.toggler[i].is_active ? "block" : "none"
      };" id="${me.tabs.toggler[i].tab_id}" class="_builder-item ${
        me.tabs.toggler[i].is_active ? "active" : ""
      }"></div>`;
    }

    me.$tabs_toggler.find("ul").append(tabs_ul_content);
    me.$tabs_content.append(tabs_content);

    me.$tabs_toggler
      .find("a._builder-tabs-toggler-link")
      .on("click", function (e) {
        me.$tabs_toggler
          .find("a._builder-tabs-toggler-link")
          .removeClass("active");
        $(this).addClass("active");
        e.preventDefault();
        console.log($(this).data("target"));
        var target = $(this).data("target");
        me.$tabs_content.find("._builder-item").hide();
        $("#" + target).fadeIn("slow");
      });
  },

  build_tabs_content_ui: function () {
    var me = this;
    me.controls = {};
    for (let i = 0; i < me.tabs_ids.length; i++) {
      // console.log("Z =>", me.tabs_ids[i]);
      me.controls[me.tabs_ids[i]] = new templates_controls({
        $parent: me.$tabs_content,
        temp_name: me.tabs_ids[i],
      });
    }
  },

  build_or_get: function () {
    var me = this;
    me.$template_wrapper.append(me.options.template);
  },

  add_drag_controls: function () {
    var me = this;
    var row_drag_controll = `<span class="row-drag-handler"><i class="fas fa-grip-vertical"></i></span>`;
    var column_drag_controll = `<span class="col-drag-handler"><i class="fas fa-grip-horizontal"></i></span>`;
    me.$template_wrapper.find(".dragabble-row").each(function (idx, el) {
      $(el).append(row_drag_controll);
      // console.log(idx, el);
    });

    me.$template_wrapper
      .find(".dragabble-col.has-content")
      .each(function (idx, el) {
        $(el).append(column_drag_controll);
        // console.log(idx, el);
      });

    // console.log("This => ", me);
  },

  make_dragabble_sections: function () {
    var me = this;
    // make Draggable Elements Draggable
    me.main_dragabble_rows = new Sortable.default(
      me.$template_wrapper[0].querySelector(".dragabble-rows"),
      {
        draggable: ".dragabble-row",
        mirror: {
          constrainDimensions: true,
        },
        plugins: [Plugins.SortAnimation],
        swapAnimation: {
          duration: 200,
          easingFunction: "ease-in-out",
        },

        handle: ".row-drag-handler",
      }
    );

    me.main_dragabble_cols = new Swappable.default(
      me.$template_wrapper[0].querySelector(".dragabble-content"),
      {
        draggable: ".dragabble-col",
        mirror: {
          constrainDimensions: true,
        },
        plugins: [Plugins.SortAnimation, Plugins.ResizeMirror],
        swapAnimation: {
          duration: 200,
          easingFunction: "ease-in-out",
        },

        handle: ".col-drag-handler",
      }
    );
    // append Drag Controller to Elements Draggable
    var x = me.$template_wrapper.find(".dragabble-row");
    x.each((idx, el) => {
      //   console.log("el => ", el);
    });
    // console.log("X => ", x);
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
