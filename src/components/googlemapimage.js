import { useEffect, useState } from 'react';
import ReactGoogleMapImage from 'react-google-map-image';
import _ from 'lodash';
import * as setting from '../config';

export default (props) => {
    const [mapStyle, setMapStyle] = useState('');
    const [googleMapApiConfig, setGoogleMapApiConfig] = useState({
        center: ''+props._mapConfig.center.lat+','+props._mapConfig.center.lng,
        size: '437x620',
        zoom: '8',
        key: setting.mapApiKey,
        // maptype: 'roadmap',
        style: 'feature:all|element:all|color:0xff7000|lightness:69|saturation:100|weight:1.17|gamma:2.04&style=feature:all|element:geometry|color:0xcb8536&style=feature:all|element:labels|color:0xffb471|lightness:66|saturation:100&style=feature:all|element:labels.text.fill|gamma:0.01|lightness:20&style=feature:all|element:labels.text.stroke|saturation:-31|lightness:-33|weight:2|gamma:0.8&style=feature:all|element:labels.icon|visibility:off&style=feature:landscape|element:all|lightness:-8|gamma:0.98|weight:2.45|saturation:26&style=feature:landscape|element:geometry|lightness:30|saturation:30&style=feature:poi|element:geometry|saturation:20&style=feature:poi.park|element:geometry|lightness:20|saturation:-20&style=feature:road|element:geometry|lightness:10|saturation:-30&style=feature:road|element:geometry.stroke|saturation:25|lightness:25&style=feature:water|element:all|lightness:-20|color:0xecc080',
    })
    useEffect(() => {
        let style = ''
        props.mapStyle.map((item, index) => {
            if (index !== 0)
                style += '&style='
            if (_.has(item, 'featureType'))
                style += `feature:${item.featureType}|`
            if (_.has(item, 'elementType'))
                style += `element:${item.elementType}|`
            item.stylers.map((eachStyle, i) => {
                _.mapKeys(eachStyle, function (value, key) {
                    style += `${key}:${value}`;
                    if (i !== item.stylers.length - 1)
                        style += '|';
                })
            })
        })
        setMapStyle(style.replace(/#/gi, '0x'));
    }, [props.mapStyle])

    useEffect(() => {
        const zoom = ''+(props._mapConfig.zoom-props.size.zoom);
        const center = ''+props._mapConfig.center.lat+','+props._mapConfig.center.lng;
        setGoogleMapApiConfig({
            ...googleMapApiConfig,
            // size,
            zoom,
            center,
        })
    }, [props._mapConfig, props.size])
    return (
        <ReactGoogleMapImage
            config={{
                ...googleMapApiConfig,
                style: mapStyle
            }}
            wrapperStyle={{}}
            style={{ width: '400px', height: 'auto', border: '1px solid 0xccc' }}
        />
    )
}