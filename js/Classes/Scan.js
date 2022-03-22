var Scan = Class.extend({
  init: function (opt) {
    $.extend(this, opt);
    this.prepare();
    this.make();
    console.log('THIS => ', this);
  },

  prepare: function () {
    var me = this;
    console.log('THIS ', this);
    if (
      me.options &&
      me.options.hasOwnProperty('output') &&
      me.options.output === 'base64'
    ) {
      return;
    } else {
      me.options = {
        output: 'blob',
        name: me.options?.name || 'image',
        type: ['png', 'jpg', 'jpeg'].includes(me.options?.type)
          ? me.options?.type
          : 'png',
      };
    }
  },

  make: function () {
    var me = this;
    me.create_elements();
    me.create_styles();
    me.append_actions_btns();
    var thumbnailViewerSettings = {
      location: 'center',
      size: '100%',
      columns: 1,
      rows: 3,
      scrollDirection: 'horizontal', // 'vertical'
      pageMargin: 10,
      background: 'rgb(255, 255, 255)',
      border: '',
      allowKeyboardControl: true,
      allowPageDragging: true,
      allowResizing: false,
      showPageNumber: true,
      pageBackground: 'transparent',
      pageBorder: '1px solid rgb(238, 238, 238)',
      hoverBackground: 'rgb(239, 246, 253)',
      hoverPageBorder: '1px solid rgb(238, 238, 238)',
      placeholderBackground: 'rgb(251, 236, 136)',
      selectedPageBorder: '1px solid rgb(125,162,206)',
      selectedPageBackground: 'rgb(199, 222, 252)',
    };
    // Dynamsoft.DWT.CreateDWTObject('dwtcontrolContainerr');
    // Dynamsoft.DWT.UseLocalService = true;

    // Dynamsoft.DWT.OnWebTwainPreExecute = function () {
    //   Dynamsoft.DWT.CustomizableDisplayInfo.loaderBarSource = '';
    //   me.loading.show();
    //   console.log('An operation starts!');
    // };
    // Dynamsoft.DWT.OnWebTwainPostExecute = function () {
    //   me.loading.hide();
    //   console.log('An operation ends!');
    //   Dynamsoft.DWT.CustomizableDisplayInfo.loaderBarSource = '';
    // };

    me.DWObject = null;
    Dynamsoft.DWT.CustomizableDisplayInfo.loaderBarSource =
      'https://engineering-tmostafa.dafater.biz/lib/images/ui/curved-bars.svg';
    Dynamsoft.DWT.CustomizableDisplayInfo;
    Dynamsoft.DWT.CreateDWTObjectEx(
      {
        WebTwainId: `_${me.scanner_wrapper}`,
      },
      function (obj) {
        me.DWObject = obj;
        me.DWObject.Viewer.bind(document.getElementById(me.scanner_wrapper));
        me.DWObject.Viewer.height = 400;
        me.DWObject.Viewer.width = 800;
        me.thumbnailViewer = me.DWObject.Viewer.createThumbnailViewer(
          thumbnailViewerSettings
        );
        me.thumbnailViewer.show();
        me.DWObject.Viewer.show();
        me.loading.hide();

        console.log(
          'me.thumbnailViewer => ',
          Dynamsoft.DWT.CustomizableDisplayInfo
        );
      },
      function (err) {
        console.log(err);
      }
    );

    // Dynamsoft.DWT.OnWebTwainReady = function () {
    //   // me.prepare_created_obj();
    // };
    // console.log('XXXXX', me.DWObject, Dynamsoft.DWT);
  },

  AcquireImage: function () {
    var me = this;
    // console.log('me.DWObject => ', me.DWObject);
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
  },

  prepare_created_obj: function () {
    var me = this;
    // me.DWObject = Dynamsoft.DWT.GetWebTwainEx('dwtcontrolContainer');
    // // me.DWObject.Viewer.setViewMode(2, 2);
    // console.log('prepare_created_obj ME.OBJ => ', me.DWObject);
    // me.DWObject.Viewer.selectedAreaBorderColor = 'rgba(0, 0, 0, 1)';
    // me.DWObject.Viewer.selectedPageBackground = 'rgba(0, 0, 0, 0.7)';
    // me.DWObject.Viewer.showPageNumber = true;
    // me.DWObject.RegisterEvent('OnPostTransferAsync', function (outputInfo) {
    //   console.log('The image ID is ' + outputInfo.imageInfo);
    // });
    // me.DWObject.Viewer.on('click', function (dwtEvent, domEvent) {
    //   console.log(dwtEvent, domEvent);
    // });
  },

  get_images_fill_input: function () {
    var me = this;
    console.log(
      'DWObject.HowManyImagesInBuffer => ',
      me.DWObject.HowManyImagesInBuffer
    );

    var indexes = [];
    var files = [];
    me.data_transfer_container = new DataTransfer();
    for (let i = 0; i < me.DWObject.HowManyImagesInBuffer; i++) {
      indexes.push(i);
      console.log('indexes => ', indexes);
      me.DWObject.ConvertToBase64(
        [i],
        Dynamsoft.DWT.EnumDWT_ImageType.IT_PNG,
        function (result, indices, type) {
          // console.log(result.getData(0, result.getLength()));
          console.log('ConvertToBase64 => ', result, indices, type);
          me.$wrapper.append(
            `<img src="data:image/png;base64, ${result.getData(
              0,
              result.getLength()
            )}" style="width: 150px"/>`
          );
        },
        function (errorCode, errorString) {
          console.log(errorString);
        }
      );
      me.DWObject.ConvertToBlob(
        [i],
        Dynamsoft.DWT.EnumDWT_ImageType.IT_PNG,
        function (result, indices, type) {
          console.log('ConvertToBlob => ' + i, result);
          files.push(result);
          console.log('Files => ', files);
          // var file = new File(result, 'foo.png', {
          //   type: 'image/png',
          // });
          me.setBlobs(result, i);
        },
        function (errorCode, errorString) {
          console.log(errorString);
        }
      );
    }
  },

  create_elements: function () {
    var me = this;
    me.$wrapper = $(`#${me.wrapper}`);
    me.$wrapper.append(`
    <div class="container-fluid my-2">
      <div class="row">

        <div class="col-md-12">
          <div class="actions"></div>
        </div>

        <div class="col-md-12">
          <div id="${me.scanner_wrapper}"></div>
        </div>
        <div class="col-md-6">
          <input type="file" name="fileupload" value="fileupload" id="fileupload" accept="image/*" multiple>
        </div>
        <div class="col-md-6"></div>
      </div>
      <div class="loading" 
            style="position: absolute;
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
    me.$action_wrapper = me.$wrapper.find('.actions');
    me.file_input = me.$wrapper.find('#fileupload');
    console.log(me.file_input);
  },

  create_styles: function () {
    var me = this;
    if ($('body style#scanner').length === 0) {
      $('body').append(
        `<style>
        #${me.wrapper}${' '}#${me.scanner_wrapper}${' '}ul.dvs-thumbLists {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          justify-content: space-between;
        }

        #${me.wrapper}${' '}#${
          me.scanner_wrapper
        }${' '}ul.dvs-thumbLists${' '}li {
          max-width: 30% !important;
        }
        </style>`
      );
    }
  },

  append_actions_btns: function () {
    var me = this;
    console.log(me.$action_wrapper);
    me.$action_wrapper.append(`
          <button class="btn btn-primary" id="scan_btn" />Scan</button>
          <button class="btn btn-danger" id="get_images_btn" />Get Images</button>
          <!-- <button class="btn btn-danger" id="try_btn" />Try Button</button> --> 
    `);

    me.$action_wrapper.find('#scan_btn').on('click', function () {
      me.AcquireImage();
    });
    me.$action_wrapper.find('#get_images_btn').on('click', function () {
      me.get_images_fill_input();
    });
    me.$action_wrapper.find('#try_btn').on('click', function () {
      me.DWObject.SelectImages([3]);
      // me.DWObject.SaveAsJPEG(
      //   'vvv',
      //   0,
      //   () => {},
      //   (errorCode, errorString) => {}
      // );
      console.log(me.DWObject.SetHTTPFormField('mmm', Blob, 'kkk'));
      me.DWObject.ConvertToBlob(
        [0, 1],
        Dynamsoft.DWT.EnumDWT_ImageType.IT_JPG,
        function (result, indices, type) {
          console.log(result);
        },
        function (errorCode, errorString) {
          console.log(errorString);
        }
      );
    });

    me.$wrapper.find('#fileupload').on('change', function () {
      console.log($(this).val());
    });
  },

  setBlobs: function (blob, idx) {
    var me = this;
    let file = new File([blob], 'g' + idx + '.png', {
      type: 'image/png',
      lastModified: new Date().getTime(),
    });
    me.data_transfer_container.items.add(file);
    me.file_input[0].files = me.data_transfer_container.files;
    console.log('setBlobs => ', me.file_input[0].files, me.file_input.val());
  },
});
