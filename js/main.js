$(document).ready(function () {
  var scan = new Scan({
    wrapper: 'scanner-container',
    scanner_wrapper: 'scanner_wrapper',
    options: {
      output: 'blob', // 'blob' || 'base64' default=>'blob'
      name: 'image', // default=>'image' + '_' + $index   => EX: 'image_0.png' --IGNORED IF output CHOOSE TO BE 'base64'
      type: 'jpeg', // 'png' || 'jpg' || 'jpeg'  --IGNORED IF output CHOOSE TO BE 'base64'
    },
  });
});
