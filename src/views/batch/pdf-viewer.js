import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import React from "react";
import { getLocalStorage } from "services/utility/storage";

const MemoizedViewer = React.memo(({ fileUrl }) => {
    const pluginInstance = defaultLayoutPlugin();
    const token = getLocalStorage('token')
    return (
        <Viewer 
            fileUrl={fileUrl} 
            httpHeaders={{
                Authorization: `Bearer ${token}`,
            }}
            plugins={[pluginInstance]} 
        />
    );
});

export default MemoizedViewer;