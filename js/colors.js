var colors = {
  'red': [ "103.png", "109.png", "128.png", "134.png", "14.png", "15.png", "164.png", "224.png", "238.png", "32.png", "479.png", "506.png", "571.png", "662.png", "67.png", "820.png", "105.png", "124.png", "132.png", "136.png", "144.png", "161.png", "170.png", "229.png", "239.png", "45.png", "480.png", "520.png", "65.png", "668.png", "80.png", "86.png", "108.png", "127.png", "133.png", "137.png", "147.png", "163.png", "213.png", "234.png", "255.png", "454.png", "497.png", "562.png", "66.png", "669.png", "817.png", "87.png" ],
  'red-orange': [ "205.png", "221.png", "225.png", "237.png", "365.png", "390.png", "523.png" ],
  'orange': [ "100.png", "149.png", "166.png", "171.png", "179.png", "222.png", "241.png", "27.png", "284.png", "33.png", "357.png", "575.png", "615.png", "666.png", "837.png", "91.png", "146.png", "159.png", "167.png", "177.png", "183.png", "230.png", "256.png", "278.png", "325.png", "333.png", "43.png", "601.png", "616.png", "72.png", "84.png", "92.png", "148.png", "165.png", "169.png", "178.png", "202.png", "240.png", "267.png", "279.png", "328.png", "341.png", "49.png", "602.png", "664.png", "78.png", "85.png", "93.png" ],
  'yellow-orange': [ "216.png", "701.png", "704.png", "707.png", "711.png", "714.png", "717.png", "720.png", "723.png", "726.png", "729.png", "732.png", "736.png", "739.png", "743.png", "746.png", "751.png", "754.png", "757.png", "760.png", "763.png", "407.png", "702.png", "705.png", "708.png", "712.png", "715.png", "718.png", "721.png", "724.png", "727.png", "730.png", "733.png", "737.png", "740.png", "744.png", "747.png", "752.png", "755.png", "758.png", "761.png", "764.png", "50.png", "703.png", "706.png", "710.png", "713.png", "716.png", "719.png", "722.png", "725.png", "728.png", "731.png", "735.png", "738.png", "742.png", "745.png", "748.png", "753.png", "756.png", "759.png", "762.png", "765.png" ],
  'yellow': [ "123.png", "193.png", "199.png", "201.png", "217.png", "231.png", "233.png", "354.png", "397.png", "513.png", "550.png", "71.png", "799.png", "833.png", "98.png", "126.png", "197.png", "200.png", "203.png", "228.png", "232.png", "258.png", "396.png", "409.png", "534.png", "568.png", "798.png", "805.png", "94.png" ],
  'yellow-green': [ "207.png", "208.png", "218.png", "235.png", "236.png", "285.png", "331.png", "387.png", "573.png", "83.png" ],
  'green': [ "102.png", "104.png", "160.png", "206.png", "209.png", "210.png", "219.png", "220.png", "223.png", "369.png", "370.png", "373.png", "394.png", "410.png", "416.png", "512.png", "543.png", "621.png", "68.png", "804.png", "88.png", "99.png" ],
  'blue-green': [ "101.png", "330.png", "34.png", "391.png", "404.png", "411.png", "518.png", "524.png", "525.png", "698.png"],
  'blue': [ "115.png", "158.png", "350.png", "443.png", "545.png", "592.png", "594.png", "663.png", "667.png", "699.png", "802.png", "825.png", "839.png", "844.png", "846.png", "135.png", "172.png", "371.png", "511.png", "574.png", "593.png", "595.png", "665.png", "69.png", "801.png", "822.png", "834.png", "843.png", "845.png"],
  'blue-violet': [ "162.png", "175.png", "181.png", "182.png", "184.png", "189.png", "444.png", "70.png"],
  'violet': [ "140.png", "226.png", "322.png", "47.png", "484.png", "485.png", "51.png", "514.png", "52.png", "53.png", "54.png", "55.png", "56.png", "57.png", "58.png", "59.png", "60.png", "61.png", "62.png", "709.png", "79.png" ],
  'red-violet': [ "168.png", "211.png", "214.png", "281.png", "299.png", "415.png", "426.png", "448.png", "505.png", "508.png", "510.png", "517.png", "174.png", "212.png", "227.png", "289.png", "385.png", "421.png", "427.png", "449.png", "507.png", "509.png", "516.png", "767.png" ],
  'white': [ "245.png", "246.png", "280.png", "36.png", "361.png", "367.png", "376.png", "39.png", "41.png", "44.png", "48.png", "655.png", "73.png", "76.png", "77.png", "90.png" ],
  'gray': [ "106.png", "110.png", "112.png", "12.png", "125.png", "16.png", "272.png", "673.png", "675.png", "677.png", "679.png", "681.png", "683.png", "685.png", "687.png", "689.png", "691.png", "693.png", "695.png", "81.png", "841.png", "96.png", "107.png", "111.png", "114.png", "122.png", "13.png", "26.png", "672.png", "674.png", "676.png", "678.png", "680.png", "682.png", "684.png", "686.png", "688.png", "690.png", "692.png", "694.png", "75.png", "838.png", "842.png", "97.png"],
  'brown': [ "527.png" ],
  'black': [ "121.png", "198.png", "35.png", "40.png", "42.png", "46.png", "63.png", "64.png", "74.png", "95.png", ]
}