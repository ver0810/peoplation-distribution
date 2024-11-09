import React, { useEffect } from "react";
import mapStyle from "../../public/custom_map_config.json";
import { mapvgl } from "react-bmapgl";
declare const BMapGL: any;
import heatmapdata from "../../public/data.json";


interface BaiduMapProps {
  center: {
    lng: number;
    lat: number;
  };
  zoom: number;
}

const HeatPointMap: React.FC<BaiduMapProps> = ({ center, zoom }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof BMapGL !== "undefined") {
        clearInterval(interval);

        const map = new BMapGL.Map("mapContainer");
        const point = new BMapGL.Point(center.lng, center.lat);

        map.setMapStyleV2({ styleJson: mapStyle });
        map.centerAndZoom(point, zoom);
        // map.enableScrollWheelZoom(true);

        const view = new mapvgl.View({ map: map });

        const heatmapLayer = new mapvgl.HeatPointLayer({
          blend: 'lighter',
          style: 'grid',
          size: 4, // 单个点绘制大小
          max: 100, // 最大阈值
          height: 0, // 最大高度，默认为0
          gradient: {
            // 对应比例渐变色
            0.25: "rgba(0, 0, 255, 1)",
            0.55: "rgba(0, 255, 0, 1)",
            0.85: "rgba(255, 255, 0, 1)",
            1: "rgba(255, 0, 0, 1)",
          },
        });

        let data: any = [];
        heatmapdata.map( (item) => {
          let dataItem = {
            geometry: {
              type: 'Point',
              coordinates: [item.lng, item.lat],
            },
            properties: {
              count: item.count,
            }
          };
          data.push(dataItem);
        });

        console.log(data);

        view.addLayer(heatmapLayer);
        heatmapLayer.setData(data);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [center, zoom]);

  return (
    <div id="mapContainer" style={{ height: "100vh", width: "100vw" }}></div>
  );
};

export default HeatPointMap;
