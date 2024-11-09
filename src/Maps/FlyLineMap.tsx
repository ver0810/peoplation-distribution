import { useEffect } from "react";
import mapStyle from "../../public/custom_map_config.json";
import { mapvgl } from "react-bmapgl";

interface BaiduMapProps {
  center: {
    lng: number;
    lat: number;
  };
  zoom: number;
}

// interface LayerData {
//   geometry: {
//     type: string,
//     coordinates: [],
//   },
//   properties: {
//     count: number,
//   },
// }

const FlyLineMap: React.FC<BaiduMapProps> = ({ center, zoom }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof BMapGL !== "undefined") {
        clearInterval(interval);
        const map = new BMapGL.Map("mapContainer");
        const point = new BMapGL.Point(center.lng, center.lat);

        map.setMapStyleV2({ styleJson: mapStyle });
        map.centerAndZoom(point, zoom);
        map.enableScrollWheelZoom();
        map.setTilt(45);

        //
        const sites = [
          "杭州市",
          "宁波市",
          "金华市",
          "绍兴市",
          "嘉兴市",
          "温州市",
          "台州市",
          "丽水市",
          "衢州市",
          "舟山市",
          "湖州市",
        ];

        let randomCount = 100; // 飞线数量
        var curve = new mapvgl.BezierCurve();
        let data = [];

        // 构造数据
        while (randomCount--) {
          let startPoint = mapv.utilCityCenter.getCenterByCityName(
            sites[Math.floor(Math.random() * sites.length)]
          );
          let endPoint = mapv.utilCityCenter.getCenterByCityName(
            sites[Math.floor(Math.random() * sites.length)]
          );
          curve.setOptions({
            start: [startPoint.lng, startPoint.lat],
            end: [endPoint.lng, endPoint.lat],
          });
          var curveModelData = curve.getPoints();

          data.push({
            geometry: {
              type: "LineString",
              coordinates: curveModelData
            },
            properties: {
              count: Math.random(),
            },
          });
        }

        const view = new mapvgl.View({
          map: map,
          effects: [
            new mapvgl.BrightEffect({
              threshold: 0,
              blurSize: 2,
              clarity: 1,
            }),
          ],
        });
        console.log(data);

        const layer = new mapvgl.LineLayer({
          blend: "lighter",
          width: 2,
          color: "rgba(33, 242, 214, 0.6)",
        });

        view.addLayer(layer);
        layer.setData(data);

        var flyLayer = new mapvgl.LineLayer({
          blend: "lighter",
          color: "rgba(164, 36, 232, 0.9)",
          width: 4,
          animation: true,
          duration: 2, // 循环时间2s
          trailLength: 0.8, // 拖尾长度占间隔的0.8
          interval: 0.2, // 粒子长度占线整体长度的0.2
        });
        view.addLayer(flyLayer);
        flyLayer.setData(data);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [center, zoom]);

  return (
    <div id="mapContainer" style={{ height: "100vh", width: "100vw" }}></div>
  );
};

export default FlyLineMap;
