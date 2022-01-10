var Scan = Class.extend({
  init: function (opt) {
    $.extend(this, opt);
    this.make();
    setTimeout(() => {
      console.log('THIS ', this);
      // this.prepare_created_obj();
    }, 100);
  },

  make: function () {
    var me = this;
    me.$wrapper = $(`#${'scanner-container'}`);
    me.$wrapper.append(`
    <div class="container-fluid my-2">
      <div class="row">
        <div class="col-md-12">
          <input type="button" value="Scan" class=" btn btn-primary" id="scan_btn" />
        </div>
        <div class="col-md-2">
          <div id="dwtcontrolContainerr"></div>
        </div>
        <div class="col-md-8"></div>
        <div class="col-md-2"></div>
      </div>
      <div class="loading" style="position: absolute;
                                  top: 0;
                                  left: 0;
                                  width: 100%;
                                  height: 100%;
                                  background: url(https://engineering-tmostafa.dafater.biz/lib/images/ui/curved-bars.svg), #e4e4e46b;
                                  background-repeat: no-repeat;
                                  background-position: center;
                                  display: none";
      ></div>
    </div>
    `);
    me.loading = me.$wrapper.find('.loading');
    // Dynamsoft.DWT.CreateDWTObject('dwtcontrolContainerr');
    Dynamsoft.DWT.UseLocalService = true;
    Dynamsoft.DWT.OnWebTwainPreExecute = function () {
      me.loading.show();
      console.log('An operation starts!');
    };
    Dynamsoft.DWT.OnWebTwainPostExecute = function () {
      me.loading.hide();
      console.log('An operation ends!');
    };
    Dynamsoft.DWT.CreateDWTObjectEx(
      {
        WebTwainId: 'dwtcontrolContainerr',
      },
      function (obj) {
        DWObject = obj;
        DWObject.Viewer.bind(document.getElementById('dwtcontrolContainerr'));
        DWObject.Viewer.height = 300;
        DWObject.Viewer.width = 300;
        DWObject.Viewer.show();
      },
      function (err) {
        console.log(err);
      }
    );

    Dynamsoft.DWT.OnWebTwainReady = function () {
      me.prepare_created_obj();
    };
    console.log(me.DWObject, Dynamsoft.DWT);
    $('body')
      .find('#scan_btn')
      .on('click', function () {
        me.AcquireImage();
      });
  },

  AcquireImage: function () {
    var me = this;

    if (me.DWObject) {
      me.DWObject.SelectSource(
        () => {
          me.DWObject.OpenSource();
          me.DWObject.AcquireImage();
        },
        () => {
          console.log('selection faild...');
        }
      );
    }
    // else {
    //   me.DWObject = Dynamsoft.DWT.GetWebTwain('dwtcontrolContainerr');
    //   me.DWObject.SelectSource(
    //     () => {
    //       me.DWObject.OpenSource();
    //       me.DWObject.AcquireImage();
    //     },
    //     () => {
    //       console.log('selection faild..');
    //     }
    //   );
    // }

    console.log('z 2 => ', me.DWObject);
  },

  prepare_created_obj: function () {
    var me = this;
    console.log('ME.OBJ => ', me.DWObject);
    me.DWObject = Dynamsoft.DWT.GetWebTwainEx('dwtcontrolContainerr');
    me.DWObject.Viewer.setViewMode(2, 2);
    console.log('ZZ', me.DWObject.Viewer);
    me.DWObject.Viewer.selectedAreaBorderColor = 'rgba(0, 0, 0, 1)';
    me.DWObject.Viewer.selectedPageBackground = 'rgba(0, 0, 0, 1)';
    me.DWObject.Viewer.showPageNumber = true;
  },

  Dynamsoft_OnReady: function () {},
});
