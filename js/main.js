// var DWObject;
// function Dynamsoft_OnReady() {
//   // Dynamsoft.DWT.CreateDWTObject("dwtcontrolContainerr");
//   // DWObject = Dynamsoft.DWT.GetWebTwain("dwtcontrolContainerr");
//   // // console.log(DWObject);
//   // // try
//   // if (DWObject) {
//   //   var scan = new Scan({ DWObject });
//   //   // DWObject = null;
//   //   // DWObject.XferCount = 2;
//   //   // DWObject.IfShowUI = true;
//   // }
//   // // console.log("z 1 => ", DWObject.XferCount);
//   // //
// }

$(document).ready(function () {
  var scan = new Scan({ wrapper: "scanner-container" });
  // Dynamsoft.DWT.CreateDWTObject("dwtcontrolContainerr");
  // console.log(Dynamsoft.DWT);
  // DWObject = Dynamsoft.DWT.GetWebTwain("dwtcontrolContainerr");
  // Dynamsoft.DWT.Load();
  // scan.get_obj(DWObject);
});
