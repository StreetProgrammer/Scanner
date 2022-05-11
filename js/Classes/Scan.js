var Scan = Class.extend({
  init: function (opt) {
    $.extend(this, opt);
    this.prepare();
    this.make();
  },

  prepare: function () {
    var me = this;
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
      // location: 'center',
      // size: '100%',
      // columns: 1,
      // rows: 3,
      // scrollDirection: 'horizontal', // 'vertical'
      // pageMargin: 10,
      // background: 'rgb(255, 255, 255)',
      // border: '',
      // allowKeyboardControl: true,
      // allowPageDragging: true,
      // allowResizing: false,
      // showPageNumber: true,
      // pageBackground: 'transparent',
      // pageBorder: '1px solid rgb(238, 238, 238)',
      // hoverBackground: 'rgb(239, 246, 253)',
      // hoverPageBorder: '1px solid rgb(238, 238, 238)',
      // placeholderBackground: 'rgb(251, 236, 136)',
      // selectedPageBorder: '1px solid rgb(125,162,206)',
      // selectedPageBackground: 'rgb(199, 222, 252)',
    };

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
        // me.DWObject.Viewer.height = 400;
        // me.DWObject.Viewer.width = 800;
        me.thumbnailViewer = me.DWObject.Viewer.createThumbnailViewer(
          thumbnailViewerSettings
        );
        me.thumbnailViewer.show();
        me.DWObject.Viewer.show();
        // me.loading.hide();

        me.DWObject.RegisterEvent('OnPostAllTransfers', function () {
          me.get_images_fill_input();
        });
      },
      function (err) {
        console.log(err);
      }
    );
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
    me.clear = false;
    console.log(
      'DWObject.HowManyImagesInBuffer => ',
      me.DWObject.HowManyImagesInBuffer
    );
    var count = 0;
    me.data_transfer_container = new DataTransfer();
    switch (me.options.output) {
      case 'blob':
        for (let i = 0; i < me.DWObject.HowManyImagesInBuffer; i++) {
          me.DWObject.ConvertToBlob(
            [i],
            Dynamsoft.DWT.EnumDWT_ImageType.IT_PNG,
            function (result, indices, type) {
              // console.log('ConvertToBlob => ' + i, result);
              me.setBlobs(result, i);
              count += 1;
              if (count == me.DWObject.HowManyImagesInBuffer) {
                me.DWObject.RemoveAllImages();
              }
            },
            function (errorCode, errorString) {
              console.log(errorString);
            }
          );
        }
        break;
      case 'base64':
        me.images = [];
        for (let i = 0; i < me.DWObject.HowManyImagesInBuffer; i++) {
          me.DWObject.ConvertToBase64(
            [i],
            Dynamsoft.DWT.EnumDWT_ImageType.IT_PNG,
            function (result, indices, type) {
              me.images.push(
                `data:image/png;base64, ${result.getData(
                  0,
                  result.getLength()
                )}`
              );
            },
            function (errorCode, errorString) {
              console.log(errorString);
            }
          );
        }
        break;
    }
  },

  create_elements: function () {
    var me = this;
    me.$wrapper = $(`#${me.wrapper}`);
    me.$wrapper.append(`
    <div>
        <div class="col-md-12">
          <div class="actions"></div>
        </div>

        <div class="col-md-12">
          <div id="${me.scanner_wrapper}"></div>
        </div>
        <div class="col-md-6">
          <input type="file" name="fileupload" value="fileupload" id="fileupload" accept="image/*" multiple>
        </div>
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
        #${me.wrapper}${' '}#${me.scanner_wrapper}>.dvs-WebViewer {
          width: 0 !important;
          height: 0 !important;
        }
        #${me.wrapper}${' '}#${me.scanner_wrapper}${' '}ul.dvs-thumbLists {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: wrap !important;
          justify-content: space-between;
          overflow-y: scroll !important;
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
    `);

    me.$action_wrapper.find('#scan_btn').on('click', function () {
      me.AcquireImage();
    });
  },

  setBlobs: function (blob, idx) {
    var me = this;
    let file = new File(
      [blob],
      me.options.name + '_' + idx + '.' + me.options.type,
      {
        type: 'image/' + me.options.type,
        lastModified: new Date().getTime(),
      }
    );
    me.data_transfer_container.items.add(file);
    me.file_input[0].files = me.data_transfer_container.files;
    console.log('setBlobs => ', me.file_input[0].files, me.file_input.val());
  },
  // scan_get_files: function () {
  //   var me = this;
  //   return new Promise(function (res, rej) {
  //     me.get_images_fill_input();
  //     res();
  //   });
  // },

  // reset_buffer: function () {
  //   var me = this;

  //   if (me.clear == true) me.DWObject.RemoveAllImages();
  //   me.clear = false;
  // },
});
